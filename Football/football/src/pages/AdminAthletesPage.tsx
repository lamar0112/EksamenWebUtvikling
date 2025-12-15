// START: AdminAthletesPage – page for athletes (list + search inside AthleteList)
import { Link } from "react-router-dom";
import AthleteList from "../components/athletes/AthleteList";

const AdminAthletesPage = () => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-6xl space-y-6">
        {/* START: header + action */}
        <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
              Player Management
            </p>
            <h1 className="text-2xl font-bold text-white">Athletes</h1>
            <p className="mt-1 text-sm text-slate-400">
              View, search, edit and manage your squad. Sell players without deleting them.
            </p>
          </div>

          <Link
            to="/athletes/register"
            className="rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
          >
            Register new athlete
          </Link>
        </header>
        {/* SLUTT: header + action */}

        {/* START: list */}
        <section className="space-y-6">
          <AthleteList />
        </section>
        {/* SLUTT: list */}
      </section>
    </main>
  );
};

export default AdminAthletesPage;
// SLUTT: AdminAthletesPage
