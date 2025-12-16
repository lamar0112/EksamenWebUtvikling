// START: VenueFormEdit – edit existing venue (optional image upload)
import { useMemo, type ChangeEvent } from "react";
import type IVenue from "../../interfaces/IVenue";
import imageUploadService from "../../services/imageUploadService";

type Props = {
  venue: IVenue;
  onChange: (field: string, value: string | number) => void;
  onSave: () => void;
  onCancel: () => void;
};

const VenueFormEdit = ({ venue, onChange, onSave, onCancel }: Props) => {
  const imageUrl = useMemo(() => {
    if (!venue.image) return "";
    return `http://localhost:5163/images/venues/${venue.image}`;
  }, [venue.image]);

  // START: upload new image (optional)
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    // 1) Må sende folder ("venues") slik at backend treffer riktig endpoint
    const response = await imageUploadService.uploadImage(file, "venues");

    // 2) Lagre filnavnet som backend returnerer
    if (response.success && response.fileName) {
      onChange("image", response.fileName);
    }
  };
  // SLUTT: upload new image

  return (
    <section className="space-y-5" aria-label="Edit venue form">
      {/* START: heading */}
      <div>
        <h2 className="text-lg font-semibold text-white">Venue details</h2>
        <p className="mt-1 text-sm text-slate-400">
          Change name, capacity and optionally replace the image.
        </p>
      </div>
      {/* SLUTT: heading */}

      {/* START: fields */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label
            htmlFor="venue-edit-name"
            className="block text-xs font-medium text-slate-400"
          >
            Venue name
          </label>
          <input
            id="venue-edit-name"
            name="name"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            value={venue.name}
            onChange={(e) => onChange("name", e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="venue-edit-capacity"
            className="block text-xs font-medium text-slate-400"
          >
            Capacity
          </label>
          <input
            id="venue-edit-capacity"
            type="number"
            name="capacity"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            value={venue.capacity}
            onChange={(e) => onChange("capacity", Number(e.target.value))}
            min={0}
            required
          />
        </div>
      </div>
      {/* SLUTT: fields */}

      {/* START: image upload + preview */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="venue-edit-image"
            className="block text-xs font-medium text-slate-400"
          >
            Replace image (optional)
          </label>
          <input
            id="venue-edit-image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-xs text-slate-200 file:mr-3 file:rounded-md file:border-0 file:bg-slate-800 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-100 hover:file:bg-slate-700"
          />

          {venue.image && (
            <p className="text-[11px] text-slate-400">
              Saved filename:{" "}
              <span className="font-semibold text-slate-200">{venue.image}</span>
            </p>
          )}
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
          <p className="text-xs font-medium text-slate-400">Preview</p>

          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`Preview of ${venue.name || "venue"}`}
              className="mt-2 h-44 w-full rounded-md object-contain bg-slate-900/40 p-2"
              loading="lazy"
            />
          ) : (
            <div className="mt-2 flex h-44 items-center justify-center rounded-md border border-slate-800 bg-slate-900/30">
              <p className="text-xs text-slate-500">No image</p>
            </div>
          )}
        </div>
      </div>
      {/* SLUTT: image upload + preview */}

      {/* START: actions */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onSave}
          className="rounded-lg bg-purple-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-purple-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300"
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

export default VenueFormEdit;
// SLUTT: VenueFormEdit
