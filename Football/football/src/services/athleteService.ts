// ========================= START athleteService.ts =========================
// Service for AthleteController (CRUD + search + buy)

import axios from "axios";
import type IAthlete from "../interfaces/IAthlete";

const endpoint = "http://localhost:5163/api/athlete";

interface IResponse<T> {
  success: boolean;
  data: T | null;
}

// GET all
const getAthletes = async (): Promise<IResponse<IAthlete[]>> => {
  try {
    const response = await axios.get(endpoint);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

// GET by id
const getAthleteById = async (id: number): Promise<IResponse<IAthlete>> => {
  try {
    const response = await axios.get(`${endpoint}/${id}`);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

// GET search by name (NEW)
const searchAthletesByName = async (
  name: string
): Promise<IResponse<IAthlete[]>> => {
  try {
    const response = await axios.get(`${endpoint}/search`, {
      params: { name },
    });
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

// POST create
const postAthlete = async (athlete: IAthlete): Promise<IResponse<IAthlete>> => {
  try {
    const response = await axios.post(endpoint, athlete);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

// PUT update
const putAthlete = async (athlete: IAthlete): Promise<IResponse<null>> => {
  try {
    await axios.put(endpoint, athlete);
    return { success: true, data: null };
  } catch {
    return { success: false, data: null };
  }
};

// DELETE
const deleteAthlete = async (id: number): Promise<IResponse<null>> => {
  try {
    await axios.delete(`${endpoint}/${id}`);
    return { success: true, data: null };
  } catch {
    return { success: false, data: null };
  }
};

// BUY (if you already have this endpoint in AthleteController or FinanceController)
// If buy is in FinanceController, keep it there instead.
const buyAthlete = async (id: number): Promise<IResponse<null>> => {
  try {
    await axios.post(`http://localhost:5163/api/finance/buy`, { athleteId: id });
    return { success: true, data: null };
  } catch {
    return { success: false, data: null };
  }
};

export default {
  getAthletes,
  getAthleteById,
  searchAthletesByName,
  postAthlete,
  putAthlete,
  deleteAthlete,
  buyAthlete,
};

// ========================== SLUTT athleteService.ts =========================
