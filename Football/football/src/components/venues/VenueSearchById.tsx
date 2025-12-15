// START: VenueSearchById – search venue by id (GET /api/venue/{id})
import { useState } from "react";
import { Link } from "react-router-dom";
import venueService from "../../services/venueService";
import type IVenue from "../../interfaces/IVenue";
import FeedbackMessage from "../common/FeedbackMessage";

type FeedbackType = "" | "success" | "error";

const VenueSearchById = () => {
  const [idValue, setIdValue] = useState("");
  const [result, setResult] = useState<IVenue | null>(null);

  const [isWorking, setIsWorking] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const showFeedback = (type: Exclude<FeedbackType, "">, message: string) => {
    setFeedbackType(type);
    setFeedbackMessage(message);
  };

  const handleSearch = async () => {
    const id = Number(idValue);

    if (!idValue || Number.isNaN(id) || id <= 0) {
      setResult(null);
      showFeedback("error", "Please enter a valid venue id (number > 0).");
      return;
    }

    setIsWorking(true);
    setFeedbackType("");
    setFeedbackMessage("");

    const response = await venueService.getVenueById(id);

    if (response.success && response.data) {
      setResult(response.data);
      showFeedback("success", `Found venue #${id}.`);
    } else {
      setResult(null);
      showFeedback("error", `No venue found with id ${id}.`);
    }

    setIsWorking(false);
  };

  const handleClear = () => {
    setIdValue("");
    setResult(null);
    setFeedbackType("");
    setFeedbackMessage("");
  };

  return (
    <section
      className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 shadow-lg"
      aria-label="Search venue by id"
    >
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-white">Search venue by ID</h2>
        <p className="text-sm text-slate-400">
          Quick lookup using the venue id from the database.
        </p>
      </div>

      {feedbackType && (
        <FeedbackMessage type={feedbackType} message={feedbackMessage} />
      )}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label
            htmlFor="venue-id-search"
            className="mb-1 block text-xs font-medium text-slate-400"
          >
            Venue ID
          </label>
          <input
            id="venue-id-search"
            type="number"
            min={1}
            inputMode="numeric"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            placeholder="e.g. 1"
            value={idValue}
            onChange={(e) => setIdValue(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSearch}
            disabled={isWorking}
            className="rounded-lg bg-purple-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-purple-300 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300"
          >
            {isWorking ? "Searching..." : "Search"}
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-300"
          >
            Clear
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-5 rounded-lg border border-slate-800 bg-slate-950/60 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-slate-400">Result</p>
              <h3 className="text-base font-semibold text-white">{result.name}</h3>
              <p className="mt-1 text-sm text-slate-300">
                Capacity:{" "}
                <span className="font-semibold text-sky-300">
                  {result.capacity.toLocaleString()}
                </span>
              </p>
            </div>

            <Link
              to={`/venues/edit/${result.id}`}
              className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-300"
            >
              Edit
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default VenueSearchById;
// SLUTT: VenueSearchById
