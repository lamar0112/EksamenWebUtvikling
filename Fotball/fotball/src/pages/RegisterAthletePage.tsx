// START: RegisterAthletePage – egen side for å registrere athlete

import AthleteFormAdd from "../components/athletes/AthleteFormAdd";

const RegisterAthletePage = () => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-4xl space-y-6">
        {/* START: overskrift */}
        <header>
          <h1 className="text-2xl font-bold">Registrer Athlete</h1>
          <p className="text-sm text-slate-400">
            Fyll ut informasjon om en ny spiller.
          </p>
        </header>
        {/* SLUTT: overskrift */}

        {/* START: skjema for ny athlete */}
        <AthleteFormAdd />
        {/* SLUTT: skjema for ny athlete */}
      </section>
    </main>
  );
};

export default RegisterAthletePage;

// SLUTT: RegisterAthletePage
