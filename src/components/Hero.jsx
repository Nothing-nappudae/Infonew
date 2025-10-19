import { site } from '../content.js'
import { motion, useReducedMotion } from 'framer-motion'

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  return (
    <div className="grid items-center gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{site.title}</h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300">{site.tagline}</p>
        <div className="flex flex-wrap gap-3">
          {site.ctas.map((c) => (
            <a
              key={c.href}
              href={c.href}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-2xl border border-neutral-200 px-4 py-2 text-sm shadow-soft hover:-translate-y-0.5 hover:shadow focus-ring transition-transform dark:border-neutral-800"
            >
              {c.label}
            </a>
          ))}
          <a href="#hobbies" className="text-sm underline underline-offset-4 focus-ring">
            Back to Fun →
          </a>
        </div>
      </div>
      <div className="flex justify-center md:justify-end">
        <motion.picture
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.28 }}
        >
          <img
            src={site.pfp}
            alt="Profile picture"
            width="200"
            height="200"
            loading="eager"
            className="h-40 w-40 rounded-full object-cover shadow-soft ring-1 ring-neutral-200 transition-transform hover:scale-105 dark:ring-neutral-800"
          />
        </motion.picture>
      </div>
    </div>
  )
}
