// src/pages/DashboardPage.tsx
import { useEffect, useState } from "react";
import financeService from "../services/financeService";
import athleteService from "../services/athleteService";
import type IFinance from "../interfaces/IFinance";
import type IAthlete from "../interfaces/IAthlete";

const DashboardPage = () => {
  const [finance, setFinance] = useState<IFinance | null>(null);
  const [athletes, setAthletes] = useState<IAthlete[]>([]);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Hent finance
    const financeResponse = await financeService.getFinance();
    console.log("FinanceResponse fra API:", financeResponse);

    if (financeResponse.success && financeResponse.data && financeResponse.data.length > 0) {
      const f = financeResponse.data[0];

      // Tving til number i tilfelle de kommer som string
      const cleanedFinance: IFinance = {
        id: f.id,
        moneyLeft: Number(f.moneyLeft),
        numberOfPurchases: Number(f.numberOfPurchases),
        moneySpent: Number(f.moneySpent),
      };

      console.log("Cleaned finance:", cleanedFinance);
      setFinance(cleanedFinance);
    }

    // Hent athletes
    const athleteResponse = await athleteService.getAllAthletes();
    if (athleteResponse.success && athleteResponse.data) {
      setAthletes(athleteResponse.data);
    }
  };

  const handleLoan = async () => {
    if (!finance) return;

    if (loanAmount <= 0) {
      setMessage("Skriv inn et positivt beløp.");
      return;
    }

    const updatedFinance: IFinance = {
      ...finance,
      moneyLeft: finance.moneyLeft + loanAmount,
    };

    const response = await financeService.putFinance(updatedFinance);
    if (response.success) {
      setFinance(updatedFinance);
      setMessage(`Lån på ${loanAmount} kr er lagt til.`);
      setLoanAmount(0);
    } else {
      setMessage("Kunne ikke oppdatere økonomien.");
    }
  };

  const handlePurchase = async (athlete: IAthlete) => {
    if (!finance) return;

    if (athlete.purchaseStatus) {
      setMessage("Denne spilleren er allerede kjøpt.");
      return;
    }

    if (finance.moneyLeft < athlete.price) {
      setMessage("Ikke nok penger til å kjøpe denne spilleren.");
      return;
    }

    // 1. Oppdater athlete
    const updatedAthlete: IAthlete = { ...athlete, purchaseStatus: true };
    const athleteResponse = await athleteService.putAthlete(updatedAthlete);
    if (!athleteResponse.success) {
      setMessage("Kunne ikke oppdatere spilleren.");
      return;
    }

    // 2. Oppdater finance
    const updatedFinance: IFinance = {
      ...finance,
      moneyLeft: finance.moneyLeft - athlete.price,
      moneySpent: finance.moneySpent + athlete.price,
      numberOfPurchases: finance.numberOfPurchases + 1,
    };

    const financeResponse = await financeService.putFinance(updatedFinance);
    if (!financeResponse.success) {
      setMessage("Kunne ikke oppdatere økonomien.");
      return;
    }

    // 3. Oppdater state
    setFinance(updatedFinance);
    setAthletes((prev) =>
      prev.map((a) => (a.id === athlete.id ? updatedAthlete : a))
    );
    setMessage(`Du har kjøpt ${athlete.name}.`);
  };

  const notPurchased = athletes.filter((a) => !a.purchaseStatus);

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {message && (
        <p className="mb-4 text-sm text-blue-700">{message}</p>
      )}

      {/* Seksjon 1 – økonomi */}
      <section className="mb-6 border p-4 rounded">
        <h2 className="font-semibold mb-2">Klubbens økonomi</h2>
        {finance ? (
          <ul className="text-sm">
            <li>💰 Penger igjen: {finance.moneyLeft} kr</li>
            <li>🛒 Antall kjøp: {finance.numberOfPurchases}</li>
            <li>📉 Penger brukt: {finance.moneySpent} kr</li>
          </ul>
        ) : (
          <p>Ingen økonomidata funnet.</p>
        )}
      </section>

      {/* Seksjon 2 – lån */}
      <section className="mb-6 border p-4 rounded">
        <h2 className="font-semibold mb-2">Ta opp lån</h2>
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="border p-2 w-full sm:w-48"
            placeholder="Beløp (kr)"
          />
          <button
            onClick={handleLoan}
            className="px-3 py-2 bg-green-600 text-white text-sm"
          >
            Legg til lån
          </button>
        </div>
      </section>

      {/* Seksjon 3 – kjøp spillere */}
      <section className="border p-4 rounded">
        <h2 className="font-semibold mb-2">Kjøp spillere</h2>
        {notPurchased.length === 0 ? (
          <p>Alle spillere er allerede kjøpt.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {notPurchased.map((athlete) => (
              <article key={athlete.id} className="border rounded p-3 text-sm">
                <h3 className="font-semibold mb-1">{athlete.name}</h3>
                <p>Pris: {athlete.price} kr</p>
                <p>Kjønn: {athlete.gender}</p>
                <button
                  onClick={() => handlePurchase(athlete)}
                  className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs"
                >
                  Kjøp spiller
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default DashboardPage;
