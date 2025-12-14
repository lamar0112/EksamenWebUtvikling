// START: HomePage – forside med stadionbakgrunn, spotlight og sentrert innhold
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-slate-950 text-slate-100">
      <div className="relative h-[calc(100vh-3.5rem)] overflow-hidden">
        {/* START: bakgrunn + spotlight + overlay */}
        <div className="homepage-background absolute inset-0 -z-10" />
        <div className="homepage-spotlight absolute inset-0 -z-10" />
        <div className="homepage-overlay absolute inset-0 -z-10" />
        {/* SLUTT: bakgrunn + spotlight + overlay */}

        <section className="relative z-10 flex h-full items-center justify-center px-4">
          {/* START: sentrert innhold */}
          <div className="ball-card w-full max-w-xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
              SportsWorld Football
            </p>

            <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Manage your <span className="text-sky-300">Squad</span>,{" "}
              <span className="text-purple-300">Stadiums</span> &{" "}
              <span className="text-emerald-300">Finances</span>
            </h1>

            <p className="mx-auto mb-7 max-w-md text-sm text-slate-200">
              A football management admin solution built for the DS3103 Web
              Development exam.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/dashboard"
                className="rounded-lg bg-sky-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-md hover:bg-sky-300"
              >
                Go to Dashboard
              </Link>

              <Link
                to="/athletes"
                className="rounded-lg border border-slate-300/50 bg-slate-900/70 px-6 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-800/90"
              >
                Manage Players
              </Link>

              <Link
                to="/venues"
                className="rounded-lg border border-purple-400/60 bg-purple-950/60 px-6 py-2.5 text-sm font-semibold text-slate-100 hover:bg-purple-900/80"
              >
                Manage Stadiums
              </Link>
            </div>
          </div>
          {/* SLUTT: sentrert innhold */}
        </section>
      </div>
    </main>
  );
};

export default HomePage;
// SLUTT: HomePage
