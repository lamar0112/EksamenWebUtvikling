// START: imageUploadService – upload images to ImageUploadController

import axios from "axios";

const endpoint = "http://localhost:5163/api/imageupload";

interface IUploadResponse {
  success: boolean;
}

const uploadImage = async (file: File): Promise<IUploadResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    await axios.post(endpoint, formData);

    return { success: true };
  } catch {
    return { success: false };
  }
};

export default {
  uploadImage,
};

// SLUTT: imageUploadService
