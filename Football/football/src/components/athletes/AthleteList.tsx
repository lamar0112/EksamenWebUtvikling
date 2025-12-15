// START: AthleteList – fetch, search by name + search by id (single place), show market + squad
import { useEffect, useMemo, useState } from "react";
import type IAthlete from "../../interfaces/IAthlete";
import athleteService from "../../services/athleteService";
import financeService from "../../services/financeService";
import AthleteItem from "./AthleteItem";
import FeedbackMessage from "../common/FeedbackMessage";

type FeedbackType = "" | "success" | "error";

const AthleteList = () => {
  // START: state
  const [athletes, setAthletes] = useState<IAthlete[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState(""); // input as text for easy validation
  const [foundById, setFoundById] = useState<IAthlete | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("");
  // SLUTT: state

  // START: feedback helpers
  const showFeedback = (type: Exclude<FeedbackType, "">, message: string) => {
    setFeedbackType(type);
    setFeedbackMessage(message);
  };

  const clearFeedback = () => {
    setFeedbackType("");
    setFeedbackMessage("");
  };
  // SLUTT: feedback helpers

  // START: load all
  const load = async () => {
    setIsLoading(true);

    const response = await athleteService.getAthletes();
    if (response.success && response.data) {
      setAthletes(response.data);
      clearFeedback();
    } else {
      showFeedback("error", "Could not load athletes.");
    }

    setIsLoading(false);
  };
  // SLUTT: load all

  // START: initial load
  useEffect(() => {
    load();
  }, []);
  // SLUTT: initial load

  // START: delete athlete (called from AthleteItem)
  const handleDelete = async (id: number): Promise<boolean> => {
    const response = await athleteService.deleteAthlete(id);
    if (response.success) {
      setAthletes((prev) => prev.filter((a) => a.id !== id));
      return true;
    }
    return false;
  };
  // SLUTT: delete athlete

  // START: sell athlete (via finance)
  const handleSell = async (athleteId: number): Promise<boolean> => {
    const response = await financeService.sellAthlete(athleteId);

    if (response.success && response.data) {
      await load(); // reload so purchaseStatus becomes correct
      return true;
    }
    return false;
  };
  // SLUTT: sell athlete

  // START: search by ID (API)
  const findById = async () => {
    clearFeedback();
    setFoundById(null);

    const idNumber = Number(searchId);

    if (!searchId.trim() || Number.isNaN(idNumber) || idNumber <= 0) {
      showFeedback("error", "Please enter a valid athlete ID (number > 0).");
      return;
    }

    const response = await athleteService.getAthleteById(idNumber);

    if (response.success && response.data) {
      setFoundById(response.data);
      showFeedback("success", `Found athlete with ID ${idNumber}.`);
    } else {
      showFeedback("error", `No athlete found with ID ${idNumber}.`);
    }
  };

  const clearIdSearch = () => {
    setSearchId("");
    setFoundById(null);
    clearFeedback();
  };
  // SLUTT: search by ID

  // START: filter by name (client-side)
  const filteredAthletes = useMemo(() => {
    return athletes.filter((a) =>
      a.name.toLowerCase().includes(searchName.toLowerCase())
    );
  }, [athletes, searchName]);
  // SLUTT: filter by name

  // START: split market + squad
  const marketAthletes = useMemo(
    () => filteredAthletes.filter((a) => a.purchaseStatus === false),
    [filteredAthletes]
  );

  const squadAthletes = useMemo(
    () => filteredAthletes.filter((a) => a.purchaseStatus === true),
    [filteredAthletes]
  );
  // SLUTT: split market + squad

  return (
    <section className="space-y-6" aria-label="Athlete list">
      {/* START: controls (ONE place for all search) */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 shadow-lg">
        <h2 className="mb-1 text-lg font-semibold text-white">Squad & Market</h2>
        <p className="mb-4 text-sm text-slate-400">
          Players you own appear in <span className="text-emerald-300">Squad</span>. Players available appear in{" "}
          <span className="text-sky-300">Market</span>.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Search by name */}
          <div className="md:col-span-2">
            <label
              htmlFor="athlete-search-name"
              className="mb-1 block text-xs font-medium text-slate-400"
            >
              Search by name
            </label>
            <input
              id="athlete-search-name"
              type="text"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
              placeholder="Type a name to filter"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>

          {/* Refresh */}
          <button
            onClick={load}
            type="button"
            className="h-10 self-end rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
          >
            Refresh
          </button>

          {/* Search by ID */}
          <div className="md:col-span-2">
            <label
              htmlFor="athlete-search-id"
              className="mb-1 block text-xs font-medium text-slate-400"
            >
              Search by ID
            </label>
            <input
              id="athlete-search-id"
              type="number"
              min={1}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
              placeholder="e.g. 3"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>

          <div className="flex gap-2 self-end">
            <button
              type="button"
              onClick={findById}
              className="h-10 flex-1 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-300"
            >
              Find
            </button>

            <button
              type="button"
              onClick={clearIdSearch}
              className="h-10 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-300"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Feedback */}
        {feedbackType && (
          <div className="mt-4">
            <FeedbackMessage type={feedbackType} message={feedbackMessage} />
          </div>
        )}

        {/* Found by ID result */}
        {foundById && (
          <div className="mt-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-200">
              Result (ID: {foundById.id})
            </h3>

            <div className="max-w-sm">
              <AthleteItem
                athlete={foundById}
                onDelete={handleDelete}
                onSell={handleSell}
                onFeedback={(type, msg) => showFeedback(type, msg)}
              />
            </div>
          </div>
        )}
      </section>
      {/* SLUTT: controls */}

      {/* START: loading / empty / lists */}
      {isLoading ? (
        <p className="text-sm text-slate-400">Loading athletes...</p>
      ) : athletes.length === 0 ? (
        <p className="text-sm text-slate-400">
          No athletes found. Register a new athlete to get started.
        </p>
      ) : (
        <section className="space-y-8">
          {/* Market */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Market{" "}
                <span className="text-xs font-normal text-slate-400">
                  (available)
                </span>
              </h3>
              <p className="text-xs text-slate-400">{marketAthletes.length} players</p>
            </div>

            {marketAthletes.length === 0 ? (
              <p className="text-sm text-slate-400">No players available in the market.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {marketAthletes.map((a) => (
                  <AthleteItem
                    key={a.id}
                    athlete={a}
                    onDelete={handleDelete}
                    onSell={handleSell}
                    onFeedback={(type, msg) => showFeedback(type, msg)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Squad */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Squad{" "}
                <span className="text-xs font-normal text-slate-400">
                  (owned)
                </span>
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
                  <AthleteItem
                    key={a.id}
                    athlete={a}
                    onDelete={handleDelete}
                    onSell={handleSell}
                    onFeedback={(type, msg) => showFeedback(type, msg)}
                  />
                ))}
              </div>
            )}
          </section>
        </section>
      )}
      {/* SLUTT: loading / empty / lists */}
    </section>
  );
};

export default AthleteList;
// SLUTT: AthleteList
