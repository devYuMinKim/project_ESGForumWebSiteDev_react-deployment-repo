import axios from "axios";
import { User } from "../types/seminars.interface";

const API_URL = process.env.REACT_APP_API_URL;

export async function getUserInfo(token: string) {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

/**
 * /user
 * Get current user
 * @returns User
 */
export async function getCurrentUser(token: string): Promise<User> {
  const res = await axios.get<User>(`${API_URL}/isAdmin`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
