// ===================== START imageUploadService.ts ========================
// Enkel service for å laste opp bilder til API-et.
// Her bruker vi FormData, som er en vanlig nettleser-funksjon for å sende filer.

import axios from "axios";

// URL til ImageUploadController i backend
const endpoint = "http://localhost:5163/api/imageupload";

// Svar-type. Backend trenger egentlig bare å si om det gikk bra eller ikke.
interface IUploadResponse {
  success: boolean;
}

// Laster opp ett bilde til backend.
// FormData brukes fordi vi sender en fil, ikke vanlig JSON.
const uploadImage = async (file: File): Promise<IUploadResponse> => {
  try {
    const formData = new FormData();
    // "file" må ha samme navn som parameteren i ImageUploadController.Post(IFormFile file)
    formData.append("file", file);

    await axios.post(endpoint, formData, {
      // Dette header-oppsettet er standard når vi sender FormData med filer.
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { success: true };
  } catch {
    return { success: false };
  }
};

// Eksporterer upload-funksjonen som et objekt, så vi kan skrive imageUploadService.uploadImage(...)
export default {
  uploadImage,
};

// ====================== SLUTT imageUploadService.ts =======================
