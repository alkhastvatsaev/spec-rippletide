import Link from "next/link";
import { notFound } from "next/navigation";

import { getRun, runs, type RunStatus } from "@/data/runs";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return runs.map((run) => ({ id: run.id }));
}

function statusClass(status: RunStatus) {
  if (status === "ok") return "status status-ok";
  if (status === "review") return "status status-review";
  return "status status-blocked";
}

export default async function RunDetailPage({ params }: Props) {
  const { id } = await params;
  const run = getRun(id);
  if (!run) notFound();

  return (
    <main className="shell">
      <div className="banner rise">
        Spec prototype — not affiliated with Rippletide.{" "}
        <Link href="/console" style={{ textDecoration: "underline" }}>
          All runs
        </Link>
      </div>

      <header className="rise rise-delay-1" style={{ marginBottom: "1.25rem" }}>
        <p className="mono" style={{ color: "var(--muted)", fontSize: "0.75rem", margin: 0 }}>
          RUN / {run.id}
        </p>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: "0.4rem",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "1.75rem", letterSpacing: "-0.02em" }}>
            {run.decision}
          </h1>
          <span className={statusClass(run.status)}>{run.status}</span>
        </div>
        <p style={{ color: "var(--muted)", margin: "0.5rem 0 0" }}>
          Agent <span className="mono">{run.agent}</span> · {run.latencyMs}ms ·{" "}
          {new Date(run.createdAt).toLocaleString("en-GB")}
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        <section className="panel rise rise-delay-2" style={{ padding: "1.25rem" }}>
          <h2 style={{ fontSize: "0.95rem", margin: "0 0 0.75rem" }}>Rationale</h2>
          <p style={{ margin: 0, lineHeight: 1.55 }}>{run.rationale}</p>
        </section>

        <section className="panel rise rise-delay-2" style={{ padding: "1.25rem" }}>
          <h2 style={{ fontSize: "0.95rem", margin: "0 0 0.75rem" }}>Inputs</h2>
          <pre
            className="mono"
            style={{
              margin: 0,
              fontSize: "0.8rem",
              background: "#f0ebe3",
              padding: "0.85rem",
              overflow: "auto",
            }}
          >
            {JSON.stringify(run.inputs, null, 2)}
          </pre>
        </section>

        <section
          className="panel rise rise-delay-3"
          style={{ padding: "1.25rem", gridColumn: "1 / -1" }}
        >
          <h2 style={{ fontSize: "0.95rem", margin: "0 0 0.75rem" }}>Timeline</h2>
          <ol style={{ margin: 0, paddingLeft: "1.1rem", lineHeight: 1.7 }}>
            {run.timeline.map((step) => (
              <li key={step.t + step.event}>
                <span className="mono" style={{ color: "var(--muted)" }}>
                  {step.t}
                </span>{" "}
                — {step.event}
              </li>
            ))}
          </ol>
        </section>
      </div>

      <p className="rise rise-delay-3" style={{ marginTop: "1.75rem", color: "var(--muted)" }}>
        Built by{" "}
        <a href="https://alkhastvatsaev.dev" style={{ color: "var(--accent)" }}>
          Alkhast Vatsaev
        </a>{" "}
        ·{" "}
        <a href="mailto:alkhastvatsaev@icloud.com" style={{ color: "var(--accent)" }}>
          alkhastvatsaev@icloud.com
        </a>
      </p>
    </main>
  );
}
