import { motion } from "framer-motion";

const title = "Happy Birthday, Madhu Mitha";
const words = title.split(" ");

export function BirthdayHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-32">
      {/* ambient */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-aurora)" }} />
      <div
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          background:
            "conic-gradient(from 200deg at 50% 0%, transparent 0deg, oklch(0.9 0.1 85 / 0.18) 30deg, transparent 60deg)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline" />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-6 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-foreground/50"
        >
          <span className="h-px w-10 bg-foreground/30" />
          The Story of You
          <span className="h-px w-10 bg-foreground/30" />
        </motion.div>

        <h2 className="font-display text-5xl font-light leading-[1.05] sm:text-7xl md:text-8xl">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mr-3 inline-block italic text-gold-gradient"
            >
              {w.replace(",", "")}
              {i === 1 && ","}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
            className="ml-2 inline-block"
            style={{ color: "oklch(0.7 0.2 18)", filter: "drop-shadow(0 0 24px oklch(0.7 0.2 18 / 0.6))" }}
          >
            ❤
          </motion.span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 1.2 }}
          className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-foreground/75 sm:text-xl"
        >
          To my amazing best friend — thank you for filling life with laughter,
          kindness, and unforgettable memories. May this year bring you endless
          happiness, success, good health, and everything your heart wishes for.
          Keep smiling, keep shining, and never stop being the wonderful person
          you are. <span className="text-gold-gradient italic">Happy Birthday!</span> 🎂✨
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-20 flex flex-col items-center gap-3"
        >
          <div className="text-[10px] uppercase tracking-[0.4em] text-foreground/40">Scroll</div>
          <motion.div
            className="h-12 w-px"
            style={{ background: "linear-gradient(to bottom, transparent, oklch(0.84 0.12 85 / 0.8))" }}
            animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
