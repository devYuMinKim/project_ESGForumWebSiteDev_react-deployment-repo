import axios from "axios";
import {
  PaginatedResponse,
  Seminar,
  SendSeminar,
  User,
} from "../types/seminars.interface";

const API_URL = process.env.REACT_APP_API_URL;

/**
 * /seminars
 * Get all seminars
 * @returns Seminar[]
 */
export async function getAllSeminars(): Promise<PaginatedResponse<Seminar>> {
  const res = await axios.get<PaginatedResponse<Seminar>>(
    `${API_URL}/seminars`
  );
  return res.data;
}

export async function getSeminars(
  page: number,
  subject?: string,
  host?: string
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
  id: string | undefined,
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
export async function deleteSeminar(id: string | undefined) {
  const res = await axios.delete(`${API_URL}/seminars/${id}`);
  return res.data;
}

/**
 * /seminars/ongoing
 * Get ongoing seminars
 * @returns Seminar[]
 */
export async function getOngoingSeminars(
  page: number,
  subject?: string,
  host?: string
): Promise<PaginatedResponse<Seminar>> {
  const params = new URLSearchParams();
  params.append("page", String(page));

  if (subject) {
    params.append("subject", subject);
  }

  if (host) {
    params.append("host", host);
  }

  const res = await axios.get<PaginatedResponse<Seminar>>(
    `${API_URL}/seminars/ongoing`,
    { params }
  );
  return res.data;
}

/**
 * /seminars/past
 * Get past seminars
 * @returns Seminar[]
 */
export async function getPastSeminars(
  page: number,
  subject?: string,
  host?: string
): Promise<PaginatedResponse<Seminar>> {
  const params = new URLSearchParams();
  params.append("page", String(page));

  if (subject) {
    params.append("subject", subject);
  }

  if (host) {
    params.append("host", host);
  }

  const res = await axios.get<PaginatedResponse<Seminar>>(
    `${API_URL}/seminars/past`,
    { params }
  );
  return res.data;
}

/**
 * /seminars/search
 * Search seminars
 * @param subject
 * @param host
 * @returns Seminar[]
 */
export async function searchSeminars(
  subject?: string,
  host?: string
): Promise<PaginatedResponse<Seminar>> {
  const params = new URLSearchParams();

  if (subject) {
    params.append("subject", subject);
  }
  if (host) {
    params.append("host", host);
  }

  const res = await axios.get<PaginatedResponse<Seminar>>(
    `${API_URL}/seminars/search`,
    { params }
  );
  return res.data;
}
