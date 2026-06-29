'use client'

import { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

// ─── Types ────────────────────────────────────────────────────────────────────

type Zone = 'left' | 'middle' | 'right'
type SlideDir = 'left' | 'right'
type SlidePhase = 'idle' | 'init' | 'animate'
interface Rect { x: number; y: number; width: number; height: number }
interface ProjectInfo { title: string; company: string; year: string; description: string }
type FlipPhase = 'hidden' | 'snap' | 'play'

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

// ─── Image slot ───────────────────────────────────────────────────────────────

function ImageSlot({ img, alt }: { img: string | [string, string]; alt: string }) {
  if (Array.isArray(img)) {
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <img src={img[0]} alt={`${alt} a`} style={{ width: '50%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <img src={img[1]} alt={`${alt} b`} style={{ width: '50%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    )
  }
  return <img src={img} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
}

// ─── Mobile modal (scroll lock ON) ───────────────────────────────────────────

interface MobileModalProps {
  images: string[]
  isDark: boolean
  projectInfo: ProjectInfo
  onClose: () => void
}

function MobileModal({ images, isDark, projectInfo, onClose }: MobileModalProps) {
  const [visible, setVisible] = useState(false)
  const bg = isDark ? '#0a0a0a' : '#ffffff'
  const text1 = isDark ? '#ebebeb' : '#000000'
  const text2 = isDark ? '#888888' : '#6E6E6E'
  const text3 = isDark ? '#444444' : '#BDBDBD'

  // Mobile only: lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => { requestAnimationFrame(() => setVisible(true)) }, [])

  const close = useCallback(() => {
    setVisible(false)
    setTimeout(onClose, 250)
  }, [onClose])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [close])

  return createPortal(
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: bg, overflowY: 'auto',
      display: 'flex', flexDirection: 'column',
      opacity: visible ? 1 : 0, transition: 'opacity 0.25s ease',
    }}>
      <div style={{
        position: 'sticky', top: 0, background: bg, zIndex: 1,
        padding: '20px 24px 16px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        borderBottom: `1px solid ${isDark ? '#2a2a2a' : '#e0e0e0'}`,
      }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: text1 }}>{projectInfo.title}</p>
          <p style={{ fontSize: 12, color: text3, marginTop: 2 }}>{projectInfo.company} / {projectInfo.year}</p>
        </div>
        <button onClick={close} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: text2, padding: 4, lineHeight: 1 }}>✕</button>
      </div>
      <p style={{ padding: '20px 24px', fontSize: 13, lineHeight: '20px', color: text2 }}>
        {projectInfo.description}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 24px 80px' }}>
        {images.map((src, i) => (
          <img key={i} src={src} alt={`${projectInfo.title} ${i + 1}`}
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 4 }} />
        ))}
      </div>
    </div>,
    document.body
  )
}

// ─── Desktop modal (no scroll lock) ──────────────────────────────────────────

interface DesktopModalProps {
  images: string[]
  startIdx: number
  isDark: boolean
  originRect: Rect
  getOriginRect: () => DOMRect | null
  projectInfo: ProjectInfo
  onClose: (finalIdx: number) => void
}

function DesktopModal({ images, startIdx, isDark, originRect, getOriginRect, projectInfo, onClose }: DesktopModalProps) {
  const [idx, setIdx] = useState(startIdx)
  const [phase, setPhase] = useState<FlipPhase>('hidden')
  const [flipTransform, setFlipTransform] = useState('')
  const [closing, setClosing] = useState(false)
  const [backdropVisible, setBackdropVisible] = useState(false)
  const [isLeft, setIsLeft] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  // Scroll lock — prevents background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

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
    const fresh = freshDom ? { x: freshDom.x, y: freshDom.y, width: freshDom.width, height: freshDom.height } : null
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
    <div onClick={close} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48,
      background: bgColor, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      cursor: makeCloseCursor(isDark),
      opacity: backdropVisible ? 1 : 0, transition: 'opacity 0.3s ease',
    }}>
      <button onClick={(e) => { e.stopPropagation(); close() }} style={{
        position: 'fixed', top: 24, right: 24, zIndex: 10000,
        background: isDark ? 'rgba(40,40,40,0.9)' : 'rgba(240,240,240,0.9)',
        border: 'none', borderRadius: '50%', width: 36, height: 36,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', fontSize: 16, color: isDark ? '#ebebeb' : '#333333',
      }}>✕</button>

      <div onClick={(e) => e.stopPropagation()} style={{
        display: 'grid', gridTemplateColumns: '1fr 4fr', gap: 16,
        maxWidth: '90vw', maxHeight: '90vh', alignItems: 'stretch', cursor: 'default',
      }}>
        <div style={{
          background: '#ffffff', borderRadius: 8, padding: 24,
          display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto', minWidth: 200,
        }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, lineHeight: '20px', color: '#000000' }}>{projectInfo.title}</p>
            <p style={{ fontSize: 12, lineHeight: '18px', color: '#BDBDBD', marginTop: 2 }}>{projectInfo.company} / {projectInfo.year}</p>
          </div>
          <p style={{ fontSize: 13, lineHeight: '20px', color: '#6E6E6E' }}>{projectInfo.description}</p>
        </div>

        <div ref={imgRef} onMouseMove={handleMouseMove} onClick={handleImgClick} style={{
          transform: flipTransform || undefined,
          transition: phase === 'play' ? `transform 0.45s ${EASE}` : 'none',
          opacity: phase === 'hidden' ? 0 : 1,
          transformOrigin: 'center center',
          cursor: images.length > 1 ? makeArrowCursor(isLeft ? 'left' : 'right', isDark) : 'default',
          borderRadius: 8, overflow: 'hidden', flexShrink: 0,
        }}>
          <img src={images[idx]} alt="" style={{
            display: 'block', maxWidth: '100%', maxHeight: '90vh',
            width: 'auto', height: 'auto', objectFit: 'contain',
          }} />
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

const SLIDE_EASE = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
const SLIDE_MS = 380

export default function ImageCarousel({ images, alt, projectInfo }: Props) {
  const [idx, setIdx] = useState(0)
  // Slide state — only used on mobile touch navigation
  const [prevIdx, setPrevIdx] = useState<number | null>(null)
  const [slideDir, setSlideDir] = useState<SlideDir>('right')
  const [slidePhase, setSlidePhase] = useState<SlidePhase>('idle')

  const [zone, setZone] = useState<Zone>('middle')
  const [isDark, setIsDark] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [originRect, setOriginRect] = useState<Rect>({ x: 0, y: 0, width: 0, height: 0 })

  const ref = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const isSwiping = useRef(false)
  const isSliding = useRef(false)
  const idxRef = useRef(0)

  useEffect(() => { idxRef.current = idx }, [idx])

  const flat = images.flatMap(img => Array.isArray(img) ? img : [img])
  const getOriginRect = useCallback(() => ref.current?.getBoundingClientRect() ?? null, [])

  useEffect(() => {
    const check = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
      setIsMobile(window.innerWidth < 768)
    }
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    window.addEventListener('resize', check)
    return () => { obs.disconnect(); window.removeEventListener('resize', check) }
  }, [])

  // Mobile-only: slide animation navigation
  const navigateWithSlide = useCallback((dir: SlideDir) => {
    if (isSliding.current || images.length <= 1) return
    isSliding.current = true
    const curr = idxRef.current
    const next = dir === 'right'
      ? (curr + 1) % images.length
      : (curr - 1 + images.length) % images.length
    setPrevIdx(curr)
    setSlideDir(dir)
    setIdx(next)
    idxRef.current = next
    setSlidePhase('init')
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { setSlidePhase('animate') })
    })
    setTimeout(() => {
      setPrevIdx(null)
      setSlidePhase('idle')
      isSliding.current = false
    }, SLIDE_MS + 20)
  }, [images.length])

  // Desktop-only: instant navigation (no animation)
  const navigateInstant = useCallback((dir: SlideDir) => {
    if (images.length <= 1) return
    const curr = idxRef.current
    const next = dir === 'right'
      ? (curr + 1) % images.length
      : (curr - 1 + images.length) % images.length
    idxRef.current = next
    setIdx(next)
  }, [images.length])

  // Touch handlers — mobile swipe with slide animation
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX
    isSwiping.current = false
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) >= 50) {
      isSwiping.current = true
      navigateWithSlide(delta > 0 ? 'left' : 'right')
    }
  }, [navigateWithSlide])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setZone(getZone(e.clientX - rect.left, rect.width))
  }, [])

  // Click handler — desktop only (instant navigation, no slide)
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isSwiping.current) { isSwiping.current = false; return }
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const z = getZone(e.clientX - rect.left, rect.width)
    if (z === 'left') {
      navigateInstant('left')
    } else if (z === 'right') {
      navigateInstant('right')
    } else {
      const domRect = ref.current?.getBoundingClientRect()
      if (domRect) setOriginRect({ x: domRect.x, y: domRect.y, width: domRect.width, height: domRect.height })
      setModalOpen(true)
    }
  }, [navigateInstant])

  const handleModalClose = useCallback((finalIdx?: number) => {
    if (finalIdx !== undefined) { idxRef.current = finalIdx; setIdx(finalIdx) }
    setModalOpen(false)
  }, [])

  const current = images[idx]
  const hasMultiple = images.length > 1

  // Slide transforms (only active during mobile touch navigation)
  const exitTransform = slidePhase === 'animate'
    ? `translateX(${slideDir === 'right' ? '-100%' : '100%'})`
    : 'translateX(0)'
  const enterTransform = slidePhase === 'init'
    ? `translateX(${slideDir === 'right' ? '100%' : '-100%'})`
    : 'translateX(0)'
  const slideTransition = `transform ${SLIDE_MS}ms ${SLIDE_EASE}`

  return (
    <>
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          cursor: getThumbnailCursor(zone, isDark, hasMultiple),
          width: '100%',
          aspectRatio: '16/10',
          background: 'var(--c-surface)',
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
          touchAction: 'pan-y',
        }}
      >
        {/* Exiting image — only rendered during mobile slide */}
        {prevIdx !== null && (
          <div style={{
            position: 'absolute', inset: 0,
            transform: exitTransform,
            transition: slidePhase === 'animate' ? slideTransition : 'none',
            willChange: 'transform',
          }}>
            <ImageSlot img={images[prevIdx]} alt={alt} />
          </div>
        )}
        {/* Current image */}
        <div style={{
          position: 'absolute', inset: 0,
          transform: enterTransform,
          transition: slidePhase === 'animate' ? slideTransition : 'none',
          willChange: 'transform',
        }}>
          <ImageSlot img={current} alt={alt} />
        </div>
      </div>

      {modalOpen && projectInfo && (
        isMobile
          ? <MobileModal images={flat} isDark={isDark} projectInfo={projectInfo} onClose={() => handleModalClose()} />
          : <DesktopModal
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
