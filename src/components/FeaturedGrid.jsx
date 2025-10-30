import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Info } from "lucide-react";
import Animation from "../assets/Animation.gif"; // 👈 Eriski demo GIF

export default function FeaturedGrid({ items }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((it) => (
        <Card
          key={it.title}
          item={it}
          compact={it.compact}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </div>
  );
}

function TechChips({ list }) {
  if (!list?.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {list.map((t) => (
        <span
          key={t}
          className="rounded-full border border-neutral-200 px-2 py-1 text-xs dark:border-neutral-800"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export function Card({ item, compact, prefersReducedMotion }) {
  const [open, setOpen] = useState(false);

  // If item has its own media, use it; otherwise show Animation.gif for Eriski
  const isEriski =
    (item?.slug ?? "").toLowerCase() === "eriski" ||
    (item?.title ?? "").toLowerCase().includes("eriski");
  const mediaSrc = item?.media ?? (isEriski ? Animation : null);
  const mediaAlt = item?.mediaAlt ?? `${item?.title ?? "Project"} demo`;

  // Close on ESC + lock body scroll when modal is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [open]);

  const content = (
    <div
      className={`rounded-2xl border border-neutral-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow dark:border-neutral-800 dark:bg-neutral-950 ${
        compact ? "" : "md:p-6"
      }`}
    >
      <h3 className="text-lg font-semibold">{item.title}</h3>
      <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
        {item.blurb}
      </p>
      <TechChips list={item.tech} />
      <div className="mt-4 flex flex-wrap gap-2">
        {item.repo && item.repo !== "#" && (
          <a
            href={item.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 rounded-xl border border-neutral-200 px-3 py-1.5 text-sm focus-ring dark:border-neutral-800"
          >
            <Github size={16} /> View Repo
          </a>
        )}
        {(item.more || mediaSrc) && (
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1 rounded-xl border border-neutral-200 px-3 py-1.5 text-sm focus-ring dark:border-neutral-800"
          >
            <Info size={16} /> More Info
          </button>
        )}
      </div>
    </div>
  );

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
            className="w-full max-w-3xl overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 text-neutral-100 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-neutral-800 px-6 py-4">
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <button
                className="rounded-lg border border-neutral-700 px-2 py-1 text-sm focus-ring"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                Close
              </button>
            </div>

            {/* Media (GIF) */}
            {mediaSrc && (
              <div className="max-h-[70vh] overflow-auto bg-black">
                <img
                  src={mediaSrc}
                  alt={mediaAlt}
                  className="mx-auto h-auto w-full"
                />
              </div>
            )}

            {/* Text */}
            {item.more && (
              <div className="px-6 py-4 text-sm text-neutral-300">
                {item.more}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// attach for reuse in Projects grid
FeaturedGrid.Card = Card;
