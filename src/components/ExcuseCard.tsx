import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Lightbulb, MessageCircle, TrendingUp } from "lucide-react";
import { type Excuse } from "../types";
import StampBadge from "./StampBadge";

interface ExcuseCardProps {
  excuse: Excuse;
  index: number;
}

const TONE_COLORS: Record<string, string> = {
  Confident: "bg-blue-100 text-blue-800 border-blue-200",
  Apologetic: "bg-purple-100 text-purple-800 border-purple-200",
  "Technical Jargon Overload": "bg-cyan-100 text-cyan-800 border-cyan-200",
  "Emotionally Vulnerable": "bg-pink-100 text-pink-800 border-pink-200",
  "Aggressive Pivot": "bg-orange-100 text-orange-800 border-orange-200",
  Wildcard: "bg-lime-100 text-lime-800 border-lime-200",
};

export default function ExcuseCard({ excuse, index }: ExcuseCardProps) {
  const [hovered, setHovered] = useState(false);
  const toneColor =
    TONE_COLORS[excuse.deliveryTone] ??
    "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -6 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.45, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -4, boxShadow: "0 20px 48px rgba(0,0,0,0.13)" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ transformPerspective: 1000 }}
      className="bg-white border border-stone-200 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden transition-shadow"
    >
      {/* Colored top accent bar */}
      <motion.div
        className="h-1 w-full bg-gradient-to-r from-red-500 via-orange-400 to-red-600"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          delay: index * 0.15 + 0.3,
          duration: 0.5,
          ease: "easeOut",
        }}
        style={{ transformOrigin: "left" }}
      />

      {/* Card Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center shadow-sm">
            <span className="text-white text-[10px] font-black">
              {index + 1}
            </span>
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-gray-500 font-mono">
            Excuse
          </span>
        </div>
        <StampBadge
          label={
            excuse.riskLevel === "Career-Ending"
              ? "CAREER-ENDING"
              : `${excuse.riskLevel.toUpperCase()} RISK`
          }
          variant={
            excuse.riskLevel.toLowerCase() as import("./StampBadge").StampVariant
          }
        />
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Excuse Text */}
        <div className="relative border-l-4 border-red-400 pl-4">
          <MessageCircle className="absolute -left-2.5 top-0 w-4 h-4 text-red-400 bg-white" />
          <p className="text-gray-800 text-sm leading-relaxed font-mono pt-1">
            {excuse.text}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {/* Believability */}
          <div className="space-y-1.5 bg-stone-50 rounded-xl p-3 border border-stone-100">
            <div className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-gray-400" />
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                Believability
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-red-400 to-red-600 h-1.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: hovered
                      ? `${excuse.believabilityScore}%`
                      : `${excuse.believabilityScore}%`,
                  }}
                  transition={{
                    delay: index * 0.15 + 0.4,
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                />
              </div>
              <span className="text-xs font-black text-gray-700 tabular-nums">
                {excuse.believabilityScore}%
              </span>
            </div>
          </div>

          {/* Delivery Tone */}
          <div className="space-y-1.5 bg-stone-50 rounded-xl p-3 border border-stone-100">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-gray-400" />
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                Tone
              </p>
            </div>
            <span
              className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                toneColor
              }`}
            >
              {excuse.deliveryTone}
            </span>
          </div>

          {/* Success Rate */}
          <div className="space-y-1.5 bg-stone-50 rounded-xl p-3 border border-stone-100">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
              Success Rate
            </p>
            <p className="text-[11px] italic text-gray-600 leading-tight">
              {excuse.successRate}
            </p>
          </div>
        </div>

        {/* Pro Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.15 + 0.5 }}
          className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 shadow-inner"
        >
          <Lightbulb
            className="w-4 h-4 text-amber-500 mt-0.5 shrink-0"
            strokeWidth={2}
          />
          <p className="text-xs text-amber-900">
            <span className="font-black">PRO TIP: </span>
            {excuse.proTip}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
