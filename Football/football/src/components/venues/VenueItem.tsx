// START: VenueItem – card showing a single venue (edit + delete, no alert/confirm)
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type IVenue from "../../interfaces/IVenue";

type FeedbackType = "success" | "error";

type Props = {
  venue: IVenue;
  onDelete: (id: number) => Promise<boolean>;
  onFeedback: (type: FeedbackType, message: string) => void;
};

const VenueItem = ({ venue, onDelete, onFeedback }: Props) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isWorking, setIsWorking] = useState(false);

  const imageUrl = useMemo(() => {
    if (!venue.image) return "";
    return `http://localhost:5163/images/venues/${venue.image}`;
  }, [venue.image]);

  // START: delete (two-step)
  const handleDelete = async () => {
    setIsWorking(true);

    const ok = await onDelete(venue.id);
    if (ok) onFeedback("success", "Venue deleted.");
    else onFeedback("error", "Could not delete venue.");

    setIsWorking(false);
    setConfirmDelete(false);
  };
  // SLUTT: delete

  return (
    <article className="flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-950/70 p-4 shadow">
      {/* START: venue info */}
      <div>
        <h3 className="text-base font-semibold text-white">{venue.name}</h3>

        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Image of ${venue.name}`}
            className="mt-2 h-32 w-full rounded-md object-cover"
            loading="lazy"
          />
        ) : (
          <div className="mt-2 flex h-32 items-center justify-center rounded-md border border-slate-800 bg-slate-900/40">
            <p className="text-xs text-slate-500">No image</p>
          </div>
        )}

        <p className="mt-2 text-sm text-slate-300">
          Capacity:{" "}
          <span className="font-semibold text-sky-300">
            {venue.capacity.toLocaleString()} spectators
          </span>
        </p>
      </div>
      {/* SLUTT: venue info */}

      {/* START: actions */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex gap-2">
          <Link
            to={`/venues/edit/${venue.id}`}
            className="flex-1 rounded-lg bg-slate-800 px-3 py-2 text-center text-xs font-semibold text-slate-100 hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-300"
          >
            Edit
          </Link>

          {!confirmDelete ? (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="flex-1 rounded-lg bg-rose-500 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-300"
            >
              Delete
            </button>
          ) : (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isWorking}
              className="flex-1 rounded-lg bg-rose-500 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-rose-400 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-300"
            >
              {isWorking ? "Deleting..." : "Confirm delete"}
            </button>
          )}
        </div>

        {confirmDelete && (
          <button
            type="button"
            onClick={() => setConfirmDelete(false)}
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-300"
          >
            Cancel
          </button>
        )}
      </div>
      {/* SLUTT: actions */}
    </article>
  );
};

export default VenueItem;
// SLUTT: VenueItem
