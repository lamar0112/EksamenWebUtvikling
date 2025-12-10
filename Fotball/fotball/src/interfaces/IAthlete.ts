// ========================= START IAthlete.ts =========================
// Interface for Athlete-objektet slik det brukes i frontend.
// Dette matcher modellen i backend (Athlete.cs).

export default interface IAthlete {
  id: number;            // id fra databasen
  name: string;          // navnet til spilleren
  gender: string;        // kjønn (tekst)
  price: number;         // pris for kjøp
  image: string;         // filnavn på bildet som ligger i wwwroot/images
  purchaseStatus: boolean; // true hvis spilleren er kjøpt
}

// ========================== SLUTT IAthlete.ts =========================
