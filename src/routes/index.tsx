import { createFileRoute } from "@tanstack/react-router";
import { lazy, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ClientOnly } from "@/components/birthday/ClientOnly";
import { BirthdayHero } from "@/components/birthday/BirthdayHero";
import { MemoriesTimeline } from "@/components/birthday/MemoriesTimeline";
import { CakeFinale } from "@/components/birthday/CakeFinale";

const IntroScene = lazy(() =>
  import("@/components/birthday/IntroScene").then((m) => ({ default: m.IntroScene })),
);
const PhotoGallery = lazy(() =>
  import("@/components/birthday/PhotoGallery").then((m) => ({ default: m.PhotoGallery })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Madhu Mitha" },
      {
        name: "description",
        content:
          "A cinematic, premium birthday tribute for Madhu Mitha — memories, moments, and a wish that lasts a lifetime.",
      },
      { property: "og:title", content: "Happy Birthday, Madhu Mitha" },
      {
        property: "og:description",
        content: "A premium cinematic birthday tribute filled with light, memories, and love.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [entered, setEntered] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ClientOnly>
        <AnimatePresence>
          {!entered && <IntroScene key="intro" onBegin={() => setEntered(true)} />}
        </AnimatePresence>
      </ClientOnly>

      <AnimatePresence>
        {entered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <BirthdayHero />
            <ClientOnly>
              <PhotoGallery />
            </ClientOnly>
            <MemoriesTimeline />
            <CakeFinale />
            <footer className="border-t border-white/5 px-6 py-10 text-center text-[10px] uppercase tracking-[0.5em] text-foreground/30">
              Crafted with love · For Madhu Mitha
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip intro for SSR / first paint placeholder, also shown if JS disabled */}
      <noscript>
        <div className="p-10 text-center font-display text-3xl italic">
          Happy Birthday, Madhu Mitha ❤
        </div>
      </noscript>
    </main>
  );
}
