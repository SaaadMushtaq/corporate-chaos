export type IncidentSeverity = "minor" | "moderate" | "severe" | "catastrophic";

export interface ExcuseFormData {
  whatHappened: string;
  whoNoticed: "manager" | "client" | "whole-team" | "ceo" | "nobody-yet";
  severity: IncidentSeverity;
  timeOfIncident:
    | "morning"
    | "afternoon"
    | "end-of-day"
    | "friday-5pm"
    | "monday-morning";
  extraContext?: string;
}

export interface Excuse {
  id: string;
  text: string;
  believabilityScore: number;
  riskLevel: "Low" | "Medium" | "High" | "Career-Ending";
  deliveryTone: string;
  proTip: string;
  successRate: string;
}

export interface ExcuseResult {
  excuses: Excuse[];
  overallSituation: string;
  survivalChance: number;
}
