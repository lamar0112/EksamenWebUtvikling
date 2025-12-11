// START: DashboardComponent – økonomi, lån og kjøp av spillere

import { useEffect, useState } from "react";
import type IFinance from "../../interfaces/IFinance";
import type IAthlete from "../../interfaces/IAthlete";
import financeService from "../../services/financeService";
import athleteService from "../../services/athleteService";
import FeedbackMessage from "../common/FeedbackMessage";

const DashboardComponent = () => {
  // START: state for økonomi, lån og tilgjengelige spillere
  const [finance, setFinance] = useState<IFinance | null>(null);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [availableAthletes, setAvailableAthletes] = useState<IAthlete[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Tilbakemelding til bruker (grønn / rød boks)
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"" | "success" | "error">(
    ""
  );
  // SLUTT: state for økonomi, lån og tilgjengelige spillere

  // START: hjelpefunksjon for å vise tilbakemelding
  const showFeedback = (message: string, type: "success" | "error") => {
    setFeedbackMessage(message);
    setFeedbackType(type);
  };
  // SLUTT: hjelpefunksjon for å vise tilbakemelding

  // START: laster økonomi og ikke-kjøpte spillere ved første rendering
  useEffect(() => {
    const loadAll = async () => {
      await loadFinance();
      await loadAthletes();
      setIsLoading(false);
    };

    loadAll();
  }, []);
  // SLUTT: laster økonomi og ikke-kjøpte spillere

  // START: henter økonomi fra API-et via financeService
  const loadFinance = async () => {
    const response = await financeService.getFinance();
    if (response.success && response.data) {
      setFinance(response.data);
    } else {
      showFeedback("Kunne ikke hente økonomi.", "error");
    }
  };
  // SLUTT: henter økonomi

  // START: henter alle ikke-kjøpte spillere fra API
  const loadAthletes = async () => {
    const response = await athleteService.getUnpurchasedAthletes();
    if (response.success && response.data) {
      setAvailableAthletes(response.data);
    } else {
      showFeedback("Kunne ikke hente spillere.", "error");
    }
  };
  // SLUTT: henter alle ikke-kjøpte spillere

  // START: sender lånebeløp til API-et
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
  // SLUTT: sender lånebeløp

  // START: kjøper en spiller
  const handleBuyAthlete = async (athlete: IAthlete) => {
    const ok = confirm(
      `Vil du kjøpe ${athlete.name} for ${athlete.price.toLocaleString()} kr?`
    );

    if (!ok) return;

    const response = await athleteService.buyAthlete(athlete.id);

    if (response.success) {
      await loadFinance();
      await loadAthletes();
      showFeedback(`Kjøpte ${athlete.name}.`, "success");
    } else {
      showFeedback("Kunne ikke kjøpe spiller.", "error");
    }
  };
  // SLUTT: kjøper en spiller

  // START: loading-state
  if (isLoading || !finance) {
    return (
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <p className="text-sm text-slate-300">Laster dashboard-data...</p>
      </section>
    );
  }
  // SLUTT: loading-state

  // START: selve layouten for dashboardet
  return (
    <section
      className="space-y-8"
      aria-label="Dashboard for økonomi og spillerkjøp"
    >
      {/* Tilbakemelding øverst (grønn / rød) */}
      {feedbackType && (
        <FeedbackMessage type={feedbackType} message={feedbackMessage} />
      )}

      {/* Økonomi-kort */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Klubbens økonomi
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-slate-950/60 p-4">
            <p className="text-sm text-slate-400">Penger igjen</p>
            <p className="mt-1 text-lg font-semibold text-emerald-300">
              {finance.moneyLeft.toLocaleString()} kr
            </p>
          </div>

          <div className="rounded-lg bg-slate-950/60 p-4">
            <p className="text-sm text-slate-400">Antall kjøp</p>
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

      {/* Lån-kort */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-white">Ta opp lån</h2>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex-1">
            <label
              htmlFor="loanAmount"
              className="mb-1 block text-xs font-medium text-slate-400"
            >
              Lånebeløp i kroner
            </label>
            <input
              id="loanAmount"
              type="number"
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
              placeholder="Beløp i kroner, f.eks. 1000000"
              value={loanAmount || ""}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
          </div>

          <button
            type="button"
            onClick={handleLoan}
            className="mt-1 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-sky-400 to-blue-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-md hover:from-sky-300 hover:to-blue-400 md:mt-5"
          >
            Legg til lån
          </button>
        </div>
      </section>

      {/* Spillere som kan kjøpes */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-white">Kjøp spillere</h2>

        {availableAthletes.length === 0 ? (
          <p className="text-sm text-slate-400">
            Alle tilgjengelige spillere er allerede kjøpt.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableAthletes.map((athlete) => (
              <article
                key={athlete.id}
                className="flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-950/70 p-4"
              >
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {athlete.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Kjønn: {athlete.gender}
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    Pris:{" "}
                    <span className="font-semibold text-emerald-300">
                      {athlete.price.toLocaleString()} kr
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleBuyAthlete(athlete)}
                  className="mt-4 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:from-emerald-300 hover:to-sky-300"
                >
                  Kjøp spiller
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
  // SLUTT: layout for dashboardet
};

export default DashboardComponent;
// SLUTT: DashboardComponent
