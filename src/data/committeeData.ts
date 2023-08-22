import axios from "axios";

export interface CommitteeData {
  id: number,
  name: string,
  explanation: string,
}

export const GetCommitteeData = async (): Promise<string | CommitteeData[]> => {
  const apiUrl = "http://127.0.0.1:8000/api";

  try {
    const response = await axios.get(`${apiUrl}/committees`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });

    if (response.status === 200) {
      const committeeData: CommitteeData[] = response.data; // 데이터를 CommitteeData 타입 배열로 변환
      return committeeData;
    }

    return [];

  } catch (error) {
    return [];
  }
};

export default GetCommitteeData;
