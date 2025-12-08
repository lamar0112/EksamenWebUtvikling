import axios from "axios";
import type IFinance from "../interfaces/IFinance";

const endpoint = "http://localhost:5163/api/finance";

interface IFinanceResponse {
  success: boolean;
  data: IFinance | null;
}

const getFinance = async (): Promise<IFinanceResponse> => {
  try {
    const response = await axios.get(endpoint);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

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

export default {
  getFinance,
  postLoan,
};
