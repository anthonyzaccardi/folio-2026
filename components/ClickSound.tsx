'use client'

import { useEffect } from 'react'
import { useClickSound } from '@/hooks/useClickSound'

export default function ClickSound() {
  const play = useClickSound()

  useEffect(() => {
    document.addEventListener('click', play)
    return () => document.removeEventListener('click', play)
  }, [play])

  return null
}
