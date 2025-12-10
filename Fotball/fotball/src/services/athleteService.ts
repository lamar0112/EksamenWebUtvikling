// ========================= START athleteService.ts =========================
// Service for å snakke med AthleteController i backend.
// Her samler vi alle HTTP-kall relatert til Athletes på ett sted.

import axios from "axios";
import type IAthlete from "../interfaces/IAthlete";

// Grunn-URL til Athlete API-et
const endpoint = "http://localhost:5163/api/athlete";

// Enkle typer for svar fra API-et
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

// Henter alle athletes fra API-et (GET /api/athlete)
const getAllAthletes = async (): Promise<IResponseList> => {
  try {
    const response = await axios.get(endpoint);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

// Henter alle athletes som ikke er kjøpt (GET /api/athlete/unpurchased)
const getUnpurchasedAthletes = async (): Promise<IResponseList> => {
  try {
    const response = await axios.get(`${endpoint}/unpurchased`);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

// Henter én athlete basert på id (GET /api/athlete/{id})
const getAthleteById = async (id: number): Promise<IAthleteItemResponse> => {
  try {
    const response = await axios.get(`${endpoint}/${id}`);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

// Lager en ny athlete (POST /api/athlete)
const postAthlete = async (athlete: IAthlete): Promise<IDefaultResponse> => {
  try {
    await axios.post(endpoint, athlete);
    return { success: true };
  } catch {
    return { success: false };
  }
};

// Oppdaterer en athlete (PUT /api/athlete)
const putAthlete = async (athlete: IAthlete): Promise<IDefaultResponse> => {
  try {
    await axios.put(endpoint, athlete);
    return { success: true };
  } catch {
    return { success: false };
  }
};

// Sletter en athlete (DELETE /api/athlete/{id})
const deleteAthlete = async (id: number): Promise<IDefaultResponse> => {
  try {
    await axios.delete(`${endpoint}/${id}`);
    return { success: true };
  } catch {
    return { success: false };
  }
};

// Kjøper en athlete (POST /api/finance/buy)
// Her trenger ikke frontend å vite logikken, vi bare sender id til backend.
const buyAthlete = async (id: number): Promise<IDefaultResponse> => {
  try {
    await axios.post("http://localhost:5163/api/finance/buy", {
      athleteId: id,
    });
    return { success: true };
  } catch {
    return { success: false };
  }
};

// Eksporterer alle metodene som ett objekt
export default {
  getAllAthletes,
  getUnpurchasedAthletes,
  getAthleteById,
  postAthlete,
  putAthlete,
  deleteAthlete,
  buyAthlete,
};

// ========================== SLUTT athleteService.ts =========================
