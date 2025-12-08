// src/services/financeService.ts
import axios from "axios";
import type IFinance from "../interfaces/IFinance";

const endpoint = "http://localhost:5163/api/Finance";

interface IListResponse {
  success: boolean;
  data: IFinance[] | null;
}

interface IItemResponse {
  success: boolean;
  data: IFinance | null;
}

interface IDefaultResponse {
  success: boolean;
}

// Hent finance (det er én rad)
const getFinance = async (): Promise<IListResponse> => {
  try {
    const response = await axios.get<IFinance[]>(endpoint);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Feil i getFinance:", error);
    return { success: false, data: null };
  }
};

// Oppdater hele finance (brukes når vi kjøper spiller)
const putFinance = async (finance: IFinance): Promise<IDefaultResponse> => {
  try {
    await axios.put(endpoint, finance);
    return { success: true };
  } catch (error) {
    console.error("Feil i putFinance:", error);
    return { success: false };
  }
};

// Lån penger – treffer ditt [HttpPost("loan")]
const postLoan = async (loanAmount: number): Promise<IItemResponse> => {
  try {
    const response = await axios.post<IFinance>(`${endpoint}/loan`, {
      loanAmount,
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Feil i postLoan:", error);
    return { success: false, data: null };
  }
};

export default {
  getFinance,
  putFinance,
  postLoan,
};
