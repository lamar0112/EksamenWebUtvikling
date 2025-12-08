import { useEffect, useState, type ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import type IAthlete from "../../interfaces/IAthlete";
import athleteService from "../../services/athleteService";

const AthleteFormEdit = () => {
  const { id } = useParams();
  const [athlete, setAthlete] = useState<IAthlete | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const response = await athleteService.getAthleteById(Number(id));
    if (response.success && response.data) setAthlete(response.data);
  };

  const update = (e: ChangeEvent<HTMLInputElement>) => {
    if (!athlete) return;
    const { name, value } = e.target;
    setAthlete({
      ...athlete,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const save = async () => {
    if (!athlete) return;
    const response = await athleteService.putAthlete(athlete);
    if (response.success) alert("Athlete oppdatert");
  };

  if (!athlete) return <p>Laster…</p>;

  return (
    <section className="border border-slate-800 bg-slate-900/70 p-4 rounded-md max-w-md mx-auto">
      <div className="mb-3">
        <label className="block mb-1 text-sm text-slate-200">Navn</label>
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          name="name"
          value={athlete.name}
          onChange={update}
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 text-sm text-slate-200">Kjønn</label>
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          name="gender"
          value={athlete.gender}
          onChange={update}
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 text-sm text-slate-200">Pris</label>
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          name="price"
          type="number"
          value={athlete.price}
          onChange={update}
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 text-sm text-slate-200">
          Filnavn på bilde
        </label>
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          name="image"
          value={athlete.image}
          onChange={update}
        />
      </div>

      <button
        className="mt-1 inline-flex items-center rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-sky-400"
        onClick={save}
      >
        Lagre endringer
      </button>
    </section>
  );
};

export default AthleteFormEdit;
