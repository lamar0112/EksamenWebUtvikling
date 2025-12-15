// ========================= START IFinance.ts ==========================
// Interface for Finance-objektet.
// Brukes i dashboard for å vise penger igjen, penger brukt og antall kjøp.
// NB: id er optional fordi buy/sell-endepunktene kan returnere en DTO uten id.

export default interface IFinance {
  id?: number;              // optional (DTO fra buy/sell kan mangle id)
  moneyLeft: number;        // hvor mye penger klubben har igjen
  moneySpent: number;       // hvor mye som er brukt totalt
  numberOfPurchases: number; // antall spillere kjøpt / i troppen
}

// ========================== SLUTT IFinance.ts =========================
