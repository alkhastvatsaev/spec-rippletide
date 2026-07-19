export type RunStatus = "ok" | "blocked" | "review";

export type DecisionRun = {
  id: string;
  agent: string;
  status: RunStatus;
  latencyMs: number;
  createdAt: string;
  decision: string;
  rationale: string;
  inputs: Record<string, string | number | boolean>;
  timeline: { t: string; event: string }[];
};

export const runs: DecisionRun[] = [
  {
    id: "run_8f2a91",
    agent: "checkout-guard",
    status: "ok",
    latencyMs: 42,
    createdAt: "2026-07-19T14:02:11Z",
    decision: "ALLOW",
    rationale: "Risk score below threshold; merchant verified in last 24h.",
    inputs: { amount: 1280, currency: "EUR", merchantRisk: 0.12 },
    timeline: [
      { t: "0ms", event: "Request received" },
      { t: "11ms", event: "Features hydrated" },
      { t: "42ms", event: "Policy evaluated → ALLOW" },
    ],
  },
  {
    id: "run_3c10de",
    agent: "ops-router",
    status: "review",
    latencyMs: 118,
    createdAt: "2026-07-19T13:44:02Z",
    decision: "ESCALATE",
    rationale: "Ambiguous policy edge: two conflicting rules matched.",
    inputs: { queue: "eu-west", priority: "P1", conflictCount: 2 },
    timeline: [
      { t: "0ms", event: "Request received" },
      { t: "64ms", event: "Rule conflict detected" },
      { t: "118ms", event: "Escalated to human review" },
    ],
  },
  {
    id: "run_91bb04",
    agent: "fraud-scout",
    status: "blocked",
    latencyMs: 67,
    createdAt: "2026-07-19T12:19:55Z",
    decision: "BLOCK",
    rationale: "Device fingerprint linked to prior chargebacks.",
    inputs: { deviceId: "fp_77xa", chargebacks: 3, geoMismatch: true },
    timeline: [
      { t: "0ms", event: "Request received" },
      { t: "22ms", event: "Fingerprint match" },
      { t: "67ms", event: "Policy evaluated → BLOCK" },
    ],
  },
  {
    id: "run_55e0c2",
    agent: "checkout-guard",
    status: "ok",
    latencyMs: 38,
    createdAt: "2026-07-19T11:01:40Z",
    decision: "ALLOW",
    rationale: "Repeat customer; velocity within envelope.",
    inputs: { amount: 49, currency: "EUR", repeatCustomer: true },
    timeline: [
      { t: "0ms", event: "Request received" },
      { t: "9ms", event: "Customer graph hit" },
      { t: "38ms", event: "Policy evaluated → ALLOW" },
    ],
  },
  {
    id: "run_c2aa17",
    agent: "support-triage",
    status: "review",
    latencyMs: 95,
    createdAt: "2026-07-19T10:22:08Z",
    decision: "ROUTE_SENIOR",
    rationale: "Sentiment + legal keywords → senior queue.",
    inputs: { channel: "email", sentiment: -0.71, legalHit: true },
    timeline: [
      { t: "0ms", event: "Ticket ingested" },
      { t: "41ms", event: "NLP features ready" },
      { t: "95ms", event: "Routed to senior queue" },
    ],
  },
];

export function getRun(id: string) {
  return runs.find((run) => run.id === id);
}
