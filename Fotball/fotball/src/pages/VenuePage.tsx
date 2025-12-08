import VenueFormAdd from "../components/venues/VenueFormAdd";
import VenueList from "../components/venues/VenueList";

const VenuePage = () => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-6xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-white">Venue Admin</h1>
          <p className="text-sm text-slate-400">
            Registrer nye stadioner og vis eksisterende venues.
          </p>
        </header>

        <VenueFormAdd />

        <section>
          <h2 className="mb-3 text-lg font-semibold">Registrerte venues</h2>
          <VenueList />
        </section>
      </section>
    </main>
  );
};

export default VenuePage;
