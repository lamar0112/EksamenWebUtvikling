import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type IVenue from "../interfaces/IVenue";
import venueService from "../services/venueService";

const VenueEditPage = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState<IVenue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const response = await venueService.getVenueById(Number(id));
      if (response.success && response.data) {
        setVenue(response.data);
      }
      setLoading(false);
    };

    load();
  }, [id]);

  const update = (e: React.ChangeEvent<HTMLInputElement>) =>
    venue && setVenue({ ...venue, [e.target.name]: e.target.value });

  const save = async () => {
    if (!venue) return;

    const response = await venueService.putVenue(venue);
    if (response.success) {
      alert("Venue oppdatert!");
    } else {
      alert("Feil ved lagring");
    }
  };

  if (loading) return <p className="p-4 text-slate-300">Laster venue…</p>;
  if (!venue) return <p className="p-4 text-red-400">Fant ikke venue</p>;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-4xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold">Rediger Venue</h1>
          <p className="text-sm text-slate-400">
            Oppdater informasjonen for dette stadionet.
          </p>
        </header>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Navn</label>
              <input
                name="name"
                value={venue.name}
                onChange={update}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">
                Kapasitet
              </label>
              <input
                name="capacity"
                type="number"
                value={venue.capacity}
                onChange={update}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">
                Bilde (filnavn)
              </label>
              <input
                name="image"
                value={venue.image}
                onChange={update}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <button
            onClick={save}
            className="mt-4 rounded-lg bg-purple-400 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-purple-300"
          >
            Lagre endringer
          </button>
        </div>
      </section>
    </main>
  );
};

export default VenueEditPage;
