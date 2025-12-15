// START: AthleteEditPage – page for editing an athlete
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import type IAthlete from "../interfaces/IAthlete";
import athleteService from "../services/athleteService";
import AthleteFormEdit from "../components/athletes/AthleteFormEdit";
import FeedbackMessage from "../components/common/FeedbackMessage";

type FeedbackType = "" | "success" | "error";

// START: type-safe felt-navn i stedet for string
type AthleteField = keyof Pick<
  IAthlete,
  "name" | "gender" | "price" | "image" | "purchaseStatus"
>;
// SLUTT: type-safe felt-navn

const AthleteEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [athlete, setAthlete] = useState<IAthlete | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("");

  // START: load athlete by id
  useEffect(() => {
    const load = async () => {
      if (!id) {
        setFeedbackMessage("Missing athlete id.");
        setFeedbackType("error");
        setIsLoading(false);
        return;
      }

      const response = await athleteService.getAthleteById(Number(id));
      if (response.success && response.data) {
        setAthlete(response.data);
      } else {
        setFeedbackMessage("Could not load athlete.");
        setFeedbackType("error");
      }

      setIsLoading(false);
    };

    load();
  }, [id]);
  // SLUTT: load athlete by id

  // START: handle field changes (type-safe)
  const handleChange = (field: AthleteField, value: string | number | boolean) => {
    if (!athlete) return;

    // START: pris skal alltid være number
    if (field === "price") {
      const newPrice = Number(value);
      setAthlete({ ...athlete, price: isNaN(newPrice) ? 0 : newPrice });
      return;
    }
    // SLUTT: pris

    // START: purchaseStatus skal være boolean
    if (field === "purchaseStatus") {
      setAthlete({ ...athlete, purchaseStatus: Boolean(value) });
      return;
    }
    // SLUTT: purchaseStatus

    // START: resten er string-felt
    setAthlete({ ...athlete, [field]: String(value) } as IAthlete);
    // SLUTT: resten
  };
  // SLUTT: handle field changes

  // START: save athlete
  const handleSave = async () => {
    if (!athlete) return;

    if (athlete.name.trim() === "" || athlete.gender.trim() === "") {
      setFeedbackMessage("Name and gender are required.");
      setFeedbackType("error");
      return;
    }

    if (athlete.price <= 0) {
      setFeedbackMessage("Price must be greater than 0.");
      setFeedbackType("error");
      return;
    }

    const response = await athleteService.putAthlete(athlete);
    if (response.success) {
      setFeedbackMessage("Athlete updated.");
      setFeedbackType("success");
    } else {
      setFeedbackMessage("Could not save changes.");
      setFeedbackType("error");
    }
  };
  // SLUTT: save athlete

  // START: cancel edit
  const handleCancel = () => {
    navigate("/athletes");
  };
  // SLUTT: cancel edit

  // START: loading/empty states
  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
        <section className="mx-auto max-w-4xl">
          <p className="text-sm text-slate-400">Loading athlete...</p>
        </section>
      </main>
    );
  }

  if (!athlete) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
        <section className="mx-auto max-w-4xl space-y-4">
          <h1 className="text-2xl font-bold text-white">Athlete not found</h1>
          <p className="text-sm text-slate-400">
            The athlete could not be loaded. It may have been deleted.
          </p>

          <Link
            to="/athletes"
            className="inline-flex rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
          >
            Back to athletes
          </Link>
        </section>
      </main>
    );
  }
  // SLUTT: loading/empty states

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-4xl space-y-6">
        {/* START: header */}
        <header>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
            Player Management
          </p>
          <h1 className="text-2xl font-bold text-white">Edit athlete</h1>
          <p className="mt-1 text-sm text-slate-400">
            Update information for this player.
          </p>
        </header>
        {/* SLUTT: header */}

        {/* START: feedback */}
        {feedbackType && (
          <FeedbackMessage type={feedbackType} message={feedbackMessage} />
        )}
        {/* SLUTT: feedback */}

        {/* START: form card */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 shadow-lg">
          <AthleteFormEdit
            athlete={athlete}
            onChange={handleChange}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </section>
        {/* SLUTT: form card */}
      </section>
    </main>
  );
};

export default AthleteEditPage;
// SLUTT: AthleteEditPage
