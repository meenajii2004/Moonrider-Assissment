import axios, { AxiosError } from "axios";
import type { ApiResponse, User } from "../types"; // adjust if using @/types

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const request = async <T>(endpoint: string, options?: any): Promise<ApiResponse<T>> => {
  try {
    const res = await api(endpoint, options);
    return res.data as ApiResponse<T>;
  } catch (err) {
    const error = err as AxiosError<ApiResponse>;
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
      error: error.message,
    } as ApiResponse<T>;
  }
};

// Example usage
export const getUsers = () => request<User[]>("/users");
export const getUserById = (id: string) => request<User>(`/users/${id}`);
export const login = (credentials: { email: string; password: string }) =>
  request<{ token: string; user: User }>("/auth/login", {
    method: "POST",
    data: credentials,
  });

export default api;
