// START: AthleteList – henter, søker og viser liste med athletes
import { useState } from "react";
import type IAthlete from "../../interfaces/IAthlete";
import athleteService from "../../services/athleteService";
import AthleteItem from "./AthleteItem";
import FeedbackMessage from "../common/FeedbackMessage";

const AthleteList = () => {
  // START: state for athletes, søk og feedback
  const [athletes, setAthletes] = useState<IAthlete[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"" | "success" | "error">(
    ""
  );
  // SLUTT: state for athletes, søk og feedback

  // START: henter alle athletes fra API
  const load = async () => {
    const response = await athleteService.getAllAthletes();
    if (response.success && response.data) {
      setAthletes(response.data);
      setFeedbackMessage("Spillere lastet inn.");
      setFeedbackType("success");
    } else {
      setFeedbackMessage("Kunne ikke hente athletes.");
      setFeedbackType("error");
    }
  };
  // SLUTT: henter alle athletes

  // START: sletter athlete og oppdaterer listen lokalt
  const handleDelete = async (id: number) => {
    const ok = confirm("Er du sikker på at du vil slette denne spilleren?");
    if (!ok) return;

    const response = await athleteService.deleteAthlete(id);
    if (response.success) {
      setAthletes((prev) => prev.filter((a) => a.id !== id));
      setFeedbackMessage("Spiller slettet.");
      setFeedbackType("success");
    } else {
      setFeedbackMessage("Kunne ikke slette athlete.");
      setFeedbackType("error");
    }
  };
  // SLUTT: sletter athlete

  // START: filtrerer på navn
  const filteredAthletes = athletes.filter((a) =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // SLUTT: filtrerer på navn

  return (
    <section className="space-y-4">
      {/* START: rad med "Hent" + søkefelt */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <button
          onClick={load}
          type="button"
          className="rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-sky-300"
        >
          Hent Athletes
        </button>

        <div className="flex-1">
          <label
            htmlFor="athlete-search"
            className="mb-1 block text-xs font-medium text-slate-400"
          >
            Søk etter spiller...
          </label>
          <input
            id="athlete-search"
            type="text"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            placeholder="Skriv inn navn for å filtrere listen"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {/* SLUTT: rad med "Hent" + søkefelt */}

      {/* START: tilbakemelding */}
      {feedbackType && (
        <FeedbackMessage type={feedbackType} message={feedbackMessage} />
      )}
      {/* SLUTT: tilbakemelding */}

      {/* START: innhold */}
      {athletes.length === 0 ? (
        <p className="text-sm text-slate-400">
          Trykk på "Hent Athletes" for å laste inn registrerte spillere.
        </p>
      ) : filteredAthletes.length === 0 ? (
        <p className="text-sm text-slate-400">
          Fant ingen spillere som matcher søket.
        </p>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAthletes.map((a) => (
            <AthleteItem key={a.id} athlete={a} onDelete={handleDelete} />
          ))}
        </section>
      )}
      {/* SLUTT: innhold */}
    </section>
  );
};

export default AthleteList;
// SLUTT: AthleteList
