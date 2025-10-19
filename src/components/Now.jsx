import React from "react";
import { motion } from "framer-motion";

export default function Now({ now }) {
  if (!now) return null;

  return (
    <section id="now" className="py-16 px-6 max-w-4xl mx-auto text-center">
      <motion.h2
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {now.heading}
      </motion.h2>

      <motion.p
        className="text-lg leading-relaxed text-gray-300 mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {now.text}
      </motion.p>

      {now.details && (
        <motion.pre
          className="text-sm text-gray-400 bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl mb-6 text-left whitespace-pre-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {now.details}
        </motion.pre>
      )}

      {now.dm && (
        <motion.a
          href={now.dm.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-full shadow transition"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {now.dm.label}
        </motion.a>
      )}
    </section>
  );
}
