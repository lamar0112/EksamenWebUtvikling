// START: VenueEditPage – side for å redigere en venue

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type IVenue from "../interfaces/IVenue";
import venueService from "../services/venueService";
import VenueFormEdit from "../components/venues/VenueFormEdit";
import FeedbackMessage from "../components/common/FeedbackMessage";

const VenueEditPage = () => {
  // START: henter id fra url og setter opp state
  const { id } = useParams();
  const [venue, setVenue] = useState<IVenue | null>(null);
  const [loading, setLoading] = useState(true);

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"" | "success" | "error">(
    ""
  );
  // SLUTT: henter id fra url og setter opp state

  // START: laster valgt venue
  useEffect(() => {
    const load = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      const response = await venueService.getVenueById(Number(id));
      if (response.success && response.data) {
        setVenue(response.data);
      } else {
        setFeedbackMessage("Kunne ikke hente venue.");
        setFeedbackType("error");
      }

      setLoading(false);
    };

    load();
  }, [id]);
  // SLUTT: laster valgt venue

  // START: oppdaterer felter når bruker skriver
  const handleChange = (field: string, value: string | number) => {
    if (!venue) return;

    setVenue({
      ...venue,
      [field]: field === "capacity" ? Number(value) : value,
    });
  };
  // SLUTT: oppdaterer felter

  // START: lagrer endringer via API
  const handleSave = async () => {
    if (!venue) return;

    const response = await venueService.putVenue(venue);
    if (response.success) {
      setFeedbackMessage("Venue oppdatert.");
      setFeedbackType("success");
    } else {
      setFeedbackMessage("Feil ved lagring av venue.");
      setFeedbackType("error");
    }
  };
  // SLUTT: lagrer endringer via API

  // START: loading og nullsjekk
  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
        <p className="text-sm text-slate-300">Laster venue...</p>
      </main>
    );
  }

  if (!venue) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
        <p className="text-sm text-rose-400">Fant ikke venue.</p>
      </main>
    );
  }
  // SLUTT: loading og nullsjekk

  // START: vis side med skjema
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-6xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold">Rediger Venue</h1>
          <p className="text-sm text-slate-400">
            Oppdater informasjon om stadionet.
          </p>
        </header>

        {feedbackType && (
          <FeedbackMessage type={feedbackType} message={feedbackMessage} />
        )}

        <VenueFormEdit
          venue={venue}
          onChange={handleChange}
          onSave={handleSave}
        />
      </section>
    </main>
  );
  // SLUTT: vis side med skjema
};

export default VenueEditPage;

// SLUTT: VenueEditPage
