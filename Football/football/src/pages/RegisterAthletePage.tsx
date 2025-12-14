// START: RegisterAthletePage – page for registering a new athlete

import AthleteFormAdd from "../components/athletes/AthleteFormAdd";

const RegisterAthletePage = () => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-4xl space-y-6">
        {/* START: heading */}
        <header>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
            Player Registration
          </p>
          <h1 className="text-2xl font-bold text-white">Register athlete</h1>
          <p className="mt-1 text-sm text-slate-400">
            Fill in the details below to add a new player.
          </p>
        </header>
        {/* SLUTT: heading */}

        {/* START: form */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 shadow-lg">
          <AthleteFormAdd />
        </section>
        {/* SLUTT: form */}
      </section>
    </main>
  );
};

export default RegisterAthletePage;

// SLUTT: RegisterAthletePage
