// START: RegisterVenuePage – egen side for å registrere venue

import VenueFormAdd from "../components/venues/VenueFormAdd";

const RegisterVenuePage = () => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-4xl space-y-6">
        {/* START: overskrift */}
        <header>
          <h1 className="text-2xl font-bold">Registrer Venue</h1>
          <p className="text-sm text-slate-400">
            Opprett et nytt stadion i systemet.
          </p>
        </header>
        {/* SLUTT: overskrift */}

        {/* START: skjema for ny venue */}
        <VenueFormAdd />
        {/* SLUTT: skjema for ny venue */}
      </section>
    </main>
  );
};

export default RegisterVenuePage;

// SLUTT: RegisterVenuePage
