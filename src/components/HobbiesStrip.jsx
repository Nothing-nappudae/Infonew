export default function HobbiesStrip({ items }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map((h) => (
        <figure key={h.title} className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <img
            src={h.img}
            alt={h.alt}
            width="400"
            height="300"
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform hover:scale-105"
          />
          <figcaption className="px-3 py-2 text-sm">{h.title}</figcaption>
        </figure>
      ))}
    </div>
  )
}
