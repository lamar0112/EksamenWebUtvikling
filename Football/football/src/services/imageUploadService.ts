// START: imageUploadService – upload image to API (athletes/venues)
import axios from "axios";

// START: base url (HTTP – matcher launchSettings)
const API_BASE_URL = "http://localhost:5163";
// SLUTT: base url

const endpoint = `${API_BASE_URL}/api/imageupload`;

export interface IUploadResponse {
  success: boolean;
  fileName: string;
  errorMessage: string;
}

const uploadImage = async (
  file: File,
  folder: "athletes" | "venues"
): Promise<IUploadResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${endpoint}/${folder}`, formData);

    return { success: true, fileName: response.data.fileName, errorMessage: "" };
  } catch (err: any) {
    const status = err?.response?.status;
    const data = err?.response?.data;
    const msg =
      (status ? `HTTP ${status}: ` : "") +
      (typeof data === "string" ? data : "") +
      (err?.message ? ` ${err.message}` : "");

    return { success: false, fileName: "", errorMessage: msg || "Network Error" };
  }
};

export default { uploadImage };
// SLUTT: imageUploadService
