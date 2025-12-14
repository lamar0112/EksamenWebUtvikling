// START: VenueItem – card showing a single venue in the list

import type IVenue from "../../interfaces/IVenue";
import { Link } from "react-router-dom";

const VenueItem = ({
  venue,
  onDelete,
}: {
  venue: IVenue;
  onDelete: (id: number) => void;
}) => {
  const imageUrl = venue.image
    ? `http://localhost:5163/images/${venue.image}`
    : "";

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
      <div className="mt-4 flex gap-2">
        <Link
          to={`/venues/edit/${venue.id}`}
          className="flex-1 rounded-lg bg-slate-800 px-3 py-1.5 text-center text-xs font-semibold text-slate-100 hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-300"
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={() => onDelete(venue.id)}
          className="flex-1 rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-300"
        >
          Delete
        </button>
      </div>
      {/* SLUTT: actions */}
    </article>
  );
};

export default VenueItem;

// SLUTT: VenueItem
