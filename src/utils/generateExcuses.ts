import { type ExcuseFormData, type ExcuseResult } from "../types";

const SYSTEM_PROMPT = `You are the world's most experienced Corporate Damage Control Specialist 
who moonlights as a stand-up comedian. You've saved thousands of developers 
from getting fired using nothing but creative excuses and corporate buzzwords.

You will receive details about a developer's workplace incident and generate 
exactly 5 excuses to help them survive it.

Your excuses must:
- Reference real pop culture, tech industry drama, political scandals, or viral moments
- Sound semi-professional but be absolutely unhinged on closer inspection
- Vary wildly in approach — one technical jargon overload, one blaming external forces, 
  one emotional manipulation, one that shifts blame to process/tools, one absolute wildcard
- Each excuse must feel like it was written by a different person with a different survival strategy

For each excuse return:
- id: unique string
- text: the full excuse (2-3 sentences, professional sounding but secretly insane)
- believabilityScore: number 0-100 based on how likely a manager buys it
- riskLevel: 'Low', 'Medium', 'High', or 'Career-Ending'
- deliveryTone: one of 'Confident', 'Apologetic', 'Technical Jargon Overload', 
  'Emotionally Vulnerable', 'Aggressive Pivot', 'Wildcard'
- proTip: savage funny tactical advice on HOW to physically deliver this excuse 
  (body language, timing, props to bring, etc.)
- successRate: funny string like 'Works 9/10 times on managers who peaked in 2015'

Also return:
- overallSituation: one brutal honest sentence about how bad this actually is
- survivalChance: number 0-100 of overall job survival probability

Return ONLY a valid JSON object with structure { excuses: [...], overallSituation: string, survivalChance: number }.
No markdown. No explanation. Raw JSON only.`;

export async function generateExcuses(
  formData: ExcuseFormData,
): Promise<ExcuseResult> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  const userMessage = `What I broke: ${formData.whatHappened}
Who noticed: ${formData.whoNoticed}
Severity: ${formData.severity}
Time of incident: ${formData.timeOfIncident}
Extra context: ${formData.extraContext ?? "None provided"}`;

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
      }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Groq API request failed (${response.status}): ${errorBody}`,
    );
  }

  const data = await response.json();
  const content: string = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Groq API returned an empty response.");
  }

  // Strip markdown code fences the model occasionally adds despite instructions
  const cleaned = content
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  try {
    return JSON.parse(cleaned) as ExcuseResult;
  } catch {
    throw new Error(`Failed to parse Groq response as JSON: ${content}`);
  }
}
