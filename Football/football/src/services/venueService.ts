// ========================= START venueService.ts ==========================

import axios from "axios";
import type IVenue from "../interfaces/IVenue";

const endpoint = "http://localhost:5163/api/venue";

interface IResponse<T> {
  success: boolean;
  data: T | null;
}

// GET all
const getAllVenues = async (): Promise<IResponse<IVenue[]>> => {
  try {
    const response = await axios.get(endpoint);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

// GET by id
const getVenueById = async (id: number): Promise<IResponse<IVenue>> => {
  try {
    const response = await axios.get(`${endpoint}/${id}`);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

// GET search by name (NEW)
const searchVenuesByName = async (name: string): Promise<IResponse<IVenue[]>> => {
  try {
    const response = await axios.get(`${endpoint}/search`, {
      params: { name },
    });
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

// POST
const postVenue = async (venue: IVenue): Promise<IResponse<null>> => {
  try {
    await axios.post(endpoint, venue);
    return { success: true, data: null };
  } catch {
    return { success: false, data: null };
  }
};

// PUT
const putVenue = async (venue: IVenue): Promise<IResponse<null>> => {
  try {
    await axios.put(endpoint, venue);
    return { success: true, data: null };
  } catch {
    return { success: false, data: null };
  }
};

// DELETE
const deleteVenue = async (id: number): Promise<IResponse<null>> => {
  try {
    await axios.delete(`${endpoint}/${id}`);
    return { success: true, data: null };
  } catch {
    return { success: false, data: null };
  }
};

export default {
  getAllVenues,
  getVenueById,
  searchVenuesByName,
  postVenue,
  putVenue,
  deleteVenue,
};

// ========================== SLUTT venueService.ts ==========================
