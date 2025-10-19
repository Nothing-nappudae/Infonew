import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      aria-label="Toggle theme"
      className="rounded-2xl border border-neutral-200 px-3 py-2 text-sm shadow-soft hover:shadow focus-ring dark:border-neutral-800"
      onClick={onToggle}
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
