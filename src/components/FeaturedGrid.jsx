import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, Info } from 'lucide-react'

export default function FeaturedGrid({ items }) {
  const prefersReducedMotion = useReducedMotion()
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((it) => (
        <Card key={it.title} item={it} prefersReducedMotion={prefersReducedMotion} />
      ))}
    </div>
  )
}

function TechChips({ list }) {
  if (!list?.length) return null
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {list.map((t) => (
        <span key={t} className="rounded-full border border-neutral-200 px-2 py-1 text-xs dark:border-neutral-800">
          {t}
        </span>
      ))}
    </div>
  )
}

export function Card({ item, compact, prefersReducedMotion }) {
  const [open, setOpen] = useState(false)
  const content = (
    <div
      className={`rounded-2xl border border-neutral-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow dark:border-neutral-800 dark:bg-neutral-950 ${
        compact ? '' : 'md:p-6'
      }`}
    >
      <h3 className="text-lg font-semibold">{item.title}</h3>
      <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{item.blurb}</p>
      <TechChips list={item.tech} />
      <div className="mt-4 flex flex-wrap gap-2">
        {item.repo && item.repo !== '#' && (
          <a
            href={item.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 rounded-xl border border-neutral-200 px-3 py-1.5 text-sm focus-ring dark:border-neutral-800"
          >
            <Github size={16} /> View Repo
          </a>
        )}
        {item.more && (
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1 rounded-xl border border-neutral-200 px-3 py-1.5 text-sm focus-ring dark:border-neutral-800"
          >
            <Info size={16} /> More Info
          </button>
        )}
      </div>
    </div>
  )

  return (
    <>
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.25 }}
      >
        {content}
      </motion.div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} details`}
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-950 p-6 text-neutral-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <button
                className="rounded-lg border border-neutral-700 px-2 py-1 text-sm focus-ring"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                Close
              </button>
            </div>
            <p className="mt-3 text-sm text-neutral-300">{item.more}</p>
          </div>
        </div>
      )}
    </>
  )
}

// attach for reuse in Projects grid
FeaturedGrid.Card = Card
