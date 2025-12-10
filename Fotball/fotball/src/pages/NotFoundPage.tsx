// START: NotFoundPage – vises når ruten ikke finnes
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-slate-950 px-4 py-10 text-slate-100">
      <section className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">
          Siden ble ikke funnet
        </h1>
        <p className="mt-3 max-w-md text-sm text-slate-300">
          Siden du prøvde å åpne finnes ikke. Sjekk adressen, eller gå tilbake
          til oversikten.
        </p>

        {/* START: knapper for å komme seg videre */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="rounded-lg bg-sky-400 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300"
          >
            Til forsiden
          </Link>
          <Link
            to="/dashboard"
            className="rounded-lg border border-slate-700 bg-slate-900 px-5 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-800"
          >
            Gå til Dashboard
          </Link>
        </div>
        {/* SLUTT: knapper for å komme seg videre */}
      </section>
    </main>
  );
};

export default NotFoundPage;
// SLUTT: NotFoundPage
