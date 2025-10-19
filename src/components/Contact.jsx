import { site } from '../content.js'
import { Github, MessageCircle } from 'lucide-react'

export default function Contact() {
  return (
    <div className="space-y-4">
      <a className="inline-block rounded-full border border-neutral-200 px-4 py-2 text-sm focus-ring dark:border-neutral-800" href={`mailto:${site.email}`}>
        📧 {site.email}
      </a>
      <div className="flex items-center gap-3">
        <a
          href={site.socials.github}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub"
          className="focus-ring rounded-xl border border-neutral-200 p-2 dark:border-neutral-800"
        >
          <Github size={18} />
        </a>
        <a
          href={site.socials.discord}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Discord"
          className="focus-ring rounded-xl border border-neutral-200 p-2 dark:border-neutral-800"
        >
          <MessageCircle size={18} />
        </a>
      </div>
    </div>
  )
}
