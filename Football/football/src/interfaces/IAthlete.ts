// ========================= START IAthlete.ts =========================
// Interface for Athlete-objektet slik det brukes i frontend.
// Dette matcher modellen i backend (Athlete.cs).

export default interface IAthlete {
  id: number;
  name: string;
  gender: string;
  price: number;
  image: string; 
  purchaseStatus: boolean;
}


// ========================== SLUTT IAthlete.ts =========================
