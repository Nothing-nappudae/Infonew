import { site } from '../content.js'

function Chips({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((s) => (
        <span key={s} className="rounded-full border border-neutral-200 px-2 py-1 text-xs dark:border-neutral-800">
          {s}
        </span>
      ))}
    </div>
  )
}

export default function Skills() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div>
        <h3 className="mb-2 font-medium">Skills</h3>
        <Chips items={site.skills.skills} />
      </div>
      <div>
        <h3 className="mb-2 font-medium">Learning</h3>
        <Chips items={site.skills.learning} />
      </div>
      <div>
        <h3 className="mb-2 font-medium">Tools</h3>
        <Chips items={site.skills.tools} />
      </div>
    </div>
  )
}
