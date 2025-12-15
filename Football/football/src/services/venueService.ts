// START: venueService – HTTP calls to VenueController
import axios from "axios";
import type IVenue from "../interfaces/IVenue";

const endpoint = "http://localhost:5163/api/venue";

interface IListResponse {
  success: boolean;
  data: IVenue[] | null;
}

interface IItemResponse {
  success: boolean;
  data: IVenue | null;
}

interface IActionResponse {
  success: boolean;
}

const getAllVenues = async (): Promise<IListResponse> => {
  try {
    const response = await axios.get(endpoint);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

const getVenueById = async (id: number): Promise<IItemResponse> => {
  try {
    const response = await axios.get(`${endpoint}/${id}`);
    return { success: true, data: response.data };
  } catch {
    return { success: false, data: null };
  }
};

const postVenue = async (venue: IVenue): Promise<IActionResponse> => {
  try {
    await axios.post(endpoint, venue);
    return { success: true };
  } catch {
    return { success: false };
  }
};

const putVenue = async (venue: IVenue): Promise<IActionResponse> => {
  try {
    await axios.put(endpoint, venue);
    return { success: true };
  } catch {
    return { success: false };
  }
};

const deleteVenue = async (id: number): Promise<IActionResponse> => {
  try {
    await axios.delete(`${endpoint}/${id}`);
    return { success: true };
  } catch {
    return { success: false };
  }
};

export default {
  getAllVenues,
  getVenueById,
  postVenue,
  putVenue,
  deleteVenue,
};
// SLUTT: venueService
