import { useEffect, useState } from "react";
import financeService from "../../services/financeService";
import type IFinance from "../../interfaces/IFinance";

const DashboardComponent = () => {
    const [finance, setFinance] = useState<IFinance | null>(null);

    useEffect(() => {
        loadFinance();
    }, []);

    const loadFinance = async () => {
        const response = await financeService.getFinance();
        if (response.success && response.data) {
            setFinance(response.data);
        }
    };

    if (!finance) return <p>Laster økonomi...</p>;

    return (
        <section className="border p-4 rounded">
            <h2 className="text-xl font-bold mb-4">Klubbens Økonomi</h2>

            <p className="mb-2">💵 Penger igjen: {finance.moneyLeft} kr</p>
            <p className="mb-2">🧾 Antall kjøp: {finance.numberOfPurchases}</p>
            <p className="mb-2">📉 Penger brukt: {finance.moneySpent} kr</p>
        </section>
    );
};

export default DashboardComponent;
