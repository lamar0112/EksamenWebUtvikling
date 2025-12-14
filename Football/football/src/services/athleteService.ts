// START: athleteService – HTTP-kall mot AthleteController og kjøp via FinanceController

import axios from "axios";
import type IAthlete from "../interfaces/IAthlete";

const athleteEndpoint = "http://localhost:5163/api/athlete";
const financeEndpoint = "http://localhost:5163/api/finance";

interface IListResponse {
  success: boolean;
  data: IAthlete[] | null;
}

interface IItemResponse {
  success: boolean;
  data: IAthlete | null;
}

interface IActionResponse {
  success: boolean;
}

// START: GET – athletes
const getAthletes = async (): Promise<IListResponse> => {
  try {
    const response = await axios.get(athleteEndpoint);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

const getUnpurchasedAthletes = async (): Promise<IListResponse> => {
  try {
    const response = await axios.get(`${athleteEndpoint}/unpurchased`);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

const getAthleteById = async (id: number): Promise<IItemResponse> => {
  try {
    const response = await axios.get(`${athleteEndpoint}/${id}`);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};
// SLUTT: GET – athletes

// START: POST/PUT/DELETE – athletes
const postAthlete = async (athlete: IAthlete): Promise<IActionResponse> => {
  try {
    await axios.post(athleteEndpoint, athlete);
    return { success: true };
  } catch {
    return { success: false };
  }
};

const putAthlete = async (athlete: IAthlete): Promise<IActionResponse> => {
  try {
    await axios.put(athleteEndpoint, athlete);
    return { success: true };
  } catch {
    return { success: false };
  }
};

const deleteAthlete = async (id: number): Promise<IActionResponse> => {
  try {
    await axios.delete(`${athleteEndpoint}/${id}`);
    return { success: true };
  } catch {
    return { success: false };
  }
};
// SLUTT: POST/PUT/DELETE – athletes

// START: kjøp – via finance
const buyAthlete = async (id: number): Promise<IActionResponse> => {
  try {
    await axios.post(`${financeEndpoint}/buy`, { athleteId: id });
    return { success: true };
  } catch {
    return { success: false };
  }
};
// SLUTT: kjøp – via finance

export default {
  getAthletes,
  getUnpurchasedAthletes,
  getAthleteById,
  postAthlete,
  putAthlete,
  deleteAthlete,
  buyAthlete,
};

// SLUTT: athleteService
