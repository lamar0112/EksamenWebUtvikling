// START: AthleteItem – card that shows one athlete (edit, delete, sell)
import { useMemo, useState } from "react";
import type IAthlete from "../../interfaces/IAthlete";
import { Link } from "react-router-dom";

type FeedbackType = "success" | "error";

type Props = {
  athlete: IAthlete;
  onDelete: (id: number) => Promise<boolean>;
  onSell: (athleteId: number) => Promise<boolean>;
  onFeedback: (type: FeedbackType, message: string) => void;
};

const AthleteItem = ({ athlete, onDelete, onSell, onFeedback }: Props) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmSell, setConfirmSell] = useState(false);
  const [isWorking, setIsWorking] = useState(false);

  // START: derived image url
  const imageUrl = useMemo(() => {
    if (!athlete.image) return "";
    return `http://localhost:5163/images/${athlete.image}`;
  }, [athlete.image]);
  // SLUTT: derived image url

  // START: delete athlete (two-step)
  const handleDelete = async () => {
    setIsWorking(true);

    const ok = await onDelete(athlete.id);
    if (ok) onFeedback("success", "Athlete deleted.");
    else onFeedback("error", "Could not delete athlete.");

    setIsWorking(false);
    setConfirmDelete(false);
  };
  // SLUTT: delete

  // START: sell athlete (two-step)
  const handleSell = async () => {
    setIsWorking(true);

    const ok = await onSell(athlete.id);
    if (ok) onFeedback("success", `${athlete.name} is sold.`);
    else onFeedback("error", "Could not sell athlete.");

    setIsWorking(false);
    setConfirmSell(false);
  };
  // SLUTT: sell

  // START: cancel pending actions
  const cancelAll = () => {
    if (isWorking) return;
    setConfirmDelete(false);
    setConfirmSell(false);
  };
  // SLUTT: cancel

  return (
    <article className="flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-950/70 p-4 shadow">
      {/* START: athlete info */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-white">{athlete.name}</h3>

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

        {imageUrl ? (
          <img
            src={imageUrl}
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
        {/* Edit + Delete */}
        <div className="flex gap-2">
          <Link
            to={`/athletes/edit/${athlete.id}`}
            aria-disabled={isWorking}
            className={`flex-1 rounded-lg bg-slate-800 px-3 py-2 text-center text-xs font-semibold text-slate-100 hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-300 ${
              isWorking ? "pointer-events-none opacity-60" : ""
            }`}
          >
            Edit
          </Link>

          {!confirmDelete ? (
            <button
              type="button"
              disabled={isWorking}
              onClick={() => {
                setConfirmDelete(true);
                setConfirmSell(false);
              }}
              className="flex-1 rounded-lg bg-rose-500 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-rose-400 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-300"
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

        {/* Sell (only if owned) */}
        {athlete.purchaseStatus && (
          <>
            {!confirmSell ? (
              <button
                type="button"
                disabled={isWorking}
                onClick={() => {
                  setConfirmSell(true);
                  setConfirmDelete(false);
                }}
                className="rounded-lg border border-amber-400/50 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-200 hover:bg-amber-500/15 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300"
              >
                Sell (remove from squad)
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSell}
                disabled={isWorking}
                className="rounded-lg border border-amber-400/50 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-200 hover:bg-amber-500/15 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300"
              >
                {isWorking ? "Selling..." : `Confirm sell (${athlete.name})`}
              </button>
            )}
          </>
        )}

        {(confirmDelete || confirmSell) && (
          <button
            type="button"
            onClick={cancelAll}
            disabled={isWorking}
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-900 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-300"
          >
            Cancel
          </button>
        )}
      </div>
      {/* SLUTT: actions */}
    </article>
  );
};

export default AthleteItem;
// SLUTT: AthleteItem
