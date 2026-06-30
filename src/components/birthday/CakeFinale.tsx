import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Fireworks } from "./Fireworks";

type State = "unlit" | "lit" | "blown";

const candles = [-60, -30, 0, 30, 60];

function Flame({ x }: { x: number }) {
  return (
    <motion.g
      initial={{ opacity: 0, scaleY: 0.2 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
      transition={{ duration: 0.35 }}
      style={{ transformOrigin: `${x + 200}px 110px` }}
    >
      <motion.ellipse
        cx={x + 200}
        cy={102}
        rx={5}
        ry={10}
        fill="url(#flameGrad)"
        animate={{ ry: [10, 12, 9, 11, 10], rx: [5, 4.5, 5.5, 5, 5] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 0 8px oklch(0.85 0.18 60 / 0.9))" }}
      />
      <circle cx={x + 200} cy={106} r={2.5} fill="oklch(0.75 0.2 250)" opacity={0.6} />
    </motion.g>
  );
}

function Smoke({ x }: { x: number }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={x + 200}
          cy={110}
          r={3}
          fill="oklch(0.7 0.01 0 / 0.5)"
          initial={{ opacity: 0.7, cy: 110, r: 3 }}
          animate={{ opacity: 0, cy: 30 - i * 10, r: 12, cx: x + 200 + (i - 1) * 6 }}
          transition={{ duration: 2.2, delay: i * 0.15, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

export function CakeFinale() {
  const [state, setState] = useState<State>("unlit");

  const onClick = () => {
    if (state === "unlit") setState("lit");
    else if (state === "lit") setState("blown");
  };

  return (
    <section className="relative min-h-screen overflow-hidden px-6 py-32">
      <Fireworks active={state === "blown"} />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: "var(--gradient-aurora)" }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 text-[10px] uppercase tracking-[0.5em] text-foreground/50"
        >
          ✦ Make a Wish ✦
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-display text-5xl font-light italic text-gold-gradient sm:text-6xl"
        >
          {state === "unlit" && "Tap to Light the Candles"}
          {state === "lit" && "Now, Make a Wish & Blow"}
          {state === "blown" && "Happy Birthday, Always."}
        </motion.h3>

        <div className="relative mx-auto mt-16 flex justify-center">
          {/* glow under cake */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            animate={{
              opacity: state === "lit" ? 0.7 : state === "blown" ? 0.35 : 0.2,
              scale: state === "lit" ? 1.1 : 1,
            }}
            transition={{ duration: 0.8 }}
            style={{ background: "radial-gradient(circle, oklch(0.85 0.18 60 / 0.8), transparent 70%)" }}
          />

          <motion.button
            type="button"
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative cursor-pointer outline-none"
            aria-label="Interact with the cake"
          >
            <svg viewBox="0 0 400 300" className="h-auto w-[min(420px,80vw)]">
              <defs>
                <linearGradient id="cakeTop" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.98 0.02 80)" />
                  <stop offset="100%" stopColor="oklch(0.88 0.04 70)" />
                </linearGradient>
                <linearGradient id="cakeBody" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.22 0.04 320)" />
                  <stop offset="100%" stopColor="oklch(0.14 0.03 320)" />
                </linearGradient>
                <linearGradient id="cakeBase" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.28 0.05 320)" />
                  <stop offset="100%" stopColor="oklch(0.16 0.03 320)" />
                </linearGradient>
                <linearGradient id="flameGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.98 0.12 90)" />
                  <stop offset="60%" stopColor="oklch(0.82 0.2 60)" />
                  <stop offset="100%" stopColor="oklch(0.65 0.2 30)" />
                </linearGradient>
                <linearGradient id="goldBand" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="oklch(0.7 0.14 70)" />
                  <stop offset="50%" stopColor="oklch(0.95 0.1 88)" />
                  <stop offset="100%" stopColor="oklch(0.7 0.14 70)" />
                </linearGradient>
              </defs>

              {/* base plate */}
              <ellipse cx="200" cy="270" rx="170" ry="10" fill="oklch(0 0 0 / 0.5)" />
              {/* tier 1 (bottom) */}
              <ellipse cx="200" cy="240" rx="150" ry="14" fill="url(#cakeBase)" />
              <rect x="50" y="200" width="300" height="42" fill="url(#cakeBase)" />
              <ellipse cx="200" cy="200" rx="150" ry="14" fill="oklch(0.32 0.05 320)" />
              <rect x="50" y="218" width="300" height="3" fill="url(#goldBand)" opacity="0.8" />

              {/* tier 2 (top) */}
              <ellipse cx="200" cy="195" rx="105" ry="10" fill="url(#cakeBody)" />
              <rect x="95" y="140" width="210" height="55" fill="url(#cakeBody)" />
              <ellipse cx="200" cy="140" rx="105" ry="10" fill="url(#cakeTop)" />
              <rect x="95" y="158" width="210" height="2.5" fill="url(#goldBand)" opacity="0.85" />

              {/* drips */}
              {[110, 150, 200, 250, 290].map((x, i) => (
                <path
                  key={i}
                  d={`M${x} 140 Q${x + 4} ${150 + (i % 2) * 6} ${x + 8} 140`}
                  fill="url(#cakeTop)"
                  opacity="0.9"
                />
              ))}

              {/* candles */}
              {candles.map((x, i) => (
                <g key={i}>
                  <rect
                    x={x + 197}
                    y={112}
                    width={6}
                    height={28}
                    rx={1.5}
                    fill="oklch(0.95 0.02 60)"
                  />
                  <rect
                    x={x + 197}
                    y={112}
                    width={6}
                    height={6}
                    fill="oklch(0.8 0.06 60)"
                    opacity="0.6"
                  />
                  <line
                    x1={x + 200}
                    y1={108}
                    x2={x + 200}
                    y2={112}
                    stroke="oklch(0.2 0 0)"
                    strokeWidth={1}
                  />
                </g>
              ))}

              <AnimatePresence>
                {state === "lit" && candles.map((x, i) => <Flame key={i} x={x} />)}
              </AnimatePresence>

              {state === "blown" && candles.map((x, i) => <Smoke key={i} x={x} />)}
            </svg>
          </motion.button>
        </div>

        <AnimatePresence>
          {state === "blown" && (
            <motion.div
              key="final"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.6, delay: 0.6 }}
              className="mx-auto mt-16 max-w-2xl"
            >
              <p className="font-display text-2xl font-light italic leading-relaxed text-foreground/90 sm:text-3xl">
                "Happy Birthday once again, Madhu Mitha. May every new year of
                your life be even more beautiful than the last."
                <span className="ml-2 text-rose">❤</span>
              </p>
              <div className="mx-auto mt-10 h-px w-24 hairline" />
              <div className="mt-6 text-[10px] uppercase tracking-[0.5em] text-foreground/40">
                With all my love
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {state !== "blown" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 text-[11px] uppercase tracking-[0.4em] text-foreground/40"
          >
            {state === "unlit" ? "Tap the cake" : "Tap again to blow them out"}
          </motion.div>
        )}
      </div>
    </section>
  );
}
