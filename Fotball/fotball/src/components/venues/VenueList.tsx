// START: VenueList – henter, søker og viser liste med venues
import { useState } from "react";
import type IVenue from "../../interfaces/IVenue";
import venueService from "../../services/venueService";
import VenueItem from "./VenueItem";
import FeedbackMessage from "../common/FeedbackMessage";

const VenueList = () => {
  // START: state for venues, søk og feedback
  const [venues, setVenues] = useState<IVenue[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"" | "success" | "error">(
    ""
  );
  // SLUTT: state for venues, søk og feedback

  // START: henter alle venues fra API
  const load = async () => {
    const response = await venueService.getAllVenues();
    if (response.success && response.data) {
      setVenues(response.data);
      setFeedbackMessage("Venues lastet inn.");
      setFeedbackType("success");
    } else {
      setFeedbackMessage("Kunne ikke hente venues.");
      setFeedbackType("error");
    }
  };
  // SLUTT: henter alle venues

  // START: sletter venue og oppdaterer listen lokalt
  const handleDelete = async (id: number) => {
    const ok = confirm("Er du sikker på at du vil slette denne venue?");
    if (!ok) return;

    const response = await venueService.deleteVenue(id);
    if (response.success) {
      setVenues((prev) => prev.filter((v) => v.id !== id));
      setFeedbackMessage("Venue slettet.");
      setFeedbackType("success");
    } else {
      setFeedbackMessage("Kunne ikke slette venue.");
      setFeedbackType("error");
    }
  };
  // SLUTT: sletter venue

  // START: filtrerer på navn
  const filteredVenues = venues.filter((v) =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // SLUTT: filtrerer på navn

  return (
    <section className="space-y-4">
      {/* START: rad med "Hent" + søkefelt */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <button
          onClick={load}
          type="button"
          className="rounded-lg bg-purple-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-purple-300"
        >
          Hent Venues
        </button>

        <div className="flex-1">
          <label
            htmlFor="venue-search"
            className="mb-1 block text-xs font-medium text-slate-400"
          >
            Søk etter venue...
          </label>
          <input
            id="venue-search"
            type="text"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
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
      {venues.length === 0 ? (
        <p className="text-sm text-slate-400">
          Trykk på "Hent Venues" for å laste inn registrerte stadioner.
        </p>
      ) : filteredVenues.length === 0 ? (
        <p className="text-sm text-slate-400">
          Fant ingen venues som matcher søket.
        </p>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVenues.map((v) => (
            <VenueItem key={v.id} venue={v} onDelete={handleDelete} />
          ))}
        </section>
      )}
      {/* SLUTT: innhold */}
    </section>
  );
};

export default VenueList;
// SLUTT: VenueList
