// START: HomePage – forside med intro og navigasjon

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-slate-950 text-slate-100">
      <div className="relative h-[calc(100vh-3.5rem)] overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 h-full w-full [background:radial-gradient(125%_125%_at_50%_0%,#020617_30%,#1d4ed8_70%,#8b5cf6_100%)]" />
        </div>

        <section className="relative z-10 flex h-full flex-col items-center justify-center px-4">
          <div className="mx-auto max-w-3xl text-center">

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
              SportsWorld Football
            </p>

            <h1 className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Administrer{" "}
              <span className="text-sky-300">spillere</span>,{" "}
              <span className="text-purple-300">stadioner</span> og{" "}
              <span className="text-emerald-300">økonomi</span>
            </h1>

            <p className="mx-auto mb-7 max-w-xl text-sm text-slate-200">
              Dette er en administrasjonsløsning laget for DS3103 Webutvikling.
              Her kan du registrere spillere, stadioner og styre økonomien.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/dashboard"
                className="rounded-lg bg-sky-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-md hover:bg-sky-300"
              >
                Gå til Dashboard
              </Link>

              <Link
                to="/athletes"
                className="rounded-lg border border-slate-300/50 bg-slate-900/70 px-6 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-800/90"
              >
                Administrer Athletes
              </Link>

              <Link
                to="/venues"
                className="rounded-lg border border-purple-400/60 bg-purple-950/60 px-6 py-2.5 text-sm font-semibold text-slate-100 hover:bg-purple-900/80"
              >
                Administrer Venues
              </Link>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;

// SLUTT: HomePage
