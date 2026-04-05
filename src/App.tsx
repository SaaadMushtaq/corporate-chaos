import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ClipboardList,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";
import "./App.css";
import ExcuseForm from "./components/ExcuseForm";
import ExcuseCard from "./components/ExcuseCard";
import LoadingState from "./components/LoadingState";
import { generateExcuses } from "./utils/generateExcuses";
import type { ExcuseFormData, ExcuseResult } from "./types";

const App = () => {
  const [result, setResult] = useState<ExcuseResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: ExcuseFormData) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await generateExcuses(formData);
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Your excuse remains ungenerated.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const survivalColor =
    result && result.survivalChance >= 60
      ? "bg-green-500"
      : result && result.survivalChance >= 30
        ? "bg-yellow-500"
        : "bg-red-500";

  return (
    <div className="min-h-screen bg-linear-to-br from-stone-100 via-amber-50 to-red-50 font-mono">
      {/* Header */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative border-b-2 border-red-700 bg-white/80 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-4 py-7 text-center"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-red-700 via-red-500 to-red-700" />

        <div className="flex items-center justify-center gap-3 mb-1">
          <ShieldAlert className="text-red-600 w-8 h-8" strokeWidth={2.5} />
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Corporate CHAOS
          </h1>
          <ShieldAlert className="text-red-600 w-8 h-8" strokeWidth={2.5} />
        </div>

        <p className="text-xs text-gray-500 uppercase tracking-widest">
          Official Workplace Incident Recovery System
        </p>

        <motion.div
          initial={{ rotate: -3, scale: 0.8, opacity: 0 }}
          animate={{ rotate: -2, scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="inline-block mt-3 border-2 border-red-600 text-red-600 text-[10px] uppercase tracking-widest font-black px-3 py-1 rounded"
        >
          EST. when Stack Overflow went down
        </motion.div>

        <p className="text-[11px] text-gray-400 mt-2 italic">
          Not responsible for actual terminations.
        </p>
      </motion.header>

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="w-full md:w-105 md:sticky md:top-8 shrink-0"
          >
            <ExcuseForm onSubmit={handleSubmit} isLoading={isLoading} />
          </motion.div>

          {/* Right — results */}
          <div className="flex-1 min-w-0">
            {isLoading && <LoadingState />}

            <AnimatePresence>
              {error && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-3 bg-red-50 border-2 border-red-400 rounded-lg px-4 py-3 text-red-700 text-sm font-mono shadow-md"
                >
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-black uppercase tracking-widest block text-xs mb-1">
                      Error
                    </span>
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {result && !isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20, rotateX: -8 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{ transformPerspective: 1000 }}
                    className="bg-white border-2 border-stone-200 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] px-5 py-5"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp
                        className="w-4 h-4 text-red-600"
                        strokeWidth={2.5}
                      />
                      <p className="text-[10px] uppercase tracking-widest font-black text-red-600">
                        Situation Assessment
                      </p>
                    </div>
                    <p className="text-sm text-gray-800 font-bold italic leading-snug mb-5 pl-1 border-l-4 border-red-300">
                      &ldquo;{result.overallSituation}&rdquo;
                    </p>
                    <div>
                      <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5">
                        <span>Survival Probability</span>
                        <span className="tabular-nums">
                          {result.survivalChance}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.survivalChance}%` }}
                          transition={{
                            duration: 1,
                            ease: "easeOut",
                            delay: 0.2,
                          }}
                          className={`h-3 rounded-full ${survivalColor} shadow-sm`}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {result.excuses.map((excuse, i) => (
                    <ExcuseCard key={excuse.id} excuse={excuse} index={i} />
                  ))}

                  <p className="text-center text-[11px] text-gray-400 italic pt-2 pb-6">
                    Use responsibly. Results not guaranteed.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {!isLoading && !error && !result && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center justify-center py-20 text-center text-gray-400 gap-4"
              >
                <div className="p-4 rounded-full bg-stone-100 shadow-inner">
                  <ClipboardList
                    className="w-10 h-10 text-stone-400"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="text-sm uppercase tracking-widest">
                  Fill out the incident report to generate your excuses
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
