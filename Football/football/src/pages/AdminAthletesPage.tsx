// START: AdminAthletesPage – overview for players (market + squad)

import { Link } from "react-router-dom";
import AthleteList from "../components/athletes/AthleteList";

const AdminAthletesPage = () => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-6xl space-y-6">
        {/* START: header + actions */}
        <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
              Player Management
            </p>
            <h1 className="text-2xl font-bold text-white">Athletes</h1>
            <p className="mt-1 text-sm text-slate-400">
              View, search, edit and manage your squad. Sell players without
              deleting them.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/athletes/register"
              className="rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
            >
              Register new athlete
            </Link>
          </div>
        </header>
        {/* SLUTT: header + actions */}

        {/* START: content */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 shadow-lg">
          <h2 className="mb-1 text-lg font-semibold text-white">
            Squad & Market
          </h2>
          <p className="mb-4 text-sm text-slate-400">
            Players you own appear in <span className="text-emerald-300">Squad</span>.
            Players available for purchase appear in{" "}
            <span className="text-sky-300">Market</span>.
          </p>

          <AthleteList />
        </section>
        {/* SLUTT: content */}
      </section>
    </main>
  );
};

export default AdminAthletesPage;

// SLUTT: AdminAthletesPage
