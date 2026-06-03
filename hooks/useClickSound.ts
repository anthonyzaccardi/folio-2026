'use client'

import { useCallback, useRef } from 'react'

export function useClickSound(volume = 0.10) {
  const ctxRef = useRef<AudioContext | null>(null)

  const play = useCallback(() => {
    if (typeof window === 'undefined') return
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    }
    const ctx = ctxRef.current

    // Short filtered noise burst — mechanical "tick" feel
    const bufLen = Math.floor(ctx.sampleRate * 0.022) // ~22ms
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < bufLen; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufLen, 5)
    }

    const src = ctx.createBufferSource()
    src.buffer = buf

    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 1800

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(volume, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.022)

    src.connect(hp)
    hp.connect(gain)
    gain.connect(ctx.destination)
    src.start()
  }, [volume])

  return play
}
