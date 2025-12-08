import { useEffect, useState } from "react";
import type IFinance from "../../interfaces/IFinance";
import type IAthlete from "../../interfaces/IAthlete";
import financeService from "../../services/financeService";
import athleteService from "../../services/athleteService";

const DashboardComponent = () => {
  // State for økonomi, lån og tilgjengelige spillere
  const [finance, setFinance] = useState<IFinance | null>(null);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [availableAthletes, setAvailableAthletes] = useState<IAthlete[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Henter data første gang komponenten vises
  useEffect(() => {
    const loadAll = async () => {
      await loadFinance();
      await loadAthletes();
      setIsLoading(false);
    };

    loadAll();
  }, []);

  // Henter økonomi fra API
  const loadFinance = async () => {
    const response = await financeService.getFinance();
    if (response.success && response.data) {
      setFinance(response.data);
    } else {
      alert("Kunne ikke hente økonomi");
    }
  };

  // Henter ikke-kjøpte spillere
  const loadAthletes = async () => {
    const response = await athleteService.getUnpurchasedAthletes();
    if (response.success && response.data) {
      setAvailableAthletes(response.data);
    } else {
      alert("Kunne ikke hente spillere");
    }
  };

  // Sender inn lånesum til API
  const handleLoan = async () => {
    if (loanAmount <= 0) {
      alert("Lånebeløpet må være større enn 0");
      return;
    }

    const response = await financeService.postLoan(loanAmount);
    if (response.success && response.data) {
      setFinance(response.data);
      setLoanAmount(0);
    } else {
      alert("Kunne ikke registrere lån");
    }
  };

  // Kjøper spiller via API
  const handleBuyAthlete = async (athlete: IAthlete) => {
    const ok = confirm(
      `Vil du kjøpe ${athlete.name} for ${athlete.price.toLocaleString()} kr?`
    );

    if (!ok) return;

    const response = await athleteService.buyAthlete(athlete.id);

    if (response.success) {
      // Etter kjøp henter vi oppdatert økonomi + liste over tilgjengelige spillere
      await loadFinance();
      await loadAthletes();
    } else {
      alert("Kunne ikke kjøpe spiller");
    }
  };

  // ---------- RENDER ----------

  if (isLoading || !finance) {
    return <p className="text-sm text-slate-300">Laster økonomi…</p>;
  }

  return (
    <section className="space-y-8">
      {/* Økonomi-kort */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Klubbens økonomi
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-slate-950/60 p-4">
            <p className="text-sm text-slate-400 flex items-center gap-2">
              <span>💰</span>Penger igjen
            </p>
            <p className="mt-1 text-lg font-semibold text-emerald-300">
              {finance.moneyLeft.toLocaleString()} kr
            </p>
          </div>

          <div className="rounded-lg bg-slate-950/60 p-4">
            <p className="text-sm text-slate-400 flex items-center gap-2">
              <span>🛒</span>Antall kjøp
            </p>
            <p className="mt-1 text-lg font-semibold text-sky-300">
              {finance.numberOfPurchases}
            </p>
          </div>

          <div className="rounded-lg bg-slate-950/60 p-4">
            <p className="text-sm text-slate-400 flex items-center gap-2">
              <span>📉</span>Penger brukt
            </p>
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
          <input
            type="number"
            className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            placeholder="Beløp i kroner, f.eks. 1000000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
          />
          <button
            onClick={handleLoan}
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-sky-400 to-blue-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-md hover:from-sky-300 hover:to-blue-400"
          >
            💳 Legg til lån
          </button>
        </div>
      </section>

      {/* Spillere som kan kjøpes */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-white">Kjøp spillere</h2>

        {availableAthletes.length === 0 && (
          <p className="text-sm text-slate-400">
            Alle tilgjengelige spillere er allerede kjøpt.
          </p>
        )}

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
                onClick={() => handleBuyAthlete(athlete)}
                className="mt-4 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:from-emerald-300 hover:to-sky-300"
              >
                ⚽ Kjøp spiller
              </button>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
};

export default DashboardComponent;
