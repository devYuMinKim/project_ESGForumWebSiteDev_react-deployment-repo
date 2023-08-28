import axios from "axios";
import {
  PaginatedResponse,
  Seminar,
  SendSeminar,
} from "../types/seminars.interface";

const API_URL = process.env.REACT_APP_API_URL;

/**
 * /seminars
 * Get all seminars
 * @returns Seminar[]
 */
// export async function getAllSeminars(): Promise<PaginatedResponse<Seminar>> {
//   const res = await axios.get<Seminar[]>(`${API_URL}/seminars`);
//   return res.data;
// }
export async function getAllSeminars(): Promise<PaginatedResponse<Seminar>> {
  const res = await axios.get<PaginatedResponse<Seminar>>(
    `${API_URL}/seminars`
  );
  return res.data;
}

export async function getSeminars(
  page: number
): Promise<PaginatedResponse<Seminar>> {
  const res = await axios.get<PaginatedResponse<Seminar>>(
    `${API_URL}/seminars?page=${page}`
  );
  return res.data;
}

/**
 * /seminars/:id
 * Get seminar by id
 * @param id
 * @returns Seminar
 */
export async function getSeminarById(id: string | number): Promise<Seminar> {
  const res = await axios.get<Seminar>(`${API_URL}/seminars/${id}`);
  return res.data;
}

/**
 * /seminars
 * Create seminar
 * @param seminar
 * @returns Seminar
 */
export async function createSeminar(seminar: SendSeminar): Promise<Seminar> {
  const res = await axios.post<Seminar>(`${API_URL}/seminars`, seminar);
  return res.data;
}

/**
 * /seminars/:id
 * Update seminar
 * @param id
 * @param seminar
 * @returns Seminar
 */
export async function updateSeminar(
  id: string | number,
  seminar: SendSeminar
): Promise<Seminar> {
  const res = await axios.put<Seminar>(`${API_URL}/seminars/${id}`, seminar);
  return res.data;
}

/**
 * /seminars/:id
 * Delete seminar
 * @param id
 * @returns Seminar
 */
export async function deleteSeminar(id: string | number) {
  const res = await axios.delete(`${API_URL}/seminars/${id}`);
  return res.data;
}
