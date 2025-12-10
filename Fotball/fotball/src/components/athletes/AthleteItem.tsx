// START: AthleteItem – kort for én enkelt athlete
import type IAthlete from "../../interfaces/IAthlete";
import { Link } from "react-router-dom";

// onDelete kommer fra AthleteList og brukes for å slette spilleren.
const AthleteItem = ({
  athlete,
  onDelete,
}: {
  athlete: IAthlete;
  onDelete: (id: number) => void;
}) => {
  return (
    <article className="flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-950/60 p-4 shadow">
      {/* START: tekst og bilde for spilleren */}
      <div>
        <h3 className="text-base font-semibold text-white">{athlete.name}</h3>

        {athlete.image && (
          <img
            src={`http://localhost:5163/images/${athlete.image}`}
            alt={athlete.name}
            className="mt-2 h-32 w-full rounded-md object-cover"
          />
        )}

        <p className="mt-2 text-sm text-slate-300">Kjønn: {athlete.gender}</p>
        <p className="text-sm text-slate-300">
          Pris:{" "}
          <span className="font-semibold text-emerald-400">
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
      {/* SLUTT: tekst og bilde for spilleren */}

      {/* START: knapper nederst på kortet */}
      <div className="mt-4 flex gap-2">
        <Link
          to={`/athletes/edit/${athlete.id}`}
          className="flex-1 rounded-lg bg-slate-800 px-3 py-1.5 text-center text-xs font-semibold text-slate-100 hover:bg-slate-700"
        >
          Rediger
        </Link>
        <button
          type="button"
          onClick={() => onDelete(athlete.id)}
          className="flex-1 rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-rose-400"
        >
          Slett
        </button>
      </div>
      {/* SLUTT: knapper nederst på kortet */}
    </article>
  );
};

export default AthleteItem;
// SLUTT: AthleteItem
