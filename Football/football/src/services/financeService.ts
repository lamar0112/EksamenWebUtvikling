// ======================== START financeService.ts =========================
// Service for å snakke med FinanceController i backend.
// Brukes på dashboard for økonomi, lån og salg av spillere.

import axios from "axios";
import type IFinance from "../interfaces/IFinance";

// Grunn-URL til Finance API-et
const endpoint = "http://localhost:5163/api/finance";

// Felles responstype
interface IResponse<T> {
  success: boolean;
  data: T | null;
}

// Henter dagens økonomi (GET /api/finance)
const getFinance = async (): Promise<IResponse<IFinance>> => {
  try {
    const response = await axios.get(endpoint);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

// Tar opp lån (POST /api/finance/loan)
const postLoan = async (amount: number): Promise<IResponse<IFinance>> => {
  try {
    const response = await axios.post(`${endpoint}/loan`, {
      loanAmount: amount,
    });
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

// Selger en spiller (POST /api/finance/sell)
// Returnerer oppdatert økonomi (DTO)
const sellAthlete = async (
  athleteId: number
): Promise<IResponse<IFinance>> => {
  try {
    const response = await axios.post(`${endpoint}/sell`, {
      athleteId: athleteId,
    });
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

// Eksporterer metodene
export default {
  getFinance,
  postLoan,
  sellAthlete,
};

// ========================= SLUTT financeService.ts =========================
