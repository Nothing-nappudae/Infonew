export default function ReadingList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((r) => (
        <li key={r.url}>
          <a
            href={r.url}
            className="focus-ring inline-block rounded-xl border border-neutral-200 px-3 py-2 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
            target="_blank"
            rel="noreferrer noopener"
          >
            {r.title}
          </a>
        </li>
      ))}
    </ul>
  )
}
