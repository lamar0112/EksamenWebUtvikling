// START: AdminAthletesPage – side for å administrere spillere
import AthleteFormAdd from "../components/athletes/AthleteFormAdd";
import AthleteList from "../components/athletes/AthleteList";

const AdminAthletesPage = () => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-6xl space-y-6">
        {/* START: overskrift og intro-tekst */}
        <header>
          <h1 className="text-2xl font-bold text-white">Athlete Admin</h1>
          <p className="text-sm text-slate-400">
            Registrer nye spillere og vis eksisterende spillere.
          </p>
        </header>
        {/* SLUTT: overskrift og intro-tekst */}

        {/* START: skjema for å legge til ny athlete */}
        <AthleteFormAdd />
        {/* SLUTT: skjema for å legge til ny athlete */}

        {/* START: liste over registrerte spillere */}
        <section>
          <h2 className="mb-3 text-lg font-semibold">Registrerte spillere</h2>
          <AthleteList />
        </section>
        {/* SLUTT: liste over registrerte spillere */}
      </section>
    </main>
  );
};

export default AdminAthletesPage;
// SLUTT: AdminAthletesPage
