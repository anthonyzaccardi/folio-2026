'use client'

import { useState } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: 14,
        padding: 0,
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      {isDark ? '🌑' : '☀️'}
    </button>
  )
}
