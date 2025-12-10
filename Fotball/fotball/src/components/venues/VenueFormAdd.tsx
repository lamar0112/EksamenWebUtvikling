import { useState } from "react";
import type IVenue from "../../interfaces/IVenue";
import venueService from "../../services/venueService";
import imageUploadService from "../../services/imageUploadService";

const VenueFormAdd = () => {
  // START: state for venue og opplasting
  const [venue, setVenue] = useState<IVenue>({
    id: 0,
    name: "",
    capacity: 0,
    image: "",
  });

  const [isUploading, setIsUploading] = useState(false);
  // SLUTT: state for venue og opplasting

  // START: oppdaterer tekst og tall-felt
  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // litt ekstra: sørger for at capacity blir number og ikke string
    // dette er enkel bruk av Number(), ikke noe avansert
    setVenue({
      ...venue,
      [name]: name === "capacity" ? Number(value) : value,
    });
  };
  // SLUTT: oppdaterer tekst og tall-felt

  // START: håndtering av filopplasting til API
  // samme prinsipp som i AthleteFormAdd, bruker FormData i service
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    setIsUploading(true);
    const response = await imageUploadService.uploadImage(file);
    setIsUploading(false);

    if (response.success) {
      setVenue((prev) => ({ ...prev, image: file.name }));
      alert("Bilde lastet opp");
    } else {
      alert("Kunne ikke laste opp bilde");
    }
  };
  // SLUTT: håndtering av filopplasting til API

  // START: lagrer venue via API
  const save = async () => {
    if (venue.name.trim() === "") {
      alert("Navn må fylles ut");
      return;
    }

    const response = await venueService.postVenue(venue);
    if (response.success) {
      alert("Venue lagret");
      setVenue({ id: 0, name: "", capacity: 0, image: "" });
    } else {
      alert("Kunne ikke lagre venue");
    }
  };
  // SLUTT: lagrer venue via API

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
      {/* START: overskrift for skjema */}
      <h2 className="mb-4 text-lg font-semibold text-white">Legg til Venue</h2>
      {/* SLUTT: overskrift for skjema */}

      {/* START: inputfelt for navn, kapasitet og bilde-navn */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-1">
          <label
            htmlFor="venue-name"
            className="block text-xs font-medium text-slate-400"
          >
            Navn
          </label>
          <input
            id="venue-name"
            name="name"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            placeholder="Stadionnavn"
            value={venue.name}
            onChange={update}
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="venue-capacity"
            className="block text-xs font-medium text-slate-400"
          >
            Kapasitet
          </label>
          <input
            id="venue-capacity"
            type="number"
            name="capacity"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            placeholder="Antall tilskuere"
            value={venue.capacity || ""}
            onChange={update}
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="venue-image-name"
            className="block text-xs font-medium text-slate-400"
          >
            Bilde (filnavn)
          </label>
          <input
            id="venue-image-name"
            name="image"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            placeholder="for eksempel stadium1.png"
            value={venue.image}
            onChange={update}
          />
          <p className="mt-1 text-[10px] text-slate-500">
            Fylles automatisk når du laster opp et bilde.
          </p>
        </div>
      </div>
      {/* SLUTT: inputfelt for navn, kapasitet og bilde-navn */}

      {/* START: filopplasting for bilde */}
      <div className="mt-4 space-y-2">
        <label
          htmlFor="venue-image-file"
          className="block text-xs font-medium text-slate-400"
        >
          Last opp bilde
        </label>
        <input
          id="venue-image-file"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-xs text-slate-200 file:mr-3 file:rounded-md file:border-0 file:bg-slate-800 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-100 hover:file:bg-slate-700"
        />
        {isUploading && (
          <p className="text-[11px] text-sky-300">Laster opp bilde...</p>
        )}
      </div>
      {/* SLUTT: filopplasting for bilde */}

      {/* START: lagre-knapp */}
      <button
        onClick={save}
        className="mt-4 rounded-lg bg-purple-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-purple-300"
      >
        Lagre Venue
      </button>
      {/* SLUTT: lagre-knapp */}
    </section>
  );
};

export default VenueFormAdd;
