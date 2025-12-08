import { useState } from "react";
import type IAthlete from "../../interfaces/IAthlete";
import athleteService from "../../services/athleteService";
import imageUploadService from "../../services/imageUploadService";

const AthleteFormAdd = () => {
  const [athlete, setAthlete] = useState<IAthlete>({
    id: 0,
    name: "",
    gender: "",
    price: 0,
    image: "",
    purchaseStatus: false,
  });

  const [isUploading, setIsUploading] = useState(false);

  // Vanlig tekst/number-felt
  const update = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAthlete({ ...athlete, [e.target.name]: e.target.value });

  // Filopplasting til API (ImageUploadController)
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    setIsUploading(true);
    const response = await imageUploadService.uploadImage(file);
    setIsUploading(false);

    if (response.success) {
      // Når bildet er lastet opp, lagrer vi filnavnet i image-feltet
      setAthlete((prev) => ({ ...prev, image: file.name }));
      alert("Bilde lastet opp!");
    } else {
      alert("Kunne ikke laste opp bilde");
    }
  };

  const save = async () => {
    if (athlete.name.trim() === "" || athlete.gender.trim() === "") {
      alert("Navn og kjønn må fylles ut");
      return;
    }

    const response = await athleteService.postAthlete(athlete);
    if (response.success) {
      alert("Spiller lagt til!");
      setAthlete({
        id: 0,
        name: "",
        gender: "",
        price: 0,
        image: "",
        purchaseStatus: false,
      });
    } else {
      alert("Kunne ikke lagre athlete");
    }
  };

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
      <h2 className="mb-4 text-lg font-semibold text-white">
        Legg til ny Athlete
      </h2>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-400">
            Navn
          </label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            name="name"
            placeholder="Spillernavn"
            value={athlete.name}
            onChange={update}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-400">
            Kjønn
          </label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            name="gender"
            placeholder="Male / Female"
            value={athlete.gender}
            onChange={update}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-400">
            Pris
          </label>
          <input
            type="number"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            name="price"
            placeholder="Pris i kr"
            value={athlete.price || ""}
            onChange={update}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-400">
            Bilde (filnavn)
          </label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            name="image"
            placeholder="f.eks spiller1.png"
            value={athlete.image}
            onChange={update}
          />
          <p className="mt-1 text-[10px] text-slate-500">
            Fylles automatisk når du laster opp et bilde.
          </p>
        </div>
      </div>

      {/* Eget område for filopplasting */}
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
          <p className="text-[11px] text-sky-300">Laster opp bilde…</p>
        )}
      </div>

      <button
        onClick={save}
        className="mt-4 rounded-lg bg-sky-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-sky-300"
      >
        Lagre Athlete
      </button>
    </section>
  );
};

export default AthleteFormAdd;
