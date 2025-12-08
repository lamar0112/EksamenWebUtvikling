import { useEffect, useState, type ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import type IVenue from "../../interfaces/IVenue";
import venueService from "../../services/venueService";

const VenueFormEdit = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState<IVenue | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const response = await venueService.getVenueById(Number(id));
    if (response.success && response.data) setVenue(response.data);
  };

  const update = (e: ChangeEvent<HTMLInputElement>) => {
    if (!venue) return;
    const { name, value } = e.target;

    setVenue({
      ...venue,
      [name]: name === "capacity" ? Number(value) : value,
    });
  };

  const save = async () => {
    if (!venue) return;
    const response = await venueService.putVenue(venue);
    if (response.success) alert("Venue oppdatert");
  };

  if (!venue) return <p>Laster…</p>;

  return (
    <section className="border border-slate-800 bg-slate-900/70 p-4 rounded-md max-w-md mx-auto">
      <div className="mb-3">
        <label className="block mb-1 text-sm text-slate-200">Navn</label>
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          name="name"
          value={venue.name}
          onChange={update}
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 text-sm text-slate-200">Kapasitet</label>
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          name="capacity"
          type="number"
          value={venue.capacity}
          onChange={update}
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 text-sm text-slate-200">
          Filnavn på bilde
        </label>
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          name="image"
          value={venue.image}
          onChange={update}
        />
      </div>

      <button
        className="mt-1 inline-flex items-center rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-sky-400"
        onClick={save}
      >
        Lagre endringer
      </button>
    </section>
  );
};

export default VenueFormEdit;
