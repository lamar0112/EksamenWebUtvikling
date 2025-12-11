// START: AthleteEditPage – side for å redigere en athlete

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type IAthlete from "../interfaces/IAthlete";
import athleteService from "../services/athleteService";
import AthleteFormEdit from "../components/athletes/AthleteFormEdit";
import FeedbackMessage from "../components/common/FeedbackMessage";

const AthleteEditPage = () => {
  const { id } = useParams();
  const [athlete, setAthlete] = useState<IAthlete | null>(null);
  const [loading, setLoading] = useState(true);

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"" | "success" | "error">("");

  useEffect(() => {
    const load = async () => {
      if (!id) return;

      const response = await athleteService.getAthleteById(Number(id));
      if (response.success && response.data) {
        setAthlete(response.data);
      } else {
        setFeedbackMessage("Kunne ikke hente athlete.");
        setFeedbackType("error");
      }

      setLoading(false);
    };

    load();
  }, [id]);

  const handleChange = (field: string, value: string | number) => {
    if (!athlete) return;

    setAthlete({
      ...athlete,
      [field]: field === "price" ? Number(value) : value,
    });
  };

  const handleSave = async () => {
    if (!athlete) return;

    const response = await athleteService.putAthlete(athlete);
    if (response.success) {
      setFeedbackMessage("Athlete oppdatert.");
      setFeedbackType("success");
    } else {
      setFeedbackMessage("Feil ved lagring.");
      setFeedbackType("error");
    }
  };

  if (loading)
    return <p className="p-4 text-slate-300">Laster spiller...</p>;

  if (!athlete)
    return <p className="p-4 text-red-400">Athlete finnes ikke.</p>;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">

      <section className="mx-auto max-w-6xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold">Rediger Athlete</h1>
          <p className="text-sm text-slate-400">
            Oppdater informasjonen for denne spilleren.
          </p>
        </header>

        {feedbackType && (
          <FeedbackMessage type={feedbackType} message={feedbackMessage} />
        )}

        <AthleteFormEdit
          athlete={athlete}
          onChange={handleChange}
          onSave={handleSave}
        />
      </section>

    </main>
  );
};

export default AthleteEditPage;

// SLUTT: AthleteEditPage
