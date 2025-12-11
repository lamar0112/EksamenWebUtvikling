// START: AdminAthletesPage – liste, søk, rediger og slett athletes

import { Link } from "react-router-dom";
import AthleteList from "../components/athletes/AthleteList";

const AdminAthletesPage = () => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-6xl space-y-6">
        {/* START: overskrift og knapp til registreringsside */}
        <header className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Athlete Admin</h1>
            <p className="text-sm text-slate-400">
              Vis, søk, rediger og slett registrerte spillere.
            </p>
          </div>

          <Link
            to="/athletes/register"
            className="rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-sky-300"
          >
            Registrer ny Athlete
          </Link>
        </header>
        {/* SLUTT: overskrift og knapp til registreringsside */}

        {/* START: liste over registrerte athletes */}
        <section>
          <h2 className="mb-3 text-lg font-semibold">Registrerte spillere</h2>
          <AthleteList />
        </section>
        {/* SLUTT: liste over registrerte athletes */}
      </section>
    </main>
  );
};

export default AdminAthletesPage;

// SLUTT: AdminAthletesPage
