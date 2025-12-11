// START: VenueFormEdit – skjema for å redigere en venue
import type IVenue from "../../interfaces/IVenue";

type Props = {
  venue: IVenue;
  onChange: (field: string, value: string | number) => void;
  onSave: () => void;
};

const VenueFormEdit = ({ venue, onChange, onSave }: Props) => {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
      {/* START: overskrift */}
      <h2 className="mb-4 text-lg font-semibold text-white">
        Rediger Venue
      </h2>
      {/* SLUTT: overskrift */}

      {/* START: input-felter */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Navn */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-400">
            Navn
          </label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            value={venue.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>

        {/* Kapasitet */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-400">
            Kapasitet
          </label>
          <input
            type="number"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            value={venue.capacity}
            onChange={(e) => onChange("capacity", Number(e.target.value))}
          />
        </div>

        {/* Bilde (filnavn) */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-400">
            Bilde (filnavn)
          </label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            value={venue.image}
            onChange={(e) => onChange("image", e.target.value)}
          />
        </div>
      </div>
      {/* SLUTT: input-felter */}

      {/* START: lagre-knapp */}
      <button
        type="button"
        onClick={onSave}
        className="mt-4 rounded-lg bg-purple-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-purple-300"
      >
        Lagre endringer
      </button>
      {/* SLUTT: lagre-knapp */}
    </section>
  );
};

export default VenueFormEdit;
// SLUTT: VenueFormEdit
