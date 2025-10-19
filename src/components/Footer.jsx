export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 py-8 text-center text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
      <p>© <span>{new Date().getFullYear()}</span> Sai’s Page • Built with React + Vite + Tailwind + Framer Motion</p>
    </footer>
  )
}
