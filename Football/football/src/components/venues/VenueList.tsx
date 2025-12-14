// START: VenueList – fetch, search and show venues
import { useEffect, useState } from "react";
import type IVenue from "../../interfaces/IVenue";
import venueService from "../../services/venueService";
import VenueItem from "./VenueItem";
import FeedbackMessage from "../common/FeedbackMessage";

const VenueList = () => {
  // START: state for venues, search and feedback
  const [venues, setVenues] = useState<IVenue[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"" | "success" | "error">("");
  // SLUTT: state for venues, search and feedback

  // START: load venues from API
  const load = async () => {
    setIsLoading(true);

    const response = await venueService.getAllVenues();
    if (response.success && response.data) {
      setVenues(response.data);
      setFeedbackMessage("");
      setFeedbackType("");
    } else {
      setFeedbackMessage("Could not load venues.");
      setFeedbackType("error");
    }

    setIsLoading(false);
  };
  // SLUTT: load venues

  // START: auto-load on first render
  useEffect(() => {
    load();
  }, []);
  // SLUTT: auto-load

  // START: delete venue
  const handleDelete = async (id: number) => {
    const ok = confirm("Are you sure you want to delete this venue?");
    if (!ok) return;

    const response = await venueService.deleteVenue(id);
    if (response.success) {
      setVenues((prev) => prev.filter((v) => v.id !== id));
      setFeedbackMessage("Venue deleted.");
      setFeedbackType("success");
    } else {
      setFeedbackMessage("Could not delete venue.");
      setFeedbackType("error");
    }
  };
  // SLUTT: delete venue

  // START: filter by name
  const filteredVenues = venues.filter((v) =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // SLUTT: filter by name

  return (
    <section className="space-y-4" aria-label="Venue list">
      {/* START: search + refresh */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <div className="flex-1">
          <label
            htmlFor="venue-search"
            className="mb-1 block text-xs font-medium text-slate-400"
          >
            Search venue
          </label>
          <input
            id="venue-search"
            type="text"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            placeholder="Type a venue name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          onClick={load}
          type="button"
          className="rounded-lg bg-purple-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-purple-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300"
        >
          Refresh
        </button>
      </div>
      {/* SLUTT: search + refresh */}

      {/* START: feedback */}
      {feedbackType && (
        <FeedbackMessage type={feedbackType} message={feedbackMessage} />
      )}
      {/* SLUTT: feedback */}

      {/* START: content */}
      {isLoading ? (
        <p className="text-sm text-slate-400">Loading venues...</p>
      ) : venues.length === 0 ? (
        <p className="text-sm text-slate-400">
          No venues found. Register a new venue to get started.
        </p>
      ) : filteredVenues.length === 0 ? (
        <p className="text-sm text-slate-400">
          No venues matched your search.
        </p>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVenues.map((v) => (
            <VenueItem key={v.id} venue={v} onDelete={handleDelete} />
          ))}
        </section>
      )}
      {/* SLUTT: content */}
    </section>
  );
};

export default VenueList;
// SLUTT: VenueList
