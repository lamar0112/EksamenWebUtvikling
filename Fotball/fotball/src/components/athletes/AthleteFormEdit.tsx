// START: AthleteFormEdit – skjema for å redigere athlete

import type IAthlete from "../../interfaces/IAthlete";

type Props = {
  athlete: IAthlete;
  onChange: (field: string, value: string | number) => void;
  onSave: () => void;
};

const AthleteFormEdit = ({ athlete, onChange, onSave }: Props) => {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
      {/* START: overskrift */}
      <h2 className="mb-4 text-lg font-semibold text-white">
        Rediger Athlete
      </h2>
      {/* SLUTT: overskrift */}

      {/* START: input-felter */}
      <div className="grid gap-4 md:grid-cols-4">
        {/* Navn */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-400">
            Navn
          </label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            value={athlete.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>

        {/* Kjønn */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-400">
            Kjønn
          </label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            value={athlete.gender}
            onChange={(e) => onChange("gender", e.target.value)}
          />
        </div>

        {/* Pris */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-400">
            Pris
          </label>
          <input
            type="number"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            value={athlete.price}
            onChange={(e) => onChange("price", Number(e.target.value))}
          />
        </div>

        {/* Bilde (filnavn) */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-400">
            Bilde (filnavn)
          </label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            value={athlete.image}
            onChange={(e) => onChange("image", e.target.value)}
          />
        </div>
      </div>
      {/* SLUTT: input-felter */}

      {/* START: lagre-knapp */}
      <button
        type="button"
        onClick={onSave}
        className="mt-4 rounded-lg bg-sky-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-sky-300"
      >
        Lagre endringer
      </button>
      {/* SLUTT: lagre-knapp */}
    </section>
  );
};

export default AthleteFormEdit;

// SLUTT: AthleteFormEdit
