import Link from "next/link";

export default function HomePage() {
  return (
    <main className="shell">
      <div className="banner rise">
        Spec prototype by{" "}
        <a href="https://alkhastvatsaev.dev" style={{ textDecoration: "underline" }}>
          Alkhast Vatsaev
        </a>
        . Inspired by Rippletide&apos;s Full-Stack Engineer posting —{" "}
        <strong>not affiliated</strong> with Rippletide.
      </div>

      <section className="panel rise rise-delay-1" style={{ padding: "2.5rem 2rem" }}>
        <p className="mono" style={{ color: "var(--muted)", fontSize: "0.8rem", margin: 0 }}>
          DECISION INFRA · CONSOLE HYPOTHESIS
        </p>
        <h1
          style={{
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            margin: "0.75rem 0 1rem",
            maxWidth: "16ch",
          }}
        >
          Make agent decisions auditable in one glance.
        </h1>
        <p style={{ color: "var(--muted)", maxWidth: "42ch", lineHeight: 1.55, marginBottom: "1.75rem" }}>
          A tiny product slice: list runs, open a decision, inspect latency and
          rationale. Built in hours to start a conversation — not to ship your roadmap.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link className="btn" href="/console">
            Enter console
          </Link>
          <a
            className="btn btn-ghost"
            href="https://github.com/alkhastvatsaev"
            target="_blank"
            rel="noreferrer"
          >
            Author on GitHub
          </a>
        </div>
      </section>
    </main>
  );
}
