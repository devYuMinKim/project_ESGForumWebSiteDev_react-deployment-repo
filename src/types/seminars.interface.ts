export interface Seminar {
  id: string;
  date_start: string;
  date_end: string;
  location: string;
  subject: string;
  host: string;
  supervision: string;
  participation: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface SendSeminar extends Omit<Seminar, 'id' | 'created_at' | 'updated_at'> {}
