import { motion, useReducedMotion } from 'framer-motion'

export default function Section({ id, title, children }) {
  const prefersReducedMotion = useReducedMotion()
  return (
    <section id={id} aria-labelledby={title ? `${id}-title` : undefined} className="py-16">
      {title && (
        <h2 id={`${id}-title`} className="mb-6 text-2xl font-semibold tracking-tight">
          {title}
        </h2>
      )}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.28 }}
      >
        {children}
      </motion.div>
    </section>
  )
}
