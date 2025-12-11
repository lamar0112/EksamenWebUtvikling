// START: VenuePage – liste, søk, rediger og slett venues

import { Link } from "react-router-dom";
import VenueList from "../components/venues/VenueList";

const VenuePage = () => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-6xl space-y-6">
        {/* START: overskrift og knapp til registreringsside */}
        <header className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Venue Admin</h1>
            <p className="text-sm text-slate-400">
              Vis, søk, rediger og slett stadioner.
            </p>
          </div>

          <Link
            to="/venues/register"
            className="rounded-lg bg-purple-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-purple-300"
          >
            Registrer ny Venue
          </Link>
        </header>
        {/* SLUTT: overskrift og knapp til registreringsside */}

        {/* START: liste over venues */}
        <section>
          <h2 className="mb-3 text-lg font-semibold">Registrerte venues</h2>
          <VenueList />
        </section>
        {/* SLUTT: liste over venues */}
      </section>
    </main>
  );
};

export default VenuePage;

// SLUTT: VenuePage
