import axios from "axios";
import type IAthlete from "../interfaces/IAthlete";

const endpoint = "http://localhost:5163/api/athlete";

interface IResponseList {
    success: boolean;
    data: IAthlete[] | null;
}

interface IAthleteItemResponse {
    success: boolean;
    data: IAthlete | null;
}

interface IDefaultResponse {
    success: boolean;
}

const getAllAthletes = async (): Promise<IResponseList> => {
    try {
        const response = await axios.get(endpoint);
        return { success: true, data: response.data };
    } catch {
        return { success: false, data: null };
    }
};

const getAthleteById = async (id: number): Promise<IAthleteItemResponse> => {
    try {
        const response = await axios.get(`${endpoint}/${id}`);
        return { success: true, data: response.data };
    } catch {
        return { success: false, data: null };
    }
};

const postAthlete = async (athlete: IAthlete): Promise<IDefaultResponse> => {
    try {
        await axios.post(endpoint, athlete);
        return { success: true };
    } catch {
        return { success: false };
    }
};

const putAthlete = async (athlete: IAthlete): Promise<IDefaultResponse> => {
    try {
        await axios.put(endpoint, athlete);
        return { success: true };
    } catch {
        return { success: false };
    }
};

const deleteAthlete = async (id: number): Promise<IDefaultResponse> => {
    try {
        await axios.delete(`${endpoint}/${id}`);
        return { success: true };
    } catch {
        return { success: false };
    }
};

export default {
    getAllAthletes,
    getAthleteById,
    postAthlete,
    putAthlete,
    deleteAthlete
};
