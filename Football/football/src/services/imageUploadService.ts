// START: imageUploadService – upload images to ImageUploadController
import axios from "axios";

const endpoint = "http://localhost:5163/api/imageupload";

interface IUploadResponse {
  success: boolean;
  fileName: string; // backend returnerer { fileName: "..." }
}

const uploadImage = async (file: File): Promise<IUploadResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(endpoint, formData);

    return { success: true, fileName: response.data.fileName };
  } catch {
    return { success: false, fileName: "" };
  }
};

export default {
  uploadImage,
};
// SLUTT: imageUploadService
