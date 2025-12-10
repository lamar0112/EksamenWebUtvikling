// START: AthleteList – henter og viser liste med athletes
import { useState } from "react";
import type IAthlete from "../../interfaces/IAthlete";
import athleteService from "../../services/athleteService";
import AthleteItem from "./AthleteItem";

const AthleteList = () => {
  // START: state for athletes
  const [athletes, setAthletes] = useState<IAthlete[]>([]);
  // SLUTT: state for athletes

  // START: henter alle athletes fra API
  const load = async () => {
    const response = await athleteService.getAllAthletes();
    if (response.success && response.data) {
      setAthletes(response.data);
    } else {
      alert("Kunne ikke hente athletes");
    }
  };
  // SLUTT: henter alle athletes fra API

  // START: sletter athlete og oppdaterer listen lokalt
  const handleDelete = async (id: number) => {
    const ok = confirm("Er du sikker på at du vil slette denne spilleren?");
    if (!ok) return;

    const response = await athleteService.deleteAthlete(id);
    if (response.success) {
      setAthletes((prev) => prev.filter((a) => a.id !== id));
    } else {
      alert("Kunne ikke slette athlete");
    }
  };
  // SLUTT: sletter athlete og oppdaterer listen lokalt

  return (
    <div className="space-y-3">
      {/* START: knapp for å hente spillere */}
      <button
        onClick={load}
        className="rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-sky-300"
      >
        Hent Athletes
      </button>
      {/* SLUTT: knapp for å hente spillere */}

      {/* START: visning av liste eller tom tekst */}
      {athletes.length === 0 ? (
        <p className="text-sm text-slate-400">
          Trykk på "Hent Athletes" for å laste inn registrerte spillere.
        </p>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {athletes.map((a) => (
            <AthleteItem key={a.id} athlete={a} onDelete={handleDelete} />
          ))}
        </section>
      )}
      {/* SLUTT: visning av liste eller tom tekst */}
    </div>
  );
};

export default AthleteList;
// SLUTT: AthleteList
