import axios from "axios";
import type IFinance from "../interfaces/IFinance";

const endpoint = "http://localhost:5163/api/finance";

interface IFinanceResponse {
    success: boolean;
    data: IFinance | null;
}

interface IDefaultResponse {
    success: boolean;
}

const getFinance = async (): Promise<IFinanceResponse> => {
    try {
        const response = await axios.get(endpoint);
        return { success: true, data: response.data };
    } catch {
        return { success: false, data: null };
    }
};

const updateFinance = async (finance: IFinance): Promise<IDefaultResponse> => {
    try {
        await axios.put(endpoint, finance);
        return { success: true };
    } catch {
        return { success: false };
    }
};

export default {
    getFinance,
    updateFinance
};
