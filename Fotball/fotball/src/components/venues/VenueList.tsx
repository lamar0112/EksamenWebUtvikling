import { useState } from "react";
import type IVenue from "../../interfaces/IVenue";
import venueService from "../../services/venueService";
import VenueItem from "./VenueItem";

const VenueList = () => {
  const [venues, setVenues] = useState<IVenue[]>([]);

  const load = async () => {
    const response = await venueService.getAllVenues();
    if (response.success && response.data) {
      setVenues(response.data);
    } else {
      alert("Kunne ikke hente venues");
    }
  };

  const handleDelete = async (id: number) => {
    const ok = confirm("Er du sikker på at du vil slette denne venue?");
    if (!ok) return;

    const response = await venueService.deleteVenue(id);
    if (response.success) {
      setVenues((prev) => prev.filter((v) => v.id !== id));
    } else {
      alert("Kunne ikke slette venue");
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={load}
        className="rounded-lg bg-purple-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-purple-300"
      >
        Hent Venues
      </button>

      {venues.length === 0 ? (
        <p className="text-sm text-slate-400">
          Ingen venues lastet inn. Trykk “Hent Venues”.
        </p>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((v) => (
            <VenueItem key={v.id} venue={v} onDelete={handleDelete} />
          ))}
        </section>
      )}
    </div>
  );
};

export default VenueList;
