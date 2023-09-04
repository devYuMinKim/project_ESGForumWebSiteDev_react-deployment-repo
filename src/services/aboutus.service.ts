import axios from 'axios';
import { Greetings, History } from '../types/aboutus.interface';

const API_URL = process.env.REACT_APP_API_URL;

export async function getHistories(): Promise<History[]> {
  type ReceiveHistory = Omit<History, 'date'> & { date: string };
  const res = await axios.get<ReceiveHistory[]>(`${API_URL}/aboutus/histories`);

  const data = res.data.map((history) => {
    return {
      ...history,
      date: new Date(history.date),
    };
  });

  return data;
}

export async function getGreetings(): Promise<Greetings> {
  const res = await axios.get<Greetings>(`${API_URL}/aboutus/greetings`);

  return res.data;
}
