import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${API_URL}/upload`, formData);

  return res.data;
}
