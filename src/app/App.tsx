import { AdminShell } from "../components/AdminShell";

export function App() {
  return (
    <AdminShell>
      <section className="admin-view" aria-labelledby="overview-title">
        <p className="admin-eyebrow">Operations workspace</p>
        <h1 id="overview-title">Overview</h1>
        <p>
          Atlazora Admin provides the presentation foundation for authenticated
          operational workflows.
        </p>
      </section>
    </AdminShell>
  );
}
