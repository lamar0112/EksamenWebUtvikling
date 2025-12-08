import { useState } from "react";
import type IAthlete from "../../interfaces/IAthlete";
import athleteService from "../../services/athleteService";
import AthleteItem from "./AthleteItem";

const AthleteList = () => {
  const [athletes, setAthletes] = useState<IAthlete[]>([]);

  const load = async () => {
    const response = await athleteService.getAllAthletes();
    if (response.success && response.data) {
      setAthletes(response.data);
    } else {
      alert("Kunne ikke hente athletes");
    }
  };

  const handleDelete = async (id: number) => {
    const ok = confirm("Er du sikker på at du vil slette denne spilleren?");
    if (!ok) return;

    const response = await athleteService.deleteAthlete(id);
    if (response.success) {
      // Oppdaterer listen lokalt etter sletting
      setAthletes((prev) => prev.filter((a) => a.id !== id));
    } else {
      alert("Kunne ikke slette athlete");
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={load}
        className="rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-sky-300"
      >
        Hent Athletes
      </button>

      {athletes.length === 0 ? (
        <p className="text-sm text-slate-400">
          Trykk på “Hent Athletes” for å laste inn registrerte spillere.
        </p>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {athletes.map((a) => (
            <AthleteItem key={a.id} athlete={a} onDelete={handleDelete} />
          ))}
        </section>
      )}
    </div>
  );
};

export default AthleteList;
