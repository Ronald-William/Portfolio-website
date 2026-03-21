import { useEffect, useRef, useState, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useOutsideClick } from "../hooks/useOutsideClick";

const CarouselContext = createContext({ onCardClose: () => {}, currentIndex: 0 });

export const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = items.length;

  const VISIBLE = 3;

  const prev = useCallback(() => setCurrentIndex(i => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrentIndex(i => (i + 1) % total), [total]);

  const handleCardClose = useCallback((index) => setCurrentIndex(index), []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  const visibleIndices = Array.from({ length: VISIBLE }, (_, slot) =>
    (currentIndex + slot) % total
  );

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        {/* Two cards centred with fixed width, not stretching full width */}
        <div className="flex justify-center gap-6 px-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleIndices.map((realIndex, slot) => (
              <motion.div
                key={`${currentIndex}-${slot}`}
                initial={{ opacity: 0, x: slot === 0 ? -50 : 50, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{    opacity: 0, x: slot === 0 ? -50 : 50, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                // Fixed card width — 3 cards centred, not stretched
                className="w-60 md:w-72 shrink-0"
              >
                {items[realIndex]}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-6 px-6">
          {/* Prev */}
          <button
            onClick={prev}
            className="h-10 w-10 rounded-full flex items-center justify-center transition-all"
            style={{ background: 'var(--btn-bg)', border: '1px solid var(--btn-border)' }}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width:      visibleIndices.includes(i) ? 20 : 8,
                  height:     8,
                  background: visibleIndices.includes(i)
                    ? 'var(--acc, #b794ff)'
                    : 'var(--dot-inactive, rgba(155,109,255,0.25))',
                }}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="h-10 w-10 rounded-full flex items-center justify-center transition-all"
            style={{ background: 'var(--btn-bg)', border: '1px solid var(--btn-border)' }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index }) => {
  const { onCardClose } = useContext(CarouselContext);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useOutsideClick(containerRef, () => { if (open) handleClose(); });

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleOpen  = () => { setOpen(true);  document.body.style.overflow = "hidden"; };
  const handleClose = () => { setOpen(false); document.body.style.overflow = "auto";   onCardClose(index); };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              ref={containerRef}
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0,  opacity: 1, scale: 1 }}
              exit={{    y: 40, opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="w-[90%] max-w-2xl max-h-[80vh] overflow-auto rounded-3xl relative"
              style={{ background: "var(--card-bg, #1e1840)" }}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                <X size={16} />
              </button>
              <div className="relative h-48 md:h-64 rounded-t-3xl overflow-hidden">
                <img src={card.src} alt={card.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.75))" }} />
                <div className="absolute bottom-4 left-6">
                  <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "var(--acc, #b794ff)" }}>{card.category}</p>
                  <p className="text-xl font-display font-bold text-white">{card.title}</p>
                </div>
              </div>
              <div className="p-6">{card.content}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed card — taller, fixed width */}
      <motion.button
        onClick={handleOpen}
        whileHover={{ scale: 1.03, y: -4 }}
        transition={{ duration: 0.2 }}
        className="w-full rounded-3xl overflow-hidden cursor-pointer relative flex flex-col items-start justify-start text-left focus:outline-none"
        style={{ height: "420px" }}
      >
        {/* Cover image */}
        <div className="absolute inset-0">
          <img src={card.src} alt={card.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 35%, rgba(0,0,0,0.85) 100%)" }} />
        </div>

        {/* Category pill — top left, always readable */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className="px-3 py-1 text-xs font-mono font-semibold rounded-full"
            style={{
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "var(--acc, #b794ff)",
            }}
          >
            {card.category}
          </span>
        </div>

        {/* Title + hint — bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-lg font-display font-bold text-white leading-snug mb-1">{card.title}</p>
          <p className="text-xs text-white/50 font-mono">Click to explore →</p>
        </div>
      </motion.button>
    </>
  );
};