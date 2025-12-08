import AthleteFormAdd from "../components/athletes/AthleteFormAdd";

const RegisterAthletePage = () => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-4xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold">Registrer Athlete</h1>
          <p className="text-sm text-slate-400">
            Fyll ut informasjon under for å registrere en ny utøver.
          </p>
        </header>

        <AthleteFormAdd />
      </section>
    </main>
  );
};

export default RegisterAthletePage;
