import axios from "axios";
import {
  PaginatedResponse,
  Reference,
  SendReference,
} from "../types/reference.interface";

const API_URL = process.env.REACT_APP_API_URL;

/**
 * /references
 * Get all references
 * @returns Reference[]
 */
export async function getAllReferences(): Promise<
  PaginatedResponse<Reference>
> {
  const res = await axios.get<PaginatedResponse<Reference>>(
    `${API_URL}/reference`
  );
  return res.data;
}

export async function getReferences(
  page: number,
  subject?: string,
  host?: string
): Promise<PaginatedResponse<Reference>> {
  const res = await axios.get<PaginatedResponse<Reference>>(
    `${API_URL}/reference?page=${page}`
  );
  return res.data;
}

/**
 * /reference/:id
 * Get reference by id
 * @param id
 * @returns Reference
 */
export async function getReferenceById(
  id: string | number
): Promise<Reference> {
  const res = await axios.get<Reference>(`${API_URL}/reference/${id}`);
  return res.data;
}

/**
 * /reference
 * Create reference
 * @param reference
 * @returns Reference
 */
export async function createReference(
  reference: SendReference
): Promise<Reference> {
  const res = await axios.post<Reference>(`${API_URL}/reference`, reference);
  return res.data;
}

/**
 * /references/:id
 * Update reference
 * @param id
 * @param reference
 * @returns Reference
 */
export async function updateReference(
  id: string | number,
  reference: SendReference
): Promise<Reference> {
  const res = await axios.put<Reference>(
    `${API_URL}/reference/${id}`,
    reference
  );
  return res.data;
}

/**
 * /reference/:id
 * Delete reference
 * @param id
 * @returns Reference
 */
export async function deleteReference(id: string | number) {
  const res = await axios.delete(`${API_URL}/reference/${id}`);
  return res.data;
}

/**
 * /references/ongoing
 * Get ongoing references
 * @returns Reference[]
 */
export async function getOngoingReferences(
  page: number,
  subject?: string,
  host?: string
): Promise<PaginatedResponse<Reference>> {
  const params = new URLSearchParams();
  params.append("page", String(page));

  if (subject) {
    params.append("subject", subject);
  }

  if (host) {
    params.append("host", host);
  }

  const res = await axios.get<PaginatedResponse<Reference>>(
    `${API_URL}/reference/ongoing`,
    { params }
  );
  return res.data;
}

/**
 * /references/past
 * Get past references
 * @returns Reference[]
 */
export async function getPastReferences(
  page: number,
  subject?: string,
  host?: string
): Promise<PaginatedResponse<Reference>> {
  const params = new URLSearchParams();
  params.append("page", String(page));

  if (subject) {
    params.append("subject", subject);
  }

  if (host) {
    params.append("host", host);
  }

  const res = await axios.get<PaginatedResponse<Reference>>(
    `${API_URL}/reference/past`,
    { params }
  );
  return res.data;
}

/**
 * /references/search
 * Search references
 * @param subject
 * @param host
 * @returns Reference[]
 */
export async function searchReferences(
  subject?: string,
  host?: string
): Promise<PaginatedResponse<Reference>> {
  const params = new URLSearchParams();

  if (subject) {
    params.append("subject", subject);
  }
  if (host) {
    params.append("host", host);
  }

  const res = await axios.get<PaginatedResponse<Reference>>(
    `${API_URL}/reference/search`,
    { params }
  );
  return res.data;
}
