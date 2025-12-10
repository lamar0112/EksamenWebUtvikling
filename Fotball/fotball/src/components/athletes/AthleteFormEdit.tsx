// START: AthleteFormEdit – skjema for å redigere en athlete
import type IAthlete from "../../interfaces/IAthlete";

const AthleteFormEdit = ({
  athlete,
  onChange,
  onSave,
}: {
  athlete: IAthlete;
  onChange: (field: string, value: string | number) => void;
  onSave: () => void;
}) => {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
      {/* START: overskrift */}
      <h2 className="mb-4 text-lg font-semibold text-white">Rediger Athlete</h2>
      {/* SLUTT: overskrift */}

      {/* START: inputfelter for redigering */}
      <div className="grid gap-4 md:grid-cols-4">
        {/* Navn */}
        <div className="space-y-1">
          <label
            htmlFor="edit-athlete-name"
            className="block text-xs font-medium text-slate-400"
          >
            Navn
          </label>
          <input
            id="edit-athlete-name"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            value={athlete.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>

        {/* Kjønn */}
        <div className="space-y-1">
          <label
            htmlFor="edit-athlete-gender"
            className="block text-xs font-medium text-slate-400"
          >
            Kjønn
          </label>
          <input
            id="edit-athlete-gender"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            value={athlete.gender}
            onChange={(e) => onChange("gender", e.target.value)}
          />
        </div>

        {/* Pris */}
        <div className="space-y-1">
          <label
            htmlFor="edit-athlete-price"
            className="block text-xs font-medium text-slate-400"
          >
            Pris
          </label>
          <input
            id="edit-athlete-price"
            type="number"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            value={athlete.price}
            onChange={(e) => onChange("price", Number(e.target.value))}
          />
        </div>

        {/* Bilde (filnavn) */}
        <div className="space-y-1">
          <label
            htmlFor="edit-athlete-image"
            className="block text-xs font-medium text-slate-400"
          >
            Bilde (filnavn)
          </label>
          <input
            id="edit-athlete-image"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            value={athlete.image}
            onChange={(e) => onChange("image", e.target.value)}
          />
        </div>
      </div>
      {/* SLUTT: inputfelter */}

      {/* START: lagre-knapp */}
      <button
        onClick={onSave}
        className="mt-4 rounded-lg bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-300"
      >
        Lagre endringer
      </button>
      {/* SLUTT: lagre-knapp */}
    </section>
  );
};

export default AthleteFormEdit;
// SLUTT: AthleteFormEdit
