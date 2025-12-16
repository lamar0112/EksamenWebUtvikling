// START: DashbordComponent – økonomi, lån, kjøp og salg (no alert/confirm)
import { useEffect, useMemo, useState } from "react";
import type IFinance from "../../interfaces/IFinance";
import type IAthlete from "../../interfaces/IAthlete";
import financeService from "../../services/financeService";
import athleteService from "../../services/athleteService";
import FeedbackMessage from "../common/FeedbackMessage";

type FeedbackType = "" | "success" | "error";

const DashbordComponent = () => {
  // START: state
  const [finance, setFinance] = useState<IFinance | null>(null);
  const [loanAmount, setLoanAmount] = useState<number>(0);

  const [athletes, setAthletes] = useState<IAthlete[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pendingBuyId, setPendingBuyId] = useState<number | null>(null);
  const [pendingSellId, setPendingSellId] = useState<number | null>(null);

  const [isWorking, setIsWorking] = useState(false);

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("");
  // SLUTT: state

  // START: feedback helper
  const showFeedback = (message: string, type: Exclude<FeedbackType, "">) => {
    setFeedbackMessage(message);
    setFeedbackType(type);
  };
  // SLUTT: feedback helper

  // START: load finance
  const loadFinance = async () => {
    const response = await financeService.getFinance();
    if (response.success && response.data) {
      setFinance(response.data);
    } else {
      showFeedback("Kunne ikke hente økonomi.", "error");
    }
  };
  // SLUTT: load finance

  // START: load athletes
  const loadAthletes = async () => {
    const response = await athleteService.getAthletes();
    if (response.success && response.data) {
      setAthletes(response.data);
    } else {
      showFeedback("Kunne ikke hente spillere.", "error");
    }
  };
  // SLUTT: load athletes

  // START: initial load
  useEffect(() => {
    const loadAll = async () => {
      setIsLoading(true);
      await Promise.all([loadFinance(), loadAthletes()]);
      setIsLoading(false);
    };
    loadAll();
  }, []);
  // SLUTT: initial load

  // START: derived lists
  const availableAthletes = useMemo(
    () => athletes.filter((a) => a.purchaseStatus === false),
    [athletes]
  );
  const purchasedAthletes = useMemo(
    () => athletes.filter((a) => a.purchaseStatus === true),
    [athletes]
  );
  // SLUTT: derived lists

  // START: loan
  const handleLoan = async () => {
    if (!finance) return;

    if (loanAmount <= 0) {
      showFeedback("Loan amount must be greater then 0.", "error");
      return;
    }

    setIsWorking(true);

    const response = await financeService.postLoan(loanAmount, finance);

    if (response.success && response.data) {
      setFinance(response.data);
      setLoanAmount(0);
      showFeedback("Loan registered.", "success");
    } else {
      showFeedback("Could not register loan.", "error");
    }

    setIsWorking(false);
  };
  // SLUTT: loan

  // START: pending actions
  const startBuy = (athleteId: number) => {
    setPendingBuyId(athleteId);
    setPendingSellId(null);
    setFeedbackType("");
    setFeedbackMessage("");
  };

  const startSell = (athleteId: number) => {
    setPendingSellId(athleteId);
    setPendingBuyId(null);
    setFeedbackType("");
    setFeedbackMessage("");
  };

  const cancelPending = () => {
    setPendingBuyId(null);
    setPendingSellId(null);
  };
  // SLUTT: pending actions

  // START: confirm buy
  const confirmBuy = async (athlete: IAthlete) => {
    if (!finance) return;

    if (finance.moneyLeft < athlete.price) {
      showFeedback(
        "Du har ikke nok penger til å kjøpe denne spilleren.",
        "error"
      );
      setPendingBuyId(null);
      return;
    }

    setIsWorking(true);

    const response = await athleteService.buyAthlete(athlete.id);

    if (response.success) {
      await Promise.all([loadFinance(), loadAthletes()]);
      showFeedback(`${athlete.name} is purchased.`, "success");
    } else {
      showFeedback("Kunne ikke kjøpe spiller.", "error");
    }

    setPendingBuyId(null);
    setIsWorking(false);
  };
  // SLUTT: confirm buy

  // START: confirm sell
  const confirmSell = async (athlete: IAthlete) => {
    if (!finance) return;

    setIsWorking(true);

    const response = await financeService.sellAthlete(athlete.id, finance);

    if (response.success && response.data) {
      setFinance(response.data);
      await loadAthletes();
      showFeedback(`${athlete.name} is sold.`, "success");
    } else {
      showFeedback("Kunne ikke selge spiller.", "error");
    }

    setPendingSellId(null);
    setIsWorking(false);
  };
  // SLUTT: confirm sell

  // START: loading
  if (isLoading || !finance) {
    return (
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <p className="text-sm text-slate-300">Loading dashboard data...</p>
      </section>
    );
  }
  // SLUTT: loading

  return (
    <section className="space-y-8">
      {/* START: feedback */}
      {feedbackType && (
        <FeedbackMessage type={feedbackType} message={feedbackMessage} />
      )}
      {/* SLUTT: feedback */}

      {/* START: økonomi */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-white">Clubs Finance</h2>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-slate-950/60 p-4">
            <p className="text-sm text-slate-400">Money Left</p>
            <p className="mt-1 text-lg font-semibold text-emerald-300">
              {finance.moneyLeft.toLocaleString()} Kr
            </p>
          </div>

          <div className="rounded-lg bg-slate-950/60 p-4">
            <p className="text-sm text-slate-400">Squad Size</p>
            <p className="mt-1 text-lg font-semibold text-sky-300">
              {finance.numberOfPurchases}
            </p>
          </div>

          <div className="rounded-lg bg-slate-950/60 p-4">
            <p className="text-sm text-slate-400">Money Spent</p>
            <p className="mt-1 text-lg font-semibold text-rose-300">
              {finance.moneySpent.toLocaleString()} Kr
            </p>
          </div>
        </div>
      </section>
      {/* SLUTT: økonomi */}

      {/* START: lån */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Apply For Loan
        </h2>

        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          <div className="flex-1">
            <label
              htmlFor="loanAmount"
              className="mb-1 block text-xs font-medium text-slate-400"
            >
              Loan Amount NOK
            </label>
            <input
              id="loanAmount"
              type="number"
              min={1}
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
              placeholder="Amount in NOK"
              value={loanAmount || ""}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
          </div>

          <button
            type="button"
            onClick={handleLoan}
            disabled={isWorking}
            className="rounded-lg bg-sky-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-sky-300 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
          >
            {isWorking ? "Lagrer..." : "Apply "}
          </button>
        </div>
      </section>
      {/* SLUTT: lån */}

      {/* START: kjøpte spillere */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-white">Your Squad</h2>

        {purchasedAthletes.length === 0 ? (
          <p className="text-sm text-slate-400">
            You haven't purchased any players yet
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {purchasedAthletes.map((a) => (
              <article
                key={a.id}
                className="flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-950/70 p-4"
              >
                <div>
                  {a.image ? (
                    <img
                      src={`http://localhost:5163/images/athletes/${a.image}`}
                      alt={`Bilde av ${a.name}`}
                      className="h-40 w-full rounded-md bg-slate-900/40 object-contain p-2"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-40 items-center justify-center rounded-md bg-slate-900 text-xs text-slate-400">
                      Ingen bilde
                    </div>
                  )}

                  <h3 className="mt-3 text-base font-semibold text-white">
                    {a.name}
                  </h3>
                  <p className="text-xs text-slate-400">Gender: {a.gender}</p>
                  <p className="text-sm text-slate-200">
                    Value:{" "}
                    <span className="font-semibold text-emerald-300">
                      {a.price.toLocaleString()} Kr
                    </span>
                  </p>
                </div>

                {pendingSellId !== a.id ? (
                  <button
                    type="button"
                    onClick={() => startSell(a.id)}
                    className="mt-4 rounded-lg bg-gradient-to-r from-rose-400 to-orange-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:from-rose-300 hover:to-orange-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-300"
                  >
                    Sell Athlete
                  </button>
                ) : (
                  <div className="mt-4 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => confirmSell(a)}
                      disabled={isWorking}
                      className="rounded-lg bg-gradient-to-r from-rose-400 to-orange-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:from-rose-300 hover:to-orange-200 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-300"
                    >
                      {isWorking ? "Selger..." : `Confirm Sale (${a.name})`}
                    </button>

                    <button
                      type="button"
                      onClick={cancelPending}
                      className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-300"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
      {/* SLUTT: kjøpte spillere */}

      {/* START: kjøp spillere */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Purchase Athletes
        </h2>

        {availableAthletes.length === 0 ? (
          <p className="text-sm text-slate-400">
            Ingen tilgjengelige spillere akkurat nå.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableAthletes.map((a) => (
              <article
                key={a.id}
                className="flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-950/70 p-4"
              >
                <div>
                  {a.image ? (
                    <img
                      src={`http://localhost:5163/images/athletes/${a.image}`}
                      alt={`Bilde av ${a.name}`}
                      className="h-40 w-full rounded-md bg-slate-900/40 object-contain p-2"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-40 items-center justify-center rounded-md bg-slate-900 text-xs text-slate-400">
                      Ingen bilde
                    </div>
                  )}

                  <h3 className="mt-3 text-base font-semibold text-white">
                    {a.name}
                  </h3>
                  <p className="text-xs text-slate-400">Gender: {a.gender}</p>
                  <p className="text-sm text-slate-200">
                    Price:{" "}
                    <span className="font-semibold text-emerald-300">
                      {a.price.toLocaleString()} Kr
                    </span>
                  </p>
                </div>

                {pendingBuyId !== a.id ? (
                  <button
                    type="button"
                    onClick={() => startBuy(a.id)}
                    className="mt-4 rounded-lg bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:from-emerald-300 hover:to-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
                  >
                    Purchase !
                  </button>
                ) : (
                  <div className="mt-4 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => confirmBuy(a)}
                      disabled={isWorking}
                      className="rounded-lg bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:from-emerald-300 hover:to-sky-300 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
                    >
                      {isWorking
                        ? "Kjøper..."
                        : `Confirm purchase (${a.price.toLocaleString()} Kr)`}
                    </button>

                    <button
                      type="button"
                      onClick={cancelPending}
                      className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-300"
                    >
                      Cancel purchase
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
      {/* SLUTT: kjøp spillere */}
    </section>
  );
};

export default DashbordComponent;
// SLUTT: DashbordComponent
