// START: VenueRegisterPage – wrapper around VenueFormAdd
import { Link } from "react-router-dom";
import VenueFormAdd from "../components/venues/VenueFormAdd";

const VenueRegisterPage = () => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-4xl space-y-6">
        {/* START: header */}
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">
            Venue Management
          </p>
          <h1 className="text-2xl font-bold text-white">Register venue</h1>
          <p className="text-sm text-slate-400">
            Add a new venue to the system.
          </p>

          <Link
            to="/venues"
            className="inline-flex rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-300"
          >
            Back to venues
          </Link>
        </header>
        {/* SLUTT: header */}

        {/* START: form */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 shadow-lg">
          <VenueFormAdd />
        </section>
        {/* SLUTT: form */}
      </section>
    </main>
  );
};

export default VenueRegisterPage;
// SLUTT: VenueRegisterPage
