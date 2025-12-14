// START: RegisterVenuePage – page for registering a new venue

import VenueFormAdd from "../components/venues/VenueFormAdd";

const RegisterVenuePage = () => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-4xl space-y-6">
        {/* START: heading */}
        <header>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">
            Stadium Registration
          </p>
          <h1 className="text-2xl font-bold text-white">Register venue</h1>
          <p className="mt-1 text-sm text-slate-400">
            Add a new stadium and upload an image (optional).
          </p>
        </header>
        {/* SLUTT: heading */}

        {/* START: form */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 shadow-lg">
          <VenueFormAdd />
        </section>
        {/* SLUTT: form */}
      </section>
    </main>
  );
};

export default RegisterVenuePage;

// SLUTT: RegisterVenuePage
