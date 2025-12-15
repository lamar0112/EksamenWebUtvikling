// START: financeService – HTTP-kall mot FinanceController
import axios from "axios";
import type IFinance from "../interfaces/IFinance";

const endpoint = "http://localhost:5163/api/finance";

interface IResponse<T> {
  success: boolean;
  data: T | null;
}

// START: normaliser finance (håndterer DTO uten id)
const normalizeFinance = (data: any, fallback?: IFinance): IFinance => {
  return {
    id: data?.id ?? fallback?.id ?? 1,
    moneyLeft: Number(data?.moneyLeft ?? fallback?.moneyLeft ?? 0),
    moneySpent: Number(data?.moneySpent ?? fallback?.moneySpent ?? 0),
    numberOfPurchases: Number(data?.numberOfPurchases ?? fallback?.numberOfPurchases ?? 0),
  };
};
// SLUTT: normaliser finance

// START: GET /api/finance
const getFinance = async (): Promise<IResponse<IFinance>> => {
  try {
    const response = await axios.get(endpoint);
    return { success: true, data: normalizeFinance(response.data) };
  } catch {
    return { success: false, data: null };
  }
};
// SLUTT: GET

// START: POST /api/finance/loan
const postLoan = async (amount: number, current?: IFinance): Promise<IResponse<IFinance>> => {
  try {
    const response = await axios.post(`${endpoint}/loan`, { loanAmount: amount });
    return { success: true, data: normalizeFinance(response.data, current) };
  } catch {
    return { success: false, data: null };
  }
};
// SLUTT: POST loan

// START: POST /api/finance/sell
const sellAthlete = async (athleteId: number, current?: IFinance): Promise<IResponse<IFinance>> => {
  try {
    const response = await axios.post(`${endpoint}/sell`, { athleteId });
    return { success: true, data: normalizeFinance(response.data, current) };
  } catch {
    return { success: false, data: null };
  }
};
// SLUTT: POST sell

export default {
  getFinance,
  postLoan,
  sellAthlete,
};
// SLUTT: financeService
