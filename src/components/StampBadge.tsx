import {
  Skull,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  ShieldOff,
} from "lucide-react";

export type StampVariant = "low" | "medium" | "high" | "career-ending";

interface StampBadgeProps {
  label: string;
  variant: StampVariant;
}

const VARIANT_CLASSES: Record<
  StampVariant,
  { classes: string; pulse: boolean; icon: React.ReactNode }
> = {
  low: {
    classes: "border-green-500 text-green-700 bg-green-50",
    pulse: false,
    icon: <ShieldCheck className="w-3 h-3" />,
  },
  medium: {
    classes: "border-yellow-500 text-yellow-700 bg-yellow-50",
    pulse: false,
    icon: <ShieldAlert className="w-3 h-3" />,
  },
  high: {
    classes: "border-orange-500 text-orange-700 bg-orange-50",
    pulse: false,
    icon: <ShieldX className="w-3 h-3" />,
  },
  "career-ending": {
    classes: "border-red-600 text-red-700 bg-red-50",
    pulse: true,
    icon: <Skull className="w-3 h-3" />,
  },
};

export default function StampBadge({ label, variant }: StampBadgeProps) {
  const { classes, pulse, icon } = VARIANT_CLASSES[variant];
  return (
    <span
      className={`inline-flex items-center gap-1 border-2 font-mono font-black text-[10px] uppercase tracking-widest px-2 py-0.5 rounded -rotate-1 ${
        pulse ? "animate-pulse" : ""
      } ${classes}`}
    >
      {icon}
      {label}
    </span>
  );
}
