// START: VenuePage – overview for venues (list, search inside VenueList)
import { Link } from "react-router-dom";
import VenueList from "../components/venues/VenueList";

const VenuePage = () => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-6xl space-y-6">
        {/* START: header + action */}
        <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">
              Venue Management
            </p>
            <h1 className="text-2xl font-bold text-white">Venues</h1>
            <p className="mt-1 text-sm text-slate-400">
              View, search, edit and manage venues.
            </p>
          </div>

          <Link
            to="/venues/register"
            className="rounded-lg bg-purple-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-purple-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300"
          >
            Register new venue
          </Link>
        </header>
        {/* SLUTT: header + action */}

        {/* START: list */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 shadow-lg">
          <h2 className="mb-1 text-lg font-semibold text-white">
            Registered venues
          </h2>
          <p className="mb-4 text-sm text-slate-400">
            Keep venue names consistent and upload an image if available.
          </p>

          <VenueList />
        </section>
        {/* SLUTT: list */}
      </section>
    </main>
  );
};

export default VenuePage;
// SLUTT: VenuePage
