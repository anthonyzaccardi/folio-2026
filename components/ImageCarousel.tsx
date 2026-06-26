'use client'

import { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

// ─── Types ────────────────────────────────────────────────────────────────────

type Zone = 'left' | 'middle' | 'right'
interface Rect { x: number; y: number; width: number; height: number }
interface ProjectInfo { title: string; company: string; year: string; description: string }

// ─── Cursor helpers ───────────────────────────────────────────────────────────

function getZone(mouseX: number, width: number): Zone {
  const third = width / 3
  if (mouseX < third) return 'left'
  if (mouseX > third * 2) return 'right'
  return 'middle'
}

function makeArrowCursor(dir: 'left' | 'right', dark: boolean) {
  const bg = dark ? '#0a0a0a' : 'white'
  const stroke = dark ? '#ebebeb' : '#333333'
  const border = dark ? '#2a2a2a' : '#e0e0e0'
  const d = dir === 'left'
    ? 'M20 16H12M12 16L16 12M12 16L16 20'
    : 'M12 16H20M20 16L16 12M20 16L16 20'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="${bg}" stroke="${border}" stroke-width="0.5"/><path d="${d}" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 16 16, pointer`
}

function makeMagnifyCursor(dark: boolean) {
  const bg = dark ? '#0a0a0a' : 'white'
  const stroke = dark ? '#ebebeb' : '#333333'
  const border = dark ? '#2a2a2a' : '#e0e0e0'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="${bg}" stroke="${border}" stroke-width="0.5"/><circle cx="14.5" cy="14.5" r="4.5" stroke="${stroke}" stroke-width="1.5" fill="none"/><path d="M18 18L21.5 21.5" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round"/></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 16 16, zoom-in`
}

function makeCloseCursor(dark: boolean) {
  const bg = dark ? '#0a0a0a' : 'white'
  const stroke = dark ? '#ebebeb' : '#333333'
  const border = dark ? '#2a2a2a' : '#e0e0e0'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="${bg}" stroke="${border}" stroke-width="0.5"/><path d="M12 12L20 20M20 12L12 20" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round"/></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 16 16, pointer`
}

function getThumbnailCursor(zone: Zone, dark: boolean, hasMultiple: boolean) {
  if (zone === 'middle' || !hasMultiple) return makeMagnifyCursor(dark)
  return makeArrowCursor(zone, dark)
}

// ─── Modal ────────────────────────────────────────────────────────────────────

type Phase = 'hidden' | 'snap' | 'play'

interface ModalProps {
  images: string[]
  startIdx: number
  isDark: boolean
  originRect: Rect
  getOriginRect: () => DOMRect | null
  projectInfo: ProjectInfo
  onClose: (finalIdx: number) => void
}

function Modal({ images, startIdx, isDark, originRect, getOriginRect, projectInfo, onClose }: ModalProps) {
  const [idx, setIdx] = useState(startIdx)
  const [phase, setPhase] = useState<Phase>('hidden')
  const [flipTransform, setFlipTransform] = useState('')
  const [closing, setClosing] = useState(false)
  const [backdropVisible, setBackdropVisible] = useState(false)
  const [isLeft, setIsLeft] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  const computeFlipTo = useCallback((target: Rect) => {
    const el = imgRef.current
    if (!el) return null
    const r = el.getBoundingClientRect()
    if (!r.width) return null
    const dx = (target.x + target.width / 2) - (r.left + r.width / 2)
    const dy = (target.y + target.height / 2) - (r.top + r.height / 2)
    const scale = target.width / r.width
    return `translate(${dx}px, ${dy}px) scale(${scale})`
  }, [])

  const runOpenFlip = useCallback(() => {
    const t = computeFlipTo(originRect)
    if (!t) return
    setFlipTransform(t)
    setPhase('snap')
    setBackdropVisible(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlipTransform('')
        setPhase('play')
      })
    })
  }, [computeFlipTo, originRect])

  useLayoutEffect(() => {
    runOpenFlip()
    const img = imgRef.current?.querySelector('img') as HTMLImageElement | null
    if (img && !img.complete) img.addEventListener('load', runOpenFlip, { once: true })
  }, [runOpenFlip])

  const close = useCallback(() => {
    if (closing) return
    setClosing(true)
    setBackdropVisible(false)
    const freshDom = getOriginRect()
    const fresh: Rect | null = freshDom
      ? { x: freshDom.x, y: freshDom.y, width: freshDom.width, height: freshDom.height }
      : null
    const t = fresh ? computeFlipTo(fresh) : null
    if (t) {
      setFlipTransform(t)
      setTimeout(() => onClose(idx), 420)
    } else {
      onClose(idx)
    }
  }, [closing, computeFlipTo, getOriginRect, idx, onClose])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [close])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imgRef.current?.getBoundingClientRect()
    if (!rect) return
    setIsLeft(e.clientX - rect.left < rect.width / 2)
  }, [])

  const handleImgClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (images.length <= 1) return
    const rect = imgRef.current?.getBoundingClientRect()
    if (!rect) return
    const left = e.clientX - rect.left < rect.width / 2
    setIdx(i => left ? (i - 1 + images.length) % images.length : (i + 1) % images.length)
  }, [images.length])

  const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
  const bgColor = isDark ? 'rgba(10,10,10,0.56)' : 'rgba(255,255,255,0.56)'

  return createPortal(
    <div
      onClick={close}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        background: bgColor,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        cursor: makeCloseCursor(isDark),
        opacity: backdropVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      {/* ✕ button */}
      <button
        onClick={(e) => { e.stopPropagation(); close() }}
        style={{
          position: 'fixed',
          top: 24,
          right: 24,
          zIndex: 10000,
          background: isDark ? 'rgba(40,40,40,0.9)' : 'rgba(240,240,240,0.9)',
          border: 'none',
          borderRadius: '50%',
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: 16,
          color: isDark ? '#ebebeb' : '#333333',
        }}
      >
        ✕
      </button>

      {/* 1 + 4 column grid */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 4fr',
          gap: 16,
          maxWidth: '90vw',
          maxHeight: '90vh',
          alignItems: 'stretch',
          cursor: 'default',
        }}
      >
        {/* Description panel — white box */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 8,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            overflowY: 'auto',
            minWidth: 200,
          }}
        >
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, lineHeight: '20px', color: '#000000' }}>
              {projectInfo.title}
            </p>
            <p style={{ fontSize: 12, lineHeight: '18px', color: '#BDBDBD', marginTop: 2 }}>
              {projectInfo.company} / {projectInfo.year}
            </p>
          </div>
          <p style={{ fontSize: 13, lineHeight: '20px', color: '#6E6E6E' }}>
            {projectInfo.description}
          </p>
        </div>

        {/* Image — FLIP target */}
        <div
          ref={imgRef}
          onMouseMove={handleMouseMove}
          onClick={handleImgClick}
          style={{
            transform: flipTransform || undefined,
            transition: phase === 'play' ? `transform 0.45s ${EASE}` : 'none',
            opacity: phase === 'hidden' ? 0 : 1,
            transformOrigin: 'center center',
            cursor: images.length > 1
              ? makeArrowCursor(isLeft ? 'left' : 'right', isDark)
              : 'default',
            borderRadius: 8,
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <img
            src={images[idx]}
            alt=""
            style={{
              display: 'block',
              maxWidth: '100%',
              maxHeight: '90vh',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

// ─── Carousel ─────────────────────────────────────────────────────────────────

interface Props {
  images: (string | [string, string])[]
  alt: string
  projectInfo?: ProjectInfo
}

export default function ImageCarousel({ images, alt, projectInfo }: Props) {
  const [idx, setIdx] = useState(0)
  const [zone, setZone] = useState<Zone>('middle')
  const [isDark, setIsDark] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [originRect, setOriginRect] = useState<Rect>({ x: 0, y: 0, width: 0, height: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const flat = images.flatMap(img => Array.isArray(img) ? img : [img])
  const getOriginRect = useCallback(() => ref.current?.getBoundingClientRect() ?? null, [])

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setZone(getZone(e.clientX - rect.left, rect.width))
  }, [])

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const z = getZone(e.clientX - rect.left, rect.width)
    if (z === 'left' && images.length > 1) {
      setIdx(i => (i - 1 + images.length) % images.length)
    } else if (z === 'right' && images.length > 1) {
      setIdx(i => (i + 1) % images.length)
    } else if (z === 'middle') {
      const domRect = ref.current?.getBoundingClientRect()
      if (domRect) setOriginRect({ x: domRect.x, y: domRect.y, width: domRect.width, height: domRect.height })
      setModalOpen(true)
    }
  }, [images.length])

  const handleModalClose = useCallback((finalIdx: number) => {
    setIdx(finalIdx)
    setModalOpen(false)
  }, [])

  const current = images[idx]
  const hasMultiple = images.length > 1

  return (
    <>
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        style={{
          cursor: getThumbnailCursor(zone, isDark, hasMultiple),
          width: '100%',
          aspectRatio: '16/10',
          background: 'var(--c-surface)',
          borderRadius: 2,
          overflow: 'hidden',
          transition: 'background 0.2s ease',
          position: 'relative',
        }}
      >
        {Array.isArray(current) ? (
          <div style={{ display: 'flex', width: '100%', height: '100%' }}>
            <img src={current[0]} alt={`${alt} a`} style={{ width: '50%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <img src={current[1]} alt={`${alt} b`} style={{ width: '50%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        ) : (
          <img src={current} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        )}
      </div>

      {modalOpen && projectInfo && (
        <Modal
          images={flat}
          startIdx={flat.indexOf(Array.isArray(current) ? current[0] : current)}
          isDark={isDark}
          originRect={originRect}
          getOriginRect={getOriginRect}
          projectInfo={projectInfo}
          onClose={handleModalClose}
        />
      )}
    </>
  )
}
