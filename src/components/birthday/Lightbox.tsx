import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: { src: string; caption?: string }[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-6 backdrop-blur-xl"
          onClick={onClose}
        >
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full glass p-3 text-foreground/70 transition hover:text-foreground"
          >
            <X size={20} />
          </button>
          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full glass p-3 text-foreground/70 transition hover:text-foreground sm:left-8"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full glass p-3 text-foreground/70 transition hover:text-foreground sm:right-8"
          >
            <ChevronRight size={24} />
          </button>

          <motion.img
            key={index}
            src={images[index].src}
            alt={images[index].caption ?? ""}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[85vh] max-w-[90vw] rounded-3xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
