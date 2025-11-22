import axios from "axios";

// Fallback to localhost:3000 when VITE_BACKEND_URL is not set
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: backendUrl,
});

export default apiClient;
