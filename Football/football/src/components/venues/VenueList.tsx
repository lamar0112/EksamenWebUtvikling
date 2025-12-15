// START: VenueList – fetch, search by name + search by id (no confirm/alert)
import { useEffect, useState } from "react";
import type IVenue from "../../interfaces/IVenue";
import venueService from "../../services/venueService";
import VenueItem from "./VenueItem";
import FeedbackMessage from "../common/FeedbackMessage";

type FeedbackType = "" | "success" | "error";

const VenueList = () => {
  // START: state
  const [venues, setVenues] = useState<IVenue[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [foundById, setFoundById] = useState<IVenue | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("");
  // SLUTT: state

  // START: helper feedback
  const showFeedback = (type: Exclude<FeedbackType, "">, message: string) => {
    setFeedbackType(type);
    setFeedbackMessage(message);
  };

  const clearFeedback = () => {
    setFeedbackType("");
    setFeedbackMessage("");
  };
  // SLUTT: helper feedback

  // START: load venues
  const load = async () => {
    setIsLoading(true);

    const response = await venueService.getAllVenues();
    if (response.success && response.data) {
      setVenues(response.data);
      clearFeedback();
    } else {
      showFeedback("error", "Could not load venues.");
    }

    setIsLoading(false);
  };
  // SLUTT: load venues

  // START: auto-load
  useEffect(() => {
    load();
  }, []);
  // SLUTT: auto-load

  // START: delete venue (called from VenueItem)
  const handleDelete = async (id: number): Promise<boolean> => {
    const response = await venueService.deleteVenue(id);
    if (response.success) {
      setVenues((prev) => prev.filter((v) => v.id !== id));
      return true;
    }
    return false;
  };
  // SLUTT: delete venue

  // START: search by ID (API call)
  const findById = async () => {
    clearFeedback();
    setFoundById(null);

    const idNumber = Number(searchId);

    if (!searchId.trim() || Number.isNaN(idNumber) || idNumber <= 0) {
      showFeedback("error", "Please enter a valid venue ID (number > 0).");
      return;
    }

    const response = await venueService.getVenueById(idNumber);

    if (response.success && response.data) {
      setFoundById(response.data);
      showFeedback("success", `Found venue with ID ${idNumber}.`);
    } else {
      showFeedback("error", `No venue found with ID ${idNumber}.`);
    }
  };

  const clearIdSearch = () => {
    setSearchId("");
    setFoundById(null);
    clearFeedback();
  };
  // SLUTT: search by ID

  // START: filter by name (client-side)
  const filteredVenues = venues.filter((v) =>
    v.name.toLowerCase().includes(searchName.toLowerCase())
  );
  // SLUTT: filter by name

  return (
    <section className="space-y-4" aria-label="Venue list">
      {/* START: searches */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Search by name */}
        <div className="md:col-span-2">
          <label
            htmlFor="venue-search-name"
            className="mb-1 block text-xs font-medium text-slate-400"
          >
            Search by name
          </label>
          <input
            id="venue-search-name"
            type="text"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            placeholder="Type a venue name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>

        {/* Refresh */}
        <button
          onClick={load}
          type="button"
          className="h-10 self-end rounded-lg bg-purple-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-purple-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300"
        >
          Refresh
        </button>

        {/* Search by ID */}
        <div className="md:col-span-2">
          <label
            htmlFor="venue-search-id"
            className="mb-1 block text-xs font-medium text-slate-400"
          >
            Search by ID
          </label>
          <input
            id="venue-search-id"
            type="number"
            min={1}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            placeholder="e.g. 2"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>

        <div className="flex gap-2 self-end">
          <button
            type="button"
            onClick={findById}
            className="h-10 flex-1 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-300"
          >
            Find
          </button>

          <button
            type="button"
            onClick={clearIdSearch}
            className="h-10 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-300"
          >
            Clear
          </button>
        </div>
      </div>
      {/* SLUTT: searches */}

      {/* START: feedback */}
      {feedbackType && <FeedbackMessage type={feedbackType} message={feedbackMessage} />}
      {/* SLUTT: feedback */}

      {/* START: found by ID result */}
      {foundById && (
        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 shadow-lg">
          <h3 className="mb-3 text-lg font-semibold text-white">
            Result (ID: {foundById.id})
          </h3>

          <div className="max-w-sm">
            <VenueItem
              venue={foundById}
              onDelete={handleDelete}
              onFeedback={(type, msg) => showFeedback(type, msg)}
            />
          </div>
        </section>
      )}
      {/* SLUTT: found by ID result */}

      {/* START: content */}
      {isLoading ? (
        <p className="text-sm text-slate-400">Loading venues...</p>
      ) : venues.length === 0 ? (
        <p className="text-sm text-slate-400">
          No venues found. Register a new venue to get started.
        </p>
      ) : filteredVenues.length === 0 ? (
        <p className="text-sm text-slate-400">No venues matched your search.</p>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVenues.map((v) => (
            <VenueItem
              key={v.id}
              venue={v}
              onDelete={handleDelete}
              onFeedback={(type, msg) => showFeedback(type, msg)}
            />
          ))}
        </section>
      )}
      {/* SLUTT: content */}
    </section>
  );
};

export default VenueList;
// SLUTT: VenueList
