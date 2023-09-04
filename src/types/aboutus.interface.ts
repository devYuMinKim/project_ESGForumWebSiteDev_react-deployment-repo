export interface History {
  seq: number;
  date: Date;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface SendHistory extends Omit<History, 'seq' | 'created_at' | 'updated_at'> {}

export interface Greetings {
  greetings: string;
  chairman: Chairman;
}

export interface Chairman {
  position: string;
  name: string;
  image: string;
}
