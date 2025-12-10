// ======================== START financeService.ts =========================
// Service for å snakke med FinanceController i backend.
// Brukes blant annet på Dashboard for å hente penger igjen, penger brukt osv.

import axios from "axios";
import type IFinance from "../interfaces/IFinance";

// Grunn-URL til Finance API-et
const endpoint = "http://localhost:5163/api/finance";

// Type for svar som inneholder ett Finance-objekt
interface IFinanceResponse {
  success: boolean;
  data: IFinance | null;
}

// Henter dagens økonomi (GET /api/finance)
const getFinance = async (): Promise<IFinanceResponse> => {
  try {
    const response = await axios.get(endpoint);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

// Sender inn et lån til backend (POST /api/finance/loan)
// Backend legger beløpet til MoneyLeft og returnerer oppdatert Finance.
const postLoan = async (amount: number): Promise<IFinanceResponse> => {
  try {
    const response = await axios.post(`${endpoint}/loan`, {
      loanAmount: amount,
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
};

// ========================= SLUTT financeService.ts =========================
