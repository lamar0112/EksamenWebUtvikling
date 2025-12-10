// START: VenueEditPage – side for å redigere en venue
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type IVenue from "../interfaces/IVenue";
import venueService from "../services/venueService";
import VenueFormEdit from "../components/venues/VenueFormEdit";

const VenueEditPage = () => {
  // START: henter id fra url og setter opp state
  const { id } = useParams();
  const [venue, setVenue] = useState<IVenue | null>(null);
  const [loading, setLoading] = useState(true);
  // SLUTT: henter id fra url og setter opp state

  // START: laster data for valgt venue
  useEffect(() => {
    const load = async () => {
      if (!id) return;

      const response = await venueService.getVenueById(Number(id));
      if (response.success && response.data) {
        setVenue(response.data);
      }
      setLoading(false);
    };

    load();
  }, [id]);
  // SLUTT: laster data for valgt venue

  // START: oppdaterer felter når brukeren skriver
  const handleChange = (field: string, value: string | number) => {
    if (!venue) return;

    setVenue({
      ...venue,
      [field]: field === "capacity" ? Number(value) : value,
    });
  };
  // SLUTT: oppdaterer felter når brukeren skriver

  // START: lagrer endringene via API
  const handleSave = async () => {
    if (!venue) return;

    const response = await venueService.putVenue(venue);
    if (response.success) {
      alert("Venue oppdatert");
    } else {
      alert("Feil ved lagring");
    }
  };
  // SLUTT: lagrer endringene via API

  // START: enkel loading og feilhåndtering
  if (loading) {
    return <p className="p-4 text-slate-300">Laster venue...</p>;
  }

  if (!venue) {
    return <p className="p-4 text-red-400">Fant ikke venue</p>;
  }
  // SLUTT: enkel loading og feilhåndtering

  // START: visning av side med skjema
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-6xl space-y-6">
        {/* START: overskrift og tekst */}
        <header>
          <h1 className="text-2xl font-bold">Rediger Venue</h1>
          <p className="text-sm text-slate-400">
            Oppdater informasjonen for dette stadionet.
          </p>
        </header>
        {/* SLUTT: overskrift og tekst */}

        {/* START: skjema-komponent for redigering */}
        <VenueFormEdit venue={venue} onChange={handleChange} onSave={handleSave} />
        {/* SLUTT: skjema-komponent for redigering */}
      </section>
    </main>
  );
  // SLUTT: visning av side med skjema
};

export default VenueEditPage;
// SLUTT: VenueEditPage
