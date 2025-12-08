import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type IAthlete from "../interfaces/IAthlete";
import athleteService from "../services/athleteService";

const AthleteEditPage = () => {
  const { id } = useParams();
  const [athlete, setAthlete] = useState<IAthlete | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const response = await athleteService.getAthleteById(Number(id));
      if (response.success && response.data) {
        setAthlete(response.data);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const update = (e: React.ChangeEvent<HTMLInputElement>) =>
    athlete && setAthlete({ ...athlete, [e.target.name]: e.target.value });

  const save = async () => {
    if (!athlete) return;

    const response = await athleteService.putAthlete(athlete);
    if (response.success) {
      alert("Athlete oppdatert!");
    } else {
      alert("Feil ved lagring");
    }
  };

  if (loading) return <p className="text-slate-300 p-4">Laster spiller…</p>;
  if (!athlete) return <p className="text-red-400 p-4">Fant ikke athlete</p>;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-4xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold">Rediger Athlete</h1>
          <p className="text-sm text-slate-400">
            Oppdater informasjonen for denne utøveren.
          </p>
        </header>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Navn</label>
              <input
                name="name"
                value={athlete.name}
                onChange={update}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Kjønn</label>
              <input
                name="gender"
                value={athlete.gender}
                onChange={update}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Pris</label>
              <input
                name="price"
                type="number"
                value={athlete.price}
                onChange={update}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">
                Bilde (filnavn)
              </label>
              <input
                name="image"
                value={athlete.image}
                onChange={update}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <button
            onClick={save}
            className="mt-4 rounded-lg bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-300"
          >
            Lagre endringer
          </button>
        </div>
      </section>
    </main>
  );
};

export default AthleteEditPage;
