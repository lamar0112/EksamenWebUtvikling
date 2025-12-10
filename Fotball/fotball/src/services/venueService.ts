// ========================= START venueService.ts ==========================
// Service for å snakke med VenueController i backend.
// Alle HTTP-kall for venues ligger samlet her.

import axios from "axios";
import type IVenue from "../interfaces/IVenue";

// Grunn-URL til Venue API-et
const endpoint = "http://localhost:5163/api/venue";

// Enkle typer for svar fra API-et
interface IResponseList {
  success: boolean;
  data: IVenue[] | null;
}

interface IVenueItemResponse {
  success: boolean;
  data: IVenue | null;
}

interface IDefaultResponse {
  success: boolean;
}

// Henter alle venues (GET /api/venue)
const getAllVenues = async (): Promise<IResponseList> => {
  try {
    const response = await axios.get(endpoint);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

// Henter én venue basert på id (GET /api/venue/{id})
const getVenueById = async (id: number): Promise<IVenueItemResponse> => {
  try {
    const response = await axios.get(`${endpoint}/${id}`);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

// Lager en ny venue (POST /api/venue)
const postVenue = async (venue: IVenue): Promise<IDefaultResponse> => {
  try {
    await axios.post(endpoint, venue);
    return { success: true };
  } catch {
    return { success: false };
  }
};

// Oppdaterer en venue (PUT /api/venue)
const putVenue = async (venue: IVenue): Promise<IDefaultResponse> => {
  try {
    await axios.put(endpoint, venue);
    return { success: true };
  } catch {
    return { success: false };
  }
};

// Sletter en venue (DELETE /api/venue/{id})
const deleteVenue = async (id: number): Promise<IDefaultResponse> => {
  try {
    await axios.delete(`${endpoint}/${id}`);
    return { success: true };
  } catch {
    return { success: false };
  }
};

// Eksporterer metodene
export default {
  getAllVenues,
  getVenueById,
  postVenue,
  putVenue,
  deleteVenue,
};

// ========================== SLUTT venueService.ts ==========================
