import { motion } from "framer-motion";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g6 from "@/assets/g6.jpg";
import g7 from "@/assets/g7.jpg";

const items = [
  {
    year: "Chapter One",
    title: "The Beginning",
    body: "The day our paths first crossed — when a stranger quietly turned into the person who'd know me best.",
    img: g6,
  },
  {
    year: "Chapter Two",
    title: "Late Night Talks",
    body: "Conversations that bent into sunrise, secrets traded in whispers, dreams we promised to chase together.",
    img: g2,
  },
  {
    year: "Chapter Three",
    title: "Adventures",
    body: "Spontaneous trips, golden coastlines, cities lit at midnight — collecting memories like quiet treasures.",
    img: g7,
  },
  {
    year: "Chapter Four",
    title: "Always & Always",
    body: "Through every season, every storm, every celebration — you've been the constant light. Here's to the next chapter.",
    img: g3,
  },
];

export function MemoriesTimeline() {
  return (
    <section className="relative px-6 py-40">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{ background: "var(--gradient-aurora)" }}
      />
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 text-[10px] uppercase tracking-[0.5em] text-foreground/50"
          >
            ✦ Our Memories ✦
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="font-display text-5xl font-light italic text-gold-gradient sm:text-6xl"
          >
            A Timeline of Us
          </motion.h3>
        </div>

        <div className="relative">
          {/* spine */}
          <div
            className="pointer-events-none absolute inset-y-0 left-6 w-px md:left-1/2"
            style={{
              background:
                "linear-gradient(to bottom, transparent, oklch(0.84 0.12 85 / 0.35) 15%, oklch(0.84 0.12 85 / 0.35) 85%, transparent)",
            }}
          />

          <div className="space-y-20">
            {items.map((it, i) => {
              const right = i % 2 === 1;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative grid grid-cols-1 items-center gap-8 pl-16 md:grid-cols-2 md:gap-16 md:pl-0 ${
                    right ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* card */}
                  <div className={`${right ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                    <div className="glass overflow-hidden rounded-3xl p-1">
                      <div className="overflow-hidden rounded-[1.4rem]">
                        <img
                          src={it.img}
                          alt={it.title}
                          loading="lazy"
                          className="h-56 w-full object-cover transition-transform duration-1000 hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <div className="mb-2 text-[10px] uppercase tracking-[0.4em] text-primary/80">
                          {it.year}
                        </div>
                        <h4 className="font-display text-3xl font-light italic text-foreground">
                          {it.title}
                        </h4>
                        <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                          {it.body}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* node */}
                  <div className="pointer-events-none absolute left-6 top-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                    <div
                      className="size-4 rounded-full"
                      style={{
                        background: "var(--gradient-gold)",
                        boxShadow: "0 0 24px oklch(0.84 0.12 85 / 0.7)",
                      }}
                    />
                  </div>

                  {/* empty spacer for the other column */}
                  <div className="hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
