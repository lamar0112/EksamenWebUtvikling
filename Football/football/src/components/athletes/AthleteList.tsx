// START: AthleteList – henter, søker og viser athletes (market + squad)
import { useEffect, useState } from "react";
import type IAthlete from "../../interfaces/IAthlete";
import athleteService from "../../services/athleteService";
import AthleteItem from "./AthleteItem";
import FeedbackMessage from "../common/FeedbackMessage";

const AthleteList = () => {
  // START: state for athletes, søk og feedback
  const [athletes, setAthletes] = useState<IAthlete[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"" | "success" | "error">("");
  // SLUTT: state for athletes, søk og feedback

  // START: henter alle athletes fra API
  const load = async () => {
    setIsLoading(true);

    const response = await athleteService.getAthletes();
    if (response.success && response.data) {
      setAthletes(response.data);
      setFeedbackMessage("");
      setFeedbackType("");
    } else {
      setFeedbackMessage("Could not load athletes.");
      setFeedbackType("error");
    }

    setIsLoading(false);
  };
  // SLUTT: henter alle athletes

  // START: laster athletes ved første rendering
  useEffect(() => {
    load();
  }, []);
  // SLUTT: laster athletes ved første rendering

  // START: sletter athlete og oppdaterer listen lokalt
  const handleDelete = async (id: number) => {
    const ok = confirm("Are you sure you want to delete this athlete?");
    if (!ok) return;

    const response = await athleteService.deleteAthlete(id);
    if (response.success) {
      setAthletes((prev) => prev.filter((a) => a.id !== id));
      setFeedbackMessage("Athlete deleted.");
      setFeedbackType("success");
    } else {
      setFeedbackMessage("Could not delete athlete.");
      setFeedbackType("error");
    }
  };
  // SLUTT: sletter athlete

  // START: filtrerer på navn (brukes i begge seksjoner)
  const filteredAthletes = athletes.filter((a) =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // SLUTT: filtrerer på navn

  // START: deler inn i market og squad basert på PurchaseStatus
  const marketAthletes = filteredAthletes.filter((a) => a.purchaseStatus === false);
  const squadAthletes = filteredAthletes.filter((a) => a.purchaseStatus === true);
  // SLUTT: deler inn i market og squad

  return (
    <section className="space-y-6" aria-label="Athlete list">
      {/* START: søk + refresh */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <div className="flex-1">
          <label
            htmlFor="athlete-search"
            className="mb-1 block text-xs font-medium text-slate-400"
          >
            Search player
          </label>
          <input
            id="athlete-search"
            type="text"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            placeholder="Type a name to filter"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          onClick={load}
          type="button"
          className="rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
        >
          Refresh
        </button>
      </div>
      {/* SLUTT: søk + refresh */}

      {/* START: tilbakemelding */}
      {feedbackType && (
        <FeedbackMessage type={feedbackType} message={feedbackMessage} />
      )}
      {/* SLUTT: tilbakemelding */}

      {/* START: loading / empty */}
      {isLoading ? (
        <p className="text-sm text-slate-400">Loading athletes...</p>
      ) : athletes.length === 0 ? (
        <p className="text-sm text-slate-400">
          No athletes found. Register a new athlete to get started.
        </p>
      ) : (
        <section className="space-y-8">
          {/* START: Market */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Market <span className="text-xs font-normal text-slate-400">(available)</span>
              </h3>
              <p className="text-xs text-slate-400">{marketAthletes.length} players</p>
            </div>

            {marketAthletes.length === 0 ? (
              <p className="text-sm text-slate-400">No players available in the market.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {marketAthletes.map((a) => (
                  <AthleteItem key={a.id} athlete={a} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </section>
          {/* SLUTT: Market */}

          {/* START: Squad */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Squad <span className="text-xs font-normal text-slate-400">(owned)</span>
              </h3>
              <p className="text-xs text-slate-400">{squadAthletes.length} players</p>
            </div>

            {squadAthletes.length === 0 ? (
              <p className="text-sm text-slate-400">
                You have not purchased any players yet. Buy players from the Dashboard.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {squadAthletes.map((a) => (
                  <AthleteItem key={a.id} athlete={a} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </section>
          {/* SLUTT: Squad */}
        </section>
      )}
      {/* SLUTT: loading / empty */}
    </section>
  );
};

export default AthleteList;
// SLUTT: AthleteList
