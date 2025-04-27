import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

const API_BASE_URL = "https://soccer.highlightly.net/api";

// Create axios instance with default configurations
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Add your API key if required
    // 'Authorization': 'Bearer YOUR_API_KEY_HERE'
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add logic here like adding auth tokens
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error(
        "API Error Response:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.error("API No Response:", error.request);
    } else {
      // Something else triggered an error
      console.error("API Request Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Custom fetch function with retry logic
export const fetchWithRetry = async <T>(
  apiCall: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> => {
  try {
    return await apiCall();
  } catch (error) {
    if (retries <= 1) throw error;

    await new Promise((resolve) => setTimeout(resolve, delay));
    return fetchWithRetry(apiCall, retries - 1, delay * 2);
  }
};

export default apiClient;
