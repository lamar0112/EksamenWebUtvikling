// START: AthleteItem – card that shows one athlete (edit, delete, sell)

import type IAthlete from "../../interfaces/IAthlete";
import { Link } from "react-router-dom";
import athleteService from "../../services/athleteService";

const AthleteItem = ({
  athlete,
  onDelete,
  onChanged,
}: {
  athlete: IAthlete;
  onDelete: (id: number) => void;
  onChanged: () => void;
}) => {
  // START: sell athlete (remove from squad without deleting)
  const handleSell = async () => {
    const ok = confirm(`Sell ${athlete.name} and remove from squad?`);
    if (!ok) return;

    const updatedAthlete: IAthlete = {
      ...athlete,
      purchaseStatus: false,
    };

    const response = await athleteService.putAthlete(updatedAthlete);

    if (response.success) {
      onChanged();
    } else {
      alert("Could not sell athlete.");
    }
  };
  // SLUTT: sell athlete
  return (
    <article className="flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-950/70 p-4 shadow">
      {/* START: athlete info */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-white">{athlete.name}</h3>

          {/* Status badge */}
          {athlete.purchaseStatus ? (
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
              Owned
            </span>
          ) : (
            <span className="rounded-full border border-sky-500/40 bg-sky-500/10 px-2 py-0.5 text-[10px] font-semibold text-sky-300">
              Market
            </span>
          )}
        </div>

        {/* Image */}
        {athlete.image ? (
          <img
            src={`http://localhost:5163/images/${athlete.image}`}
            alt={`Photo of ${athlete.name}`}
            className="mt-3 h-40 w-full rounded-md bg-slate-900/40 object-contain p-2"
            loading="lazy"
          />
        ) : (
          <div className="mt-3 flex h-40 w-full items-center justify-center rounded-md border border-slate-800 bg-slate-900/40">
            <p className="text-xs text-slate-400">No image uploaded</p>
          </div>
        )}

        <p className="mt-3 text-sm text-slate-300">Gender: {athlete.gender}</p>

        <p className="text-sm text-slate-300">
          Price:{" "}
          <span className="font-semibold text-emerald-300">
            {athlete.price.toLocaleString()} NOK
          </span>
        </p>
      </div>
      {/* SLUTT: athlete info */}

      {/* START: actions */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex gap-2">
          <Link
            to={`/athletes/edit/${athlete.id}`}
            className="flex-1 rounded-lg bg-slate-800 px-3 py-2 text-center text-xs font-semibold text-slate-100 hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-300"
          >
            Edit
          </Link>

          <button
            type="button"
            onClick={() => onDelete(athlete.id)}
            className="flex-1 rounded-lg bg-rose-500 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-300"
          >
            Delete
          </button>
        </div>

        {athlete.purchaseStatus && (
          <button
            type="button"
            onClick={handleSell}
            className="rounded-lg border border-amber-400/50 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-200 hover:bg-amber-500/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300"
          >
            Sell (remove from squad)
          </button>
        )}
      </div>
      {/* SLUTT: actions */}
    </article>
  );
};

export default AthleteItem;

// SLUTT: AthleteItem
