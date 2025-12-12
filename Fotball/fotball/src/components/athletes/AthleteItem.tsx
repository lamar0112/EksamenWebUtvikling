// START: AthleteItem – kort som viser én athlete i listen

import type IAthlete from "../../interfaces/IAthlete";
import { Link } from "react-router-dom";

const AthleteItem = ({
  athlete,
  onDelete,
}: {
  athlete: IAthlete;
  onDelete: (id: number) => void;
}) => {
  return (
    <article className="flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-950/70 p-4 shadow">
      {/* START: info om spilleren */}
      <div>
        <h3 className="text-base font-semibold text-white">{athlete.name}</h3>

        {athlete.image && (
          <img
            src={`http://localhost:5163/images/${athlete.image}`}
            alt={athlete.name}
            className="mt-2 h-40 w-full rounded-md bg-slate-900/40  object-contain p-2"
            loading="lazy"
          />
        )}

        <p className="mt-2 text-sm text-slate-300">Kjønn: {athlete.gender}</p>

        <p className="text-sm text-slate-300">
          Pris:{" "}
          <span className="font-semibold text-emerald-300">
            {athlete.price.toLocaleString()} kr
          </span>
        </p>

        <p className="mt-1 text-xs">
          {athlete.purchaseStatus ? (
            <span className="text-emerald-400">Kjøpt</span>
          ) : (
            <span className="text-yellow-300">Ikke kjøpt</span>
          )}
        </p>
      </div>
      {/* SLUTT: info om spilleren */}

      {/* START: knapper nederst */}
      <div className="mt-4 flex gap-2">
        {/* Rediger */}
        <Link
          to={`/athletes/edit/${athlete.id}`}
          className="flex-1 rounded-lg bg-slate-800 px-3 py-1.5 text-center text-xs font-semibold text-slate-100 hover:bg-slate-700"
        >
          Rediger
        </Link>

        {/* Slett */}
        <button
          type="button"
          onClick={() => onDelete(athlete.id)}
          className="flex-1 rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-rose-400"
        >
          Slett
        </button>
      </div>
      {/* SLUTT: knapper nederst */}
    </article>
  );
};

export default AthleteItem;

// SLUTT: AthleteItem
