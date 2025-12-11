// START: VenueFormAdd – skjema for å registrere ny venue
import { useState, type ChangeEvent } from "react";
import type IVenue from "../../interfaces/IVenue";
import venueService from "../../services/venueService";
import imageUploadService from "../../services/imageUploadService";
import FeedbackMessage from "../common/FeedbackMessage";

const VenueFormAdd = () => {
  // START: state for ny venue
  const [venue, setVenue] = useState<IVenue>({
    id: 0,
    name: "",
    capacity: 0,
    image: "",
  });
  // SLUTT: state for ny venue

  const [isUploading, setIsUploading] = useState(false);

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"" | "success" | "error">(
    ""
  );

  // START: nullstiller skjema etter suksess
  const resetForm = () => {
    setVenue({
      id: 0,
      name: "",
      capacity: 0,
      image: "",
    });
  };
  // SLUTT: nullstiller skjema

  // START: oppdaterer felter når bruker skriver
  const update = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setVenue((prev) => ({
      ...prev,
      [name]: name === "capacity" ? Number(value) : value,
    }));
  };
  // SLUTT: oppdaterer felter

  // START: filopplasting til API (ImageUploadController)
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    setIsUploading(true);
    const response = await imageUploadService.uploadImage(file);
    setIsUploading(false);

    if (response.success) {
      setVenue((prev) => ({ ...prev, image: file.name }));
      setFeedbackMessage("Bilde lastet opp.");
      setFeedbackType("success");
    } else {
      setFeedbackMessage("Kunne ikke laste opp bilde.");
      setFeedbackType("error");
    }
  };
  // SLUTT: filopplasting

  // START: lagrer venue via API
  const save = async () => {
    if (venue.name.trim() === "" || venue.capacity <= 0) {
      setFeedbackMessage("Navn og kapasitet må fylles ut.");
      setFeedbackType("error");
      return;
    }

    const response = await venueService.postVenue(venue);

    if (response.success) {
      setFeedbackMessage("Venue lagt til.");
      setFeedbackType("success");
      resetForm();
    } else {
      setFeedbackMessage("Kunne ikke lagre venue.");
      setFeedbackType("error");
    }
  };
  // SLUTT: lagrer venue via API

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
      {/* START: overskrift */}
      <h2 className="mb-4 text-lg font-semibold text-white">
        Legg til ny Venue
      </h2>
      {/* SLUTT: overskrift */}

      {/* START: tilbakemelding (grønn / rød) */}
      {feedbackType && (
        <FeedbackMessage type={feedbackType} message={feedbackMessage} />
      )}
      {/* SLUTT: tilbakemelding */}

      {/* START: input-felter */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {/* Navn */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-400">
            Navn
          </label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            name="name"
            placeholder="Stadionnavn"
            value={venue.name}
            onChange={update}
          />
        </div>

        {/* Kapasitet */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-400">
            Kapasitet
          </label>
          <input
            type="number"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            name="capacity"
            placeholder="Antall plasser"
            value={venue.capacity || ""}
            onChange={update}
          />
        </div>

        {/* Bilde (filnavn) */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-400">
            Bilde (filnavn)
          </label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            name="image"
            placeholder="f.eks stadion1.png"
            value={venue.image}
            onChange={update}
          />
          <p className="mt-1 text-[10px] text-slate-500">
            Fylles automatisk når du laster opp et bilde.
          </p>
        </div>
      </div>
      {/* SLUTT: input-felter */}

      {/* START: filopplasting */}
      <div className="mt-4 space-y-2">
        <label className="block text-xs font-medium text-slate-400">
          Last opp bilde
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-xs text-slate-200 file:mr-3 file:rounded-md file:border-0 file:bg-slate-800 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-100 hover:file:bg-slate-700"
        />
        {isUploading && (
          <p className="text-[11px] text-sky-300">Laster opp bilde...</p>
        )}
      </div>
      {/* SLUTT: filopplasting */}

      {/* START: lagre-knapp */}
      <button
        onClick={save}
        type="button"
        className="mt-4 rounded-lg bg-purple-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-purple-300"
      >
        Lagre Venue
      </button>
      {/* SLUTT: lagre-knapp */}
    </section>
  );
};

export default VenueFormAdd;
// SLUTT: VenueFormAdd
