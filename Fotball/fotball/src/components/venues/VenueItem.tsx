// START: VenueItem – kort som viser én venue i listen

import type IVenue from "../../interfaces/IVenue";
import { Link } from "react-router-dom";

const VenueItem = ({
  venue,
  onDelete,
}: {
  venue: IVenue;
  onDelete: (id: number) => void;
}) => {
  return (
    <article className="flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-950/70 p-4 shadow">
      {/* START: info om stadionet */}
      <div>
        <h3 className="text-base font-semibold text-white">{venue.name}</h3>

        {venue.image && (
          <img
            src={`http://localhost:5163/images/${venue.image}`}
            alt={venue.name}
            className="mt-2 h-32 w-full rounded-md object-cover"
          />
        )}

        <p className="mt-2 text-sm text-slate-300">
          Kapasitet:{" "}
          <span className="font-semibold text-sky-300">
            {venue.capacity.toLocaleString()} tilskuere
          </span>
        </p>
      </div>
      {/* SLUTT: info om stadionet */}

      {/* START: knapper nederst */}
      <div className="mt-4 flex gap-2">
        {/* Rediger */}
        <Link
          to={`/venues/edit/${venue.id}`}
          className="flex-1 rounded-lg bg-slate-800 px-3 py-1.5 text-center text-xs font-semibold text-slate-100 hover:bg-slate-700"
        >
          Rediger
        </Link>

        {/* Slett */}
        <button
          type="button"
          onClick={() => onDelete(venue.id)}
          className="flex-1 rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-rose-400"
        >
          Slett
        </button>
      </div>
      {/* SLUTT: knapper nederst */}
    </article>
  );
};

export default VenueItem;

// SLUTT: VenueItem
