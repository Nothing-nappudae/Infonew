import { site } from '../content.js'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle.jsx'

export default function Header({ sections, active, theme, onToggle }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#home" className="text-sm font-semibold tracking-tight focus-ring" aria-label="Go to home">
          {site.title}
        </a>
        <nav aria-label="Primary" className="hidden gap-6 md:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`text-sm hover:opacity-100 opacity-80 focus-ring ${active === s.id ? 'nav-active' : ''}`}
            >
              {s.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggle} />
          <button
            className="md:hidden rounded-2xl border border-neutral-200 px-3 py-2 text-sm shadow-soft hover:shadow focus-ring dark:border-neutral-800"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </div>
      <div id="mobile-nav" hidden={!open} className="md:hidden border-t border-neutral-200 dark:border-neutral-800">
        <nav className="mx-auto max-w-6xl px-4 py-2" aria-label="Mobile">
          <ul className="grid grid-cols-2 gap-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block rounded-xl border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50 focus-ring dark:border-neutral-800 dark:hover:bg-neutral-900"
                  onClick={() => setOpen(false)}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
