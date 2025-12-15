// START: VenueFormAdd – register new venue (with feedback)
import { useMemo, useState, type ChangeEvent } from "react";
import type IVenue from "../../interfaces/IVenue";
import venueService from "../../services/venueService";
import imageUploadService from "../../services/imageUploadService";
import FeedbackMessage from "../common/FeedbackMessage";

type FeedbackType = "" | "success" | "error";

const VenueFormAdd = () => {
  const [venue, setVenue] = useState<IVenue>({
    id: 0,
    name: "",
    capacity: 0,
    image: "",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [feedbackType, setFeedbackType] = useState<FeedbackType>("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const imageUrl = useMemo(() => {
    if (!venue.image) return "";
    return `http://localhost:5163/images/${venue.image}`;
  }, [venue.image]);

  const resetForm = () => {
    setVenue({ id: 0, name: "", capacity: 0, image: "" });
  };

  const update = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setVenue((prev) => ({
      ...prev,
      [name]: name === "capacity" ? Number(value) : value,
    }));
  };

  // START: upload image
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setIsUploading(true);

    const response = await imageUploadService.uploadImage(file);

    setIsUploading(false);

    if (response.success) {
      setVenue((prev) => ({ ...prev, image: file.name }));
      setFeedbackType("success");
      setFeedbackMessage("Image uploaded.");
    } else {
      setFeedbackType("error");
      setFeedbackMessage("Could not upload image.");
    }
  };
  // SLUTT: upload image

  // START: save venue
  const save = async () => {
    if (venue.name.trim() === "") {
      setFeedbackType("error");
      setFeedbackMessage("Venue name is required.");
      return;
    }

    if (venue.capacity <= 0) {
      setFeedbackType("error");
      setFeedbackMessage("Capacity must be greater than 0.");
      return;
    }

    setIsSaving(true);

    const response = await venueService.postVenue(venue);

    if (response.success) {
      setFeedbackType("success");
      setFeedbackMessage("Venue added.");
      resetForm();
    } else {
      setFeedbackType("error");
      setFeedbackMessage("Could not save venue.");
    }

    setIsSaving(false);
  };
  // SLUTT: save venue

  return (
    <section className="space-y-5" aria-label="Register venue form">
      {/* START: heading */}
      <div>
        <h2 className="text-lg font-semibold text-white">New venue</h2>
        <p className="mt-1 text-sm text-slate-400">
          Add stadium name, capacity and an optional image.
        </p>
      </div>
      {/* SLUTT: heading */}

      {/* START: feedback */}
      {feedbackType && (
        <FeedbackMessage type={feedbackType} message={feedbackMessage} />
      )}
      {/* SLUTT: feedback */}

      {/* START: fields */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="venue-name" className="block text-xs font-medium text-slate-400">
            Venue name
          </label>
          <input
            id="venue-name"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            name="name"
            placeholder="e.g. National Arena"
            value={venue.name}
            onChange={update}
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="venue-capacity" className="block text-xs font-medium text-slate-400">
            Capacity
          </label>
          <input
            id="venue-capacity"
            type="number"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            name="capacity"
            placeholder="e.g. 45000"
            value={venue.capacity || ""}
            onChange={update}
            min={0}
            required
          />
        </div>
      </div>
      {/* SLUTT: fields */}

      {/* START: image upload + preview */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="venue-image" className="block text-xs font-medium text-slate-400">
            Upload image (optional)
          </label>
          <input
            id="venue-image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-xs text-slate-200 file:mr-3 file:rounded-md file:border-0 file:bg-slate-800 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-100 hover:file:bg-slate-700"
          />

          {isUploading && (
            <p className="text-[11px] text-purple-300">Uploading image...</p>
          )}

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
              alt={`Preview of ${venue.name || "uploaded venue"}`}
              className="mt-2 h-44 w-full rounded-md object-contain bg-slate-900/40 p-2"
              loading="lazy"
            />
          ) : (
            <div className="mt-2 flex h-44 items-center justify-center rounded-md border border-slate-800 bg-slate-900/30">
              <p className="text-xs text-slate-500">No image selected</p>
            </div>
          )}
        </div>
      </div>
      {/* SLUTT: image upload + preview */}

      {/* START: actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={save}
          type="button"
          disabled={isSaving || isUploading}
          className="rounded-lg bg-purple-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-purple-300 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300"
        >
          {isSaving ? "Saving..." : "Save venue"}
        </button>

        <button
          type="button"
          onClick={resetForm}
          className="rounded-lg border border-slate-700 bg-slate-950 px-5 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-300"
        >
          Clear
        </button>
      </div>
      {/* SLUTT: actions */}
    </section>
  );
};

export default VenueFormAdd;
// SLUTT: VenueFormAdd
