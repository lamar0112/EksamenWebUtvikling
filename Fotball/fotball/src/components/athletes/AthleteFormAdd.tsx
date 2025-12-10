import { useState } from "react";
import type IAthlete from "../../interfaces/IAthlete";
import athleteService from "../../services/athleteService";
import imageUploadService from "../../services/imageUploadService";

const AthleteFormAdd = () => {
  // START: state for athlete og opplasting
  const [athlete, setAthlete] = useState<IAthlete>({
    id: 0,
    name: "",
    gender: "",
    price: 0,
    image: "",
    purchaseStatus: false,
  });

  const [isUploading, setIsUploading] = useState(false);
  // SLUTT: state for athlete og opplasting

  // START: oppdaterer tekst og tall-felt
  const update = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAthlete({ ...athlete, [e.target.name]: e.target.value });
  // SLUTT: oppdaterer tekst og tall-felt

  // START: håndtering av filopplasting til API
  // dette bruker FormData og er litt mer avansert enn forelesningene, derfor kommentert
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    setIsUploading(true);
    const response = await imageUploadService.uploadImage(file);
    setIsUploading(false);

    if (response.success) {
      // lagrer kun filnavnet i image-feltet
      setAthlete((prev) => ({ ...prev, image: file.name }));
      alert("Bilde lastet opp");
    } else {
      alert("Kunne ikke laste opp bilde");
    }
  };
  // SLUTT: håndtering av filopplasting til API

  // START: lagrer athlete via API
  const save = async () => {
    if (athlete.name.trim() === "" || athlete.gender.trim() === "") {
      alert("Navn og kjønn må fylles ut");
      return;
    }

    const response = await athleteService.postAthlete(athlete);
    if (response.success) {
      alert("Spiller lagt til");
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
  // SLUTT: lagrer athlete via API

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
      {/* START: overskrift for skjema */}
      <h2 className="mb-4 text-lg font-semibold text-white">
        Legg til ny Athlete
      </h2>
      {/* SLUTT: overskrift for skjema */}

      {/* START: inputfelt for navn, kjønn, pris og bilde-navn */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="space-y-1">
          <label
            htmlFor="athlete-name"
            className="block text-xs font-medium text-slate-400"
          >
            Navn
          </label>
          <input
            id="athlete-name"
            name="name"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            placeholder="Spillernavn"
            value={athlete.name}
            onChange={update}
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="athlete-gender"
            className="block text-xs font-medium text-slate-400"
          >
            Kjønn
          </label>
          <input
            id="athlete-gender"
            name="gender"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            placeholder="Male / Female"
            value={athlete.gender}
            onChange={update}
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="athlete-price"
            className="block text-xs font-medium text-slate-400"
          >
            Pris
          </label>
          <input
            id="athlete-price"
            type="number"
            name="price"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            placeholder="Pris i kr"
            value={athlete.price || ""}
            onChange={update}
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="athlete-image-name"
            className="block text-xs font-medium text-slate-400"
          >
            Bilde (filnavn)
          </label>
          <input
            id="athlete-image-name"
            name="image"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            placeholder="for eksempel spiller1.png"
            value={athlete.image}
            onChange={update}
          />
          <p className="mt-1 text-[10px] text-slate-500">
            Fylles automatisk når du laster opp et bilde.
          </p>
        </div>
      </div>
      {/* SLUTT: inputfelt for navn, kjønn, pris og bilde-navn */}

      {/* START: filopplasting for bilde */}
      <div className="mt-4 space-y-2">
        <label
          htmlFor="athlete-image-file"
          className="block text-xs font-medium text-slate-400"
        >
          Last opp bilde
        </label>
        <input
          id="athlete-image-file"
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
        className="mt-4 rounded-lg bg-sky-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-sky-300"
      >
        Lagre Athlete
      </button>
      {/* SLUTT: lagre-knapp */}
    </section>
  );
};

export default AthleteFormAdd;
