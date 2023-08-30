export interface Reference {
  id: string;
  location: string;
  subject: string;
  host: string;
  supervision: string;
  participation: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

export interface SendReference
  extends Omit<Reference, "id" | "created_at" | "updated_at"> {}
