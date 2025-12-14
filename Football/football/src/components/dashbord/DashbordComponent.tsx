// START: DashbordComponent – økonomi, lån, kjøp og salg av spillere

import { useEffect, useState } from "react";
import type IFinance from "../../interfaces/IFinance";
import type IAthlete from "../../interfaces/IAthlete";
import financeService from "../../services/financeService";
import athleteService from "../../services/athleteService";
import FeedbackMessage from "../common/FeedbackMessage";

type FeedbackType = "" | "success" | "error";

const DashbordComponent = () => {
  // START: state for økonomi og spillere
  const [finance, setFinance] = useState<IFinance | null>(null);
  const [loanAmount, setLoanAmount] = useState<number>(0);

  const [availableAthletes, setAvailableAthletes] = useState<IAthlete[]>([]);
  const [purchasedAthletes, setPurchasedAthletes] = useState<IAthlete[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("");
  // SLUTT: state for økonomi og spillere

  // START: hjelpefunksjon for tilbakemelding
  const showFeedback = (message: string, type: Exclude<FeedbackType, "">) => {
    setFeedbackMessage(message);
    setFeedbackType(type);
  };
  // SLUTT: hjelpefunksjon for tilbakemelding

  // START: henter økonomi fra API-et
  const loadFinance = async () => {
    const response = await financeService.getFinance();
    if (response.success && response.data) {
      setFinance(response.data);
    } else {
      showFeedback("Kunne ikke hente økonomi.", "error");
    }
  };
  // SLUTT: henter økonomi

  // START: henter spillere og deler dem i tilgjengelige og kjøpte
  const loadAthletes = async () => {
    const response = await athleteService.getAthletes();

    if (response.success && response.data) {
      const all = response.data;
      setAvailableAthletes(all.filter((a) => a.purchaseStatus === false));
      setPurchasedAthletes(all.filter((a) => a.purchaseStatus === true));
    } else {
      showFeedback("Kunne ikke hente spillere.", "error");
    }
  };
  // SLUTT: henter spillere

  // START: laster alt ved første rendering
  useEffect(() => {
    const loadAll = async () => {
      setIsLoading(true);
      await Promise.all([loadFinance(), loadAthletes()]);
      setIsLoading(false);
    };

    loadAll();
  }, []);
  // SLUTT: laster alt ved første rendering

  // START: legger til lån
  const handleLoan = async () => {
    if (loanAmount <= 0) {
      showFeedback("Lånebeløpet må være større enn 0.", "error");
      return;
    }

    const response = await financeService.postLoan(loanAmount);

    if (response.success && response.data) {
      setFinance(response.data);
      setLoanAmount(0);
      showFeedback("Lån registrert.", "success");
    } else {
      showFeedback("Kunne ikke registrere lån.", "error");
    }
  };
  // SLUTT: legger til lån

  // START: kjøper spiller
  const handleBuyAthlete = async (athlete: IAthlete) => {
    if (!finance) return;

    if (finance.moneyLeft < athlete.price) {
      showFeedback("Du har ikke nok penger til å kjøpe denne spilleren.", "error");
      return;
    }

    const ok = confirm(`Vil du kjøpe ${athlete.name} for ${athlete.price.toLocaleString()} kr?`);
    if (!ok) return;

    const response = await athleteService.buyAthlete(athlete.id);

    if (response.success) {
      await Promise.all([loadFinance(), loadAthletes()]);
      showFeedback(`${athlete.name} er kjøpt.`, "success");
    } else {
      showFeedback("Kunne ikke kjøpe spiller.", "error");
    }
  };
  // SLUTT: kjøper spiller

  // START: selger spiller
  const handleSellAthlete = async (athlete: IAthlete) => {
    const ok = confirm(`Vil du selge ${athlete.name}?`);
    if (!ok) return;

    const response = await financeService.sellAthlete(athlete.id);

    if (response.success && response.data) {
      setFinance(response.data);
      await loadAthletes();
      showFeedback(`${athlete.name} er solgt.`, "success");
    } else {
      showFeedback("Kunne ikke selge spiller.", "error");
    }
  };
  // SLUTT: selger spiller

  // START: loading
  if (isLoading || !finance) {
    return (
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <p className="text-sm text-slate-300">Laster dashboard-data...</p>
      </section>
    );
  }
  // SLUTT: loading

  return (
    <section className="space-y-8">
      {/* START: tilbakemelding */}
      {feedbackType && (
        <FeedbackMessage type={feedbackType === "success" ? "success" : "error"} message={feedbackMessage} />
      )}
      {/* SLUTT: tilbakemelding */}

      {/* START: økonomi */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-white">Klubbens økonomi</h2>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-slate-950/60 p-4">
            <p className="text-sm text-slate-400">Penger igjen</p>
            <p className="mt-1 text-lg font-semibold text-emerald-300">
              {finance.moneyLeft.toLocaleString()} kr
            </p>
          </div>

          <div className="rounded-lg bg-slate-950/60 p-4">
            <p className="text-sm text-slate-400">Spillere i troppen</p>
            <p className="mt-1 text-lg font-semibold text-sky-300">
              {finance.numberOfPurchases}
            </p>
          </div>

          <div className="rounded-lg bg-slate-950/60 p-4">
            <p className="text-sm text-slate-400">Penger brukt</p>
            <p className="mt-1 text-lg font-semibold text-rose-300">
              {finance.moneySpent.toLocaleString()} kr
            </p>
          </div>
        </div>
      </section>
      {/* SLUTT: økonomi */}

      {/* START: lån */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-white">Ta opp lån</h2>

        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          <div className="flex-1">
            <label htmlFor="loanAmount" className="mb-1 block text-xs font-medium text-slate-400">
              Lånebeløp i kroner
            </label>
            <input
              id="loanAmount"
              type="number"
              min={1}
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
              placeholder="Beløp i kroner, f.eks. 1000000"
              value={loanAmount || ""}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
          </div>

          <button
            type="button"
            onClick={handleLoan}
            className="rounded-lg bg-sky-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow hover:bg-sky-300"
          >
            Legg til lån
          </button>
        </div>
      </section>
      {/* SLUTT: lån */}

      {/* START: kjøpte spillere */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-white">Din tropp</h2>

        {purchasedAthletes.length === 0 ? (
          <p className="text-sm text-slate-400">Du har ikke kjøpt noen spillere enda.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {purchasedAthletes.map((a) => (
              <article key={a.id} className="flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-950/70 p-4">
                <div>
                  {a.image ? (
                    <img
                      src={`http://localhost:5163/images/${a.image}`}
                      alt={`Bilde av ${a.name}`}
                      className="h-40 w-full rounded-md bg-slate-900/40 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-40 items-center justify-center rounded-md bg-slate-900 text-xs text-slate-400">
                      Ingen bilde
                    </div>
                  )}

                  <h3 className="mt-3 text-base font-semibold text-white">{a.name}</h3>
                  <p className="text-xs text-slate-400">Kjønn: {a.gender}</p>
                  <p className="text-sm text-slate-200">
                    Verdi:{" "}
                    <span className="font-semibold text-emerald-300">
                      {a.price.toLocaleString()} kr
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleSellAthlete(a)}
                  className="mt-4 rounded-lg bg-gradient-to-r from-rose-400 to-orange-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:from-rose-300 hover:to-orange-200"
                >
                  Selg spiller
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
      {/* SLUTT: kjøpte spillere */}

      {/* START: tilgjengelige spillere */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-white">Kjøp spillere</h2>

        {availableAthletes.length === 0 ? (
          <p className="text-sm text-slate-400">Ingen tilgjengelige spillere akkurat nå.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableAthletes.map((a) => (
              <article key={a.id} className="flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-950/70 p-4">
                <div>
                  {a.image ? (
                    <img
                      src={`http://localhost:5163/images/${a.image}`}
                      alt={`Bilde av ${a.name}`}
                      className="h-40 w-full rounded-md bg-slate-900/40 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-40 items-center justify-center rounded-md bg-slate-900 text-xs text-slate-400">
                      Ingen bilde
                    </div>
                  )}

                  <h3 className="mt-3 text-base font-semibold text-white">{a.name}</h3>
                  <p className="text-xs text-slate-400">Kjønn: {a.gender}</p>
                  <p className="text-sm text-slate-200">
                    Pris:{" "}
                    <span className="font-semibold text-emerald-300">
                      {a.price.toLocaleString()} kr
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleBuyAthlete(a)}
                  className="mt-4 rounded-lg bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:from-emerald-300 hover:to-sky-300"
                >
                  Kjøp spiller
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
      {/* SLUTT: tilgjengelige spillere */}
    </section>
  );
};

export default DashbordComponent;

// SLUTT: DashbordComponent
