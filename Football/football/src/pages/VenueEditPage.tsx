// START: VenueEditPage – edit venue by id
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type IVenue from "../interfaces/IVenue";
import venueService from "../services/venueService";
import VenueFormEdit from "../components/venues/VenueFormEdit";
import FeedbackMessage from "../components/common/FeedbackMessage";

type FeedbackType = "" | "success" | "error";

const VenueEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState<IVenue | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("");

  // START: load venue by id
  useEffect(() => {
    const load = async () => {
      if (!id) {
        setFeedbackType("error");
        setFeedbackMessage("Missing venue id.");
        setIsLoading(false);
        return;
      }

      const response = await venueService.getVenueById(Number(id));
      if (response.success && response.data) {
        setVenue(response.data);
      } else {
        setFeedbackType("error");
        setFeedbackMessage("Could not load venue.");
      }

      setIsLoading(false);
    };

    load();
  }, [id]);
  // SLUTT: load venue by id

  // START: handle field changes
  const handleChange = (field: string, value: string | number) => {
    if (!venue) return;

    setVenue((prev) =>
      prev
        ? {
            ...prev,
            [field]: field === "capacity" ? Number(value) : value,
          }
        : prev
    );
  };
  // SLUTT: handle field changes

  // START: save changes
  const handleSave = async () => {
    if (!venue) return;

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

    const response = await venueService.putVenue(venue);
    if (response.success) {
      setFeedbackType("success");
      setFeedbackMessage("Venue updated.");
    } else {
      setFeedbackType("error");
      setFeedbackMessage("Could not save changes.");
    }
  };
  // SLUTT: save changes

  // START: cancel edit
  const handleCancel = () => {
    navigate("/venues");
  };
  // SLUTT: cancel edit

  // START: loading/empty
  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
        <section className="mx-auto max-w-4xl">
          <p className="text-sm text-slate-400">Loading venue...</p>
        </section>
      </main>
    );
  }

  if (!venue) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
        <section className="mx-auto max-w-4xl space-y-4">
          <h1 className="text-2xl font-bold text-white">Venue not found</h1>
          <p className="text-sm text-slate-400">
            The venue could not be loaded. It may have been deleted.
          </p>

          <Link
            to="/venues"
            className="inline-flex rounded-lg bg-purple-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-purple-300"
          >
            Back to venues
          </Link>
        </section>
      </main>
    );
  }
  // SLUTT: loading/empty

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-4xl space-y-6">
        {/* START: header */}
        <header>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">
            Stadium Management
          </p>
          <h1 className="text-2xl font-bold text-white">Edit venue</h1>
          <p className="mt-1 text-sm text-slate-400">
            Update the stadium information below.
          </p>
        </header>
        {/* SLUTT: header */}

        {/* START: feedback */}
        {feedbackType && (
          <FeedbackMessage type={feedbackType} message={feedbackMessage} />
        )}
        {/* SLUTT: feedback */}

        {/* START: form */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 shadow-lg">
          <VenueFormEdit
            venue={venue}
            onChange={handleChange}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </section>
        {/* SLUTT: form */}
      </section>
    </main>
  );
};

export default VenueEditPage;
// SLUTT: VenueEditPage
