import axios, { AxiosError } from "axios";

const BASE_URL = process.env.API_URL || "http://localhost:3002";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,

  (error: AxiosError<{ error?: string }>) => {
    const message =
      error.response?.data?.error ||
      error.response?.statusText ||
      error.message;
    return Promise.reject(new Error(message));
  }
);
