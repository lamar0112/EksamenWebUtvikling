// ========================= START IVenue.ts ============================
// Interface for Venue, som brukes i hele frontend.
// Dette objektet holder info om stadioner.

export default interface IVenue {
  id: number;          // id i databasen
  name: string;        // navn på stadion
  capacity: number;    // hvor mange som får plass
  image: string;       // filnavn på stadion-bilde
}

// ========================== SLUTT IVenue.ts ===========================
