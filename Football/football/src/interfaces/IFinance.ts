// ========================= START IFinance.ts ==========================
// Interface for Finance-objektet.
// Brukes i dashboard for å vise penger igjen, penger brukt og antall kjøp.
// NB: id er optional fordi buy/sell-endepunktene kan returnere en DTO uten id.

export default interface IFinance {
  id?: number;             
  moneyLeft: number;      
  moneySpent: number;       
  numberOfPurchases: number; 
}

// ========================== SLUTT IFinance.ts =========================
