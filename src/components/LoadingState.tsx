import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "lucide-react";

const MESSAGES = [
  "Consulting the Excuse Database...",
  "Calculating your survival odds...",
  "Cross-referencing with HR blacklist...",
  "Generating plausible deniability...",
  "Asking ChatGPT what it would do...",
  "Preparing your LinkedIn profile just in case...",
];

export default function LoadingState() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-8">
      {/* Spinning icon with layered 3D rings */}
      <div className="relative flex items-center justify-center">
        {/* Outer pulse ring */}
        <motion.div
          className="absolute w-20 h-20 rounded-full border-2 border-red-200"
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Middle ring */}
        <motion.div
          className="absolute w-14 h-14 rounded-full border-2 border-red-300"
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.2, 0.8] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />
        {/* Spinning icon */}
        <div className="w-10 h-10 rounded-full bg-red-600 shadow-[0_4px_16px_rgba(220,38,38,0.4)] flex items-center justify-center">
          <Loader
            className="w-5 h-5 text-white animate-spin"
            strokeWidth={2.5}
          />
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2">
        {MESSAGES.map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            animate={{
              backgroundColor: i === index ? "#dc2626" : "#d1d5db",
              scale: i === index ? 1.4 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Cycling message */}
      <div className="h-8 flex items-center justify-center overflow-hidden px-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.35 }}
            className="text-sm text-gray-500 font-mono tracking-wide text-center"
          >
            {MESSAGES[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
