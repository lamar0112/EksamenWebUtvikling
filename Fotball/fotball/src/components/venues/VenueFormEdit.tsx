// START: VenueFormEdit – skjema for å redigere en venue
import type IVenue from "../../interfaces/IVenue";

const VenueFormEdit = ({
  venue,
  onChange,
  onSave,
}: {
  venue: IVenue;
  onChange: (field: string, value: string | number) => void;
  onSave: () => void;
}) => {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
      {/* START: overskrift */}
      <h2 className="mb-4 text-lg font-semibold text-white">Rediger Venue</h2>
      {/* SLUTT: overskrift */}

      {/* START: inputfelter for redigering */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Navn */}
        <div className="space-y-1">
          <label
            htmlFor="edit-venue-name"
            className="block text-xs font-medium text-slate-400"
          >
            Navn
          </label>
          <input
            id="edit-venue-name"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            value={venue.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>

        {/* Kapasitet */}
        <div className="space-y-1">
          <label
            htmlFor="edit-venue-capacity"
            className="block text-xs font-medium text-slate-400"
          >
            Kapasitet
          </label>
          <input
            id="edit-venue-capacity"
            type="number"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            value={venue.capacity}
            onChange={(e) => onChange("capacity", Number(e.target.value))}
          />
        </div>

        {/* Bilde (filnavn) */}
        <div className="space-y-1">
          <label
            htmlFor="edit-venue-image"
            className="block text-xs font-medium text-slate-400"
          >
            Bilde (filnavn)
          </label>
          <input
            id="edit-venue-image"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            value={venue.image}
            onChange={(e) => onChange("image", e.target.value)}
          />
        </div>
      </div>
      {/* SLUTT: inputfelter */}

      {/* START: lagre-knapp */}
      <button
        onClick={onSave}
        className="mt-4 rounded-lg bg-purple-400 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-purple-300"
      >
        Lagre endringer
      </button>
      {/* SLUTT: lagre-knapp */}
    </section>
  );
};

export default VenueFormEdit;
// SLUTT: VenueFormEdit
