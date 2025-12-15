// START: AthleteFormEdit – form to edit an athlete
import { useMemo } from "react";
import type IAthlete from "../../interfaces/IAthlete";

// START: type-safe felt-navn (må matche IAthlete)
type AthleteField = keyof Pick<
  IAthlete,
  "name" | "gender" | "price" | "image" | "purchaseStatus"
>;
// SLUTT: type-safe felt-navn

type Props = {
  athlete: IAthlete;
  onChange: (field: AthleteField, value: string | number | boolean) => void;
  onSave: () => void;
  onCancel: () => void;
};

const AthleteFormEdit = ({ athlete, onChange, onSave, onCancel }: Props) => {
  // START: derived image url (preview)
  const imageUrl = useMemo(() => {
    if (!athlete.image) return "";
    return `http://localhost:5163/images/${athlete.image}`;
  }, [athlete.image]);
  // SLUTT: derived image url

  return (
    <section className="space-y-5" aria-label="Edit athlete form">
      {/* START: heading */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Edit athlete</h2>
          <p className="mt-1 text-sm text-slate-400">
            Update player details. The image filename is usually set by upload.
          </p>
        </div>

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
      {/* SLUTT: heading */}

      {/* START: fields */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Name */}
        <div className="space-y-1">
          <label
            htmlFor="edit-athlete-name"
            className="block text-xs font-medium text-slate-400"
          >
            Name
          </label>
          <input
            id="edit-athlete-name"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            value={athlete.name}
            onChange={(e) => onChange("name", e.target.value)}
            required
          />
        </div>

        {/* Gender */}
        <div className="space-y-1">
          <label
            htmlFor="edit-athlete-gender"
            className="block text-xs font-medium text-slate-400"
          >
            Gender
          </label>
          <input
            id="edit-athlete-gender"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            value={athlete.gender}
            onChange={(e) => onChange("gender", e.target.value)}
            required
          />
        </div>

        {/* Price */}
        <div className="space-y-1">
          <label
            htmlFor="edit-athlete-price"
            className="block text-xs font-medium text-slate-400"
          >
            Price (NOK)
          </label>
          <input
            id="edit-athlete-price"
            type="number"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            value={athlete.price}
            onChange={(e) => onChange("price", Number(e.target.value))}
            min={0}
            required
          />
        </div>
      </div>
      {/* SLUTT: fields */}

      {/* START: image preview (read-only display) */}
      <section className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
        <p className="text-xs font-medium text-slate-400">Image</p>

        {athlete.image ? (
          <>
            <p className="mt-1 text-[11px] text-slate-400">
              Filename:{" "}
              <span className="font-semibold text-slate-200">{athlete.image}</span>
            </p>

            {imageUrl && (
              <img
                src={imageUrl}
                alt={`Preview of ${athlete.name}`}
                className="mt-2 h-44 w-full rounded-md object-contain bg-slate-900/40 p-2"
                loading="lazy"
              />
            )}
          </>
        ) : (
          <div className="mt-2 flex h-44 items-center justify-center rounded-md border border-slate-800 bg-slate-900/30">
            <p className="text-xs text-slate-500">No image uploaded</p>
          </div>
        )}

        <p className="mt-2 text-[11px] text-slate-500">
          Tip: Upload a new image from the registration page if needed.
        </p>
      </section>
      {/* SLUTT: image preview */}

      {/* START: actions */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onSave}
          className="rounded-lg bg-sky-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
        >
          Save changes
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-700 bg-slate-950 px-5 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-300"
        >
          Cancel
        </button>
      </div>
      {/* SLUTT: actions */}
    </section>
  );
};

export default AthleteFormEdit;
// SLUTT: AthleteFormEdit
