// ========================= START IFinance.ts ==========================
// Interface for Finance-objektet. 
// Viser nåværende økonomi for klubben og brukes på Dashboard.

export default interface IFinance {
  id: number;               // id i finance-tabellen (vanligvis 1 rad)
  moneyLeft: number;        // hvor mye penger klubben har igjen
  moneySpent: number;       // hvor mye som er brukt totalt
  numberOfPurchases: number; // antall spillere kjøpt
}

// ========================== SLUTT IFinance.ts =========================
