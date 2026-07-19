import Link from "next/link";

import { runs, type RunStatus } from "@/data/runs";

function statusClass(status: RunStatus) {
  if (status === "ok") return "status status-ok";
  if (status === "review") return "status status-review";
  return "status status-blocked";
}

export default function ConsolePage() {
  return (
    <main className="shell">
      <div className="banner rise">
        Spec prototype — not affiliated with Rippletide.{" "}
        <Link href="/" style={{ textDecoration: "underline" }}>
          Back
        </Link>
      </div>

      <header
        className="rise rise-delay-1"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          gap: "1rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p className="mono" style={{ color: "var(--muted)", fontSize: "0.75rem", margin: 0 }}>
            CONSOLE / RUNS
          </p>
          <h1 style={{ margin: "0.35rem 0 0", fontSize: "1.75rem", letterSpacing: "-0.02em" }}>
            Decision runs
          </h1>
        </div>
        <p className="mono" style={{ color: "var(--muted)", fontSize: "0.8rem", margin: 0 }}>
          {runs.length} events · mock data
        </p>
      </header>

      <div className="panel rise rise-delay-2" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid var(--line)" }}>
              {["Run", "Agent", "Status", "Decision", "Latency", ""].map((h) => (
                <th
                  key={h}
                  className="mono"
                  style={{
                    padding: "0.85rem 1rem",
                    fontSize: "0.7rem",
                    color: "var(--muted)",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {runs.map((run, i) => (
              <tr
                key={run.id}
                className={`rise rise-delay-${Math.min(i + 1, 3)}`}
                style={{ borderBottom: "1px solid var(--line)" }}
              >
                <td className="mono" style={{ padding: "0.9rem 1rem", fontSize: "0.85rem" }}>
                  {run.id}
                </td>
                <td style={{ padding: "0.9rem 1rem" }}>{run.agent}</td>
                <td style={{ padding: "0.9rem 1rem" }}>
                  <span className={statusClass(run.status)}>{run.status}</span>
                </td>
                <td className="mono" style={{ padding: "0.9rem 1rem", fontSize: "0.85rem" }}>
                  {run.decision}
                </td>
                <td className="mono" style={{ padding: "0.9rem 1rem", fontSize: "0.85rem" }}>
                  {run.latencyMs}ms
                </td>
                <td style={{ padding: "0.9rem 1rem", textAlign: "right" }}>
                  <Link
                    href={`/console/${run.id}`}
                    style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}
                  >
                    Open →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
