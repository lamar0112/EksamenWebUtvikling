// START: athleteService – HTTP-kall mot AthleteController + buy via FinanceController
import axios from "axios";
import type IAthlete from "../interfaces/IAthlete";

const athleteEndpoint = "http://localhost:5163/api/athlete";
const financeEndpoint = "http://localhost:5163/api/finance";

type ListResponse = { success: boolean; data: IAthlete[] | null };
type ItemResponse = { success: boolean; data: IAthlete | null };
type ActionResponse = { success: boolean };

// START: GET
const getAthletes = async (): Promise<ListResponse> => {
  try {
    const response = await axios.get(athleteEndpoint);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

const getAthleteById = async (id: number): Promise<ItemResponse> => {
  try {
    const response = await axios.get(`${athleteEndpoint}/${id}`);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};
// SLUTT: GET

// START: POST/PUT/DELETE
const postAthlete = async (athlete: IAthlete): Promise<ActionResponse> => {
  try {
    await axios.post(athleteEndpoint, athlete);
    return { success: true };
  } catch {
    return { success: false };
  }
};

const putAthlete = async (athlete: IAthlete): Promise<ActionResponse> => {
  try {
    await axios.put(athleteEndpoint, athlete);
    return { success: true };
  } catch {
    return { success: false };
  }
};

const deleteAthlete = async (id: number): Promise<ActionResponse> => {
  try {
    await axios.delete(`${athleteEndpoint}/${id}`);
    return { success: true };
  } catch {
    return { success: false };
  }
};
// SLUTT: POST/PUT/DELETE

// START: BUY (via finance)
const buyAthlete = async (id: number): Promise<ActionResponse> => {
  try {
    await axios.post(`${financeEndpoint}/buy`, { athleteId: id });
    return { success: true };
  } catch {
    return { success: false };
  }
};
// SLUTT: BUY

export default {
  getAthletes,
  getAthleteById,
  postAthlete,
  putAthlete,
  deleteAthlete,
  buyAthlete,
};
// SLUTT: athleteService
