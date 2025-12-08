// Enkel service for å laste opp bilder til API-et.
// Bruker FormData og sender filen til ImageUploadController.

import axios from "axios";

const endpoint = "http://localhost:5163/api/imageupload";

interface IUploadResponse {
  success: boolean;
}

const uploadImage = async (file: File): Promise<IUploadResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file); // "file" matcher parameter-navnet i controlleren

    await axios.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { success: true };
  } catch {
    return { success: false };
  }
};

export default {
  uploadImage,
};
