'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      className="flex items-center p-2 rounded-full bg-gray-400 dark:bg-gray-700 text-gray-800 dark:text-gray-400"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className="icon material-symbols-outlined">
        {theme === "light" ? "light_mode" : "dark_mode"}
      </span>
    </button>
  )
}