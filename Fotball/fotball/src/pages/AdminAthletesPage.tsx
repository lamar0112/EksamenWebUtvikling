import AthleteFormAdd from "../components/athletes/AthleteFormAdd";
import AthleteList from "../components/athletes/AthleteList";

const AdminAthletesPage = () => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-6xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-white">Athlete Admin</h1>
          <p className="text-sm text-slate-400">
            Registrer nye spillere og vis eksisterende spillere.
          </p>
        </header>

        <AthleteFormAdd />

        <section>
          <h2 className="mb-3 text-lg font-semibold">Registrerte spillere</h2>
          <AthleteList />
        </section>
      </section>
    </main>
  );
};

export default AdminAthletesPage;
