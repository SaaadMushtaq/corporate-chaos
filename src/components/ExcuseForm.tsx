import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Clock,
  Eye,
  FileText,
  Flame,
  Loader2,
  MessageSquarePlus,
  Send,
  Siren,
  User,
} from "lucide-react";
import { type ExcuseFormData, type IncidentSeverity } from "../types";

interface ExcuseFormProps {
  onSubmit: (data: ExcuseFormData) => void;
  isLoading: boolean;
}

const SEVERITY_OPTIONS: {
  value: IncidentSeverity;
  label: string;
  icon: React.ReactNode;
  activeClass: string;
  idleClass: string;
}[] = [
  {
    value: "minor",
    label: "Minor",
    icon: <AlertCircle className="w-3.5 h-3.5" />,
    activeClass:
      "bg-green-600 border-green-700 text-white shadow-[0_4px_0_#15803d]",
    idleClass: "border-green-300 text-green-700 hover:bg-green-50",
  },
  {
    value: "moderate",
    label: "Moderate",
    icon: <Flame className="w-3.5 h-3.5" />,
    activeClass:
      "bg-yellow-500 border-yellow-600 text-white shadow-[0_4px_0_#ca8a04]",
    idleClass: "border-yellow-300 text-yellow-700 hover:bg-yellow-50",
  },
  {
    value: "severe",
    label: "Severe",
    icon: <Flame className="w-3.5 h-3.5" />,
    activeClass:
      "bg-orange-500 border-orange-600 text-white shadow-[0_4px_0_#c2410c]",
    idleClass: "border-orange-300 text-orange-700 hover:bg-orange-50",
  },
  {
    value: "catastrophic",
    label: "Catastrophic",
    icon: <Siren className="w-3.5 h-3.5" />,
    activeClass:
      "bg-red-600 border-red-700 text-white shadow-[0_4px_0_#991b1b]",
    idleClass: "border-red-300 text-red-700 hover:bg-red-50",
  },
];

const INITIAL_STATE: ExcuseFormData = {
  whatHappened: "",
  whoNoticed: "manager",
  severity: "minor",
  timeOfIncident: "morning",
  extraContext: "",
};

export default function ExcuseForm({ onSubmit, isLoading }: ExcuseFormProps) {
  const [formData, setFormData] = useState<ExcuseFormData>(INITIAL_STATE);
  const [formNumber] = useState(
    () => `FORM #DEV-${Math.floor(1000 + Math.random() * 9000)}`,
  );

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSeverity(value: IncidentSeverity) {
    setFormData((prev) => ({ ...prev, severity: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(formData);
  }

  const inputClass =
    "w-full border border-stone-300 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 resize-none rounded-lg transition-shadow shadow-sm focus:shadow-md";

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-stone-200 shadow-[0_8px_32px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden"
    >
      <div className="bg-linear-to-br from-red-700 to-red-800 px-6 pt-5 pb-5 relative overflow-hidden">
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/5" />

        <div className="relative">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-red-200" strokeWidth={2} />
                <span className="text-red-200 text-[10px] uppercase tracking-widest font-bold">
                  Incident Report Form B-404
                </span>
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-widest leading-tight">
                Official Excuse
                <br />
                Department
              </h2>
              <p className="text-red-300 text-[11px] mt-1 tracking-wide">
                Human Error Division
              </p>
            </div>
            <span className="text-red-300 text-[10px] font-bold tracking-widest mt-1 shrink-0">
              {formNumber}
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 py-5 space-y-5">
        <motion.div
          custom={0}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: (i: number) => ({
              opacity: 1,
              y: 0,
              transition: { delay: i * 0.07, duration: 0.35, ease: "easeOut" },
            }),
          }}
          initial="hidden"
          animate="visible"
        >
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-700 mb-1">
            <FileText className="w-3.5 h-3.5 text-gray-400" />
            What did you break?
            <span className="inline-block bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded font-bold ml-1 tracking-normal normal-case">
              REQUIRED
            </span>
          </label>
          <textarea
            name="whatHappened"
            value={formData.whatHappened}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Be honest. We've seen worse. Probably."
            className={inputClass}
          />
        </motion.div>

        <motion.div
          custom={1}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: (i: number) => ({
              opacity: 1,
              y: 0,
              transition: { delay: i * 0.07, duration: 0.35, ease: "easeOut" },
            }),
          }}
          initial="hidden"
          animate="visible"
        >
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-700 mb-1">
            <Eye className="w-3.5 h-3.5 text-gray-400" />
            Damage Witnessed By
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <select
              name="whoNoticed"
              value={formData.whoNoticed}
              onChange={handleChange}
              className="w-full border border-stone-300 bg-white pl-9 pr-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 rounded-lg transition-shadow shadow-sm appearance-none"
            >
              <option value="manager">My Manager</option>
              <option value="client">The Client</option>
              <option value="whole-team">The Entire Team</option>
              <option value="ceo">The CEO</option>
              <option value="nobody-yet">Nobody... Yet</option>
            </select>
          </div>
        </motion.div>

        <motion.div
          custom={2}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: (i: number) => ({
              opacity: 1,
              y: 0,
              transition: { delay: i * 0.07, duration: 0.35, ease: "easeOut" },
            }),
          }}
          initial="hidden"
          animate="visible"
        >
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">
            <Flame className="w-3.5 h-3.5 text-gray-400" />
            Incident Severity
          </label>
          <div className="grid grid-cols-2 gap-2">
            {SEVERITY_OPTIONS.map(
              ({ value, label, icon, activeClass, idleClass }) => (
                <motion.button
                  key={value}
                  type="button"
                  whileTap={{ scale: 0.95, y: 2 }}
                  onClick={() => handleSeverity(value)}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wide border-2 rounded-lg transition-all ${
                    formData.severity === value
                      ? activeClass
                      : `bg-white ${idleClass} shadow-sm`
                  }`}
                >
                  {icon}
                  {label}
                </motion.button>
              ),
            )}
          </div>
        </motion.div>

        <motion.div
          custom={3}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: (i: number) => ({
              opacity: 1,
              y: 0,
              transition: { delay: i * 0.07, duration: 0.35, ease: "easeOut" },
            }),
          }}
          initial="hidden"
          animate="visible"
        >
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-700 mb-1">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            When Did This Happen
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <select
              name="timeOfIncident"
              value={formData.timeOfIncident}
              onChange={handleChange}
              className="w-full border border-stone-300 bg-white pl-9 pr-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 rounded-lg transition-shadow shadow-sm appearance-none"
            >
              <option value="monday-morning">Monday Morning</option>
              <option value="morning">During Work Hours</option>
              <option value="afternoon">Afternoon</option>
              <option value="end-of-day">End of Day</option>
              <option value="friday-5pm">Friday 5PM — Danger Zone</option>
            </select>
          </div>
        </motion.div>

        <motion.div
          custom={4}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: (i: number) => ({
              opacity: 1,
              y: 0,
              transition: { delay: i * 0.07, duration: 0.35, ease: "easeOut" },
            }),
          }}
          initial="hidden"
          animate="visible"
        >
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-700 mb-1">
            <MessageSquarePlus className="w-3.5 h-3.5 text-gray-400" />
            Anything Else?
            <span className="text-gray-400 font-normal normal-case text-[11px] tracking-normal ml-1">
              (Optional)
            </span>
          </label>
          <textarea
            name="extraContext"
            value={formData.extraContext}
            onChange={handleChange}
            rows={2}
            placeholder="Any details that could help or make things worse..."
            className={inputClass}
          />
        </motion.div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isLoading || !formData.whatHappened.trim()}
          whileHover={
            !isLoading && formData.whatHappened.trim()
              ? { y: -2, boxShadow: "0 8px 0 #991b1b" }
              : {}
          }
          whileTap={
            !isLoading && formData.whatHappened.trim()
              ? { y: 2, boxShadow: "0 2px 0 #991b1b" }
              : {}
          }
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest py-3.5 text-sm rounded-xl transition-colors shadow-[0_4px_0_#991b1b] disabled:shadow-none"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Generate My Excuses
            </>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
}
