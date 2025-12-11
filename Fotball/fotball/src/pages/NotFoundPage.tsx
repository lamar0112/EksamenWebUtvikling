// START: NotFoundPage – 404 fallbackside

import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-14 text-center text-slate-100">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
        404
      </p>

      <h1 className="mt-2 text-3xl font-bold text-white">Siden finnes ikke</h1>

      <p className="mt-3 text-sm text-slate-300">
        Sjekk adressen eller gå tilbake til hovedsidene.
      </p>

      <div className="mt-6 flex justify-center gap-3">
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
          Dashboard
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;

// SLUTT: NotFoundPage
