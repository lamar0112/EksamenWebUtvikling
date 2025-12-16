// START: AthleteFormAdd – form to register a new athlete (no alert/confirm)
import { useMemo, useState, type ChangeEvent } from "react";
import type IAthlete from "../../interfaces/IAthlete";
import athleteService from "../../services/athleteService";
import imageUploadService from "../../services/imageUploadService";
import FeedbackMessage from "../common/FeedbackMessage";

const AthleteFormAdd = () => {
  // START: state
  const [athlete, setAthlete] = useState<IAthlete>({
    id: 0,
    name: "",
    gender: "",
    price: 0,
    image: "",
    purchaseStatus: false,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"" | "success" | "error">(
    ""
  );
  // SLUTT: state

  // START: preview url
  const imageUrl = useMemo(() => {
    if (!athlete.image) return "";
    return `http://localhost:5163/images/athletes/${athlete.image}`;
  }, [athlete.image]);
  // SLUTT: preview url

  // START: update fields
  const update = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAthlete((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };
  // SLUTT: update fields

  // START: reset form
  const resetForm = () => {
    setAthlete({
      id: 0,
      name: "",
      gender: "",
      price: 0,
      image: "",
      purchaseStatus: false,
    });
  };
  // SLUTT: reset form

  // START: upload image
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setIsUploading(true);

    const response = await imageUploadService.uploadImage(file);

    setIsUploading(false);

    if (response.success) {
      setAthlete((prev) => ({ ...prev, image: response.fileName }));
      setFeedbackType("success");
      setFeedbackMessage("Image uploaded.");
    } else {
      setFeedbackType("error");
      setFeedbackMessage("Could not upload image.");
    }
  };
  // SLUTT: upload image

  // START: save athlete
  const save = async () => {
    if (athlete.name.trim() === "" || athlete.gender.trim() === "") {
      setFeedbackType("error");
      setFeedbackMessage("Name and gender are required.");
      return;
    }

    if (athlete.price <= 0) {
      setFeedbackType("error");
      setFeedbackMessage("Price must be greater than 0.");
      return;
    }

    const response = await athleteService.postAthlete(athlete);

    if (response.success) {
      setFeedbackType("success");
      setFeedbackMessage("Athlete added.");
      resetForm();
    } else {
      setFeedbackType("error");
      setFeedbackMessage("Could not save athlete.");
    }
  };
  // SLUTT: save athlete

  return (
    <section className="space-y-5" aria-label="Register athlete form">
      {/* START: heading */}
      <div>
        <h2 className="text-lg font-semibold text-white">New athlete</h2>
        <p className="mt-1 text-sm text-slate-400">
          Add athlete info and optionally upload an image.
        </p>
      </div>
      {/* SLUTT: heading */}

      {/* START: feedback */}
      {feedbackType && (
        <FeedbackMessage type={feedbackType} message={feedbackMessage} />
      )}
      {/* SLUTT: feedback */}

      {/* START: fields */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-1">
          <label
            htmlFor="athlete-name"
            className="block text-xs font-medium text-slate-400"
          >
            Name
          </label>
          <input
            id="athlete-name"
            name="name"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            value={athlete.name}
            onChange={update}
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="athlete-gender"
            className="block text-xs font-medium text-slate-400"
          >
            Gender
          </label>
          <input
            id="athlete-gender"
            name="gender"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            value={athlete.gender}
            onChange={update}
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="athlete-price"
            className="block text-xs font-medium text-slate-400"
          >
            Price (NOK)
          </label>
          <input
            id="athlete-price"
            name="price"
            type="number"
            min={1}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            value={athlete.price || ""}
            onChange={update}
            required
          />
        </div>
      </div>
      {/* SLUTT: fields */}

      {/* START: image upload + preview */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="athlete-image"
            className="block text-xs font-medium text-slate-400"
          >
            Upload image (optional)
          </label>
          <input
            id="athlete-image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-xs text-slate-200 file:mr-3 file:rounded-md file:border-0 file:bg-slate-800 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-100 hover:file:bg-slate-700"
          />

          {isUploading && (
            <p className="text-[11px] text-sky-300">Uploading image...</p>
          )}

          {athlete.image && (
            <p className="text-[11px] text-slate-400">
              Saved filename:{" "}
              <span className="font-semibold text-slate-200">
                {athlete.image}
              </span>
            </p>
          )}
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
          <p className="text-xs font-medium text-slate-400">Preview</p>

          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`Preview of ${athlete.name || "uploaded athlete"}`}
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
          type="button"
          onClick={save}
          className="rounded-lg bg-sky-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
        >
          Save athlete
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

export default AthleteFormAdd;
// SLUTT: AthleteFormAdd
