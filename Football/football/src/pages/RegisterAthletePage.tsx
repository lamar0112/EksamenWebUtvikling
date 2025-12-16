// START: RegisterAthletePage – page for registering a new athlete
import { Link } from "react-router-dom";
import AthleteFormAdd from "../components/athletes/AthleteFormAdd";

const RegisterAthletePage = () => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-4xl space-y-6">
        {/* START: header */}
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
            Athlete Management
          </p>
          <h1 className="text-2xl font-bold text-white">Register athlete</h1>
          <p className="text-sm text-slate-400">
            Add a new athlete to the market. Upload an image if available.
          </p>

          <Link
            to="/athletes"
            className="inline-flex rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-300"
          >
            Back to athletes
          </Link>
        </header>
        {/* SLUTT: header */}

        {/* START: content */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 shadow-lg">
          <AthleteFormAdd />
        </section>
        {/* SLUTT: content */}
      </section>
    </main>
  );
};

export default RegisterAthletePage;
// SLUTT: RegisterAthletePage
