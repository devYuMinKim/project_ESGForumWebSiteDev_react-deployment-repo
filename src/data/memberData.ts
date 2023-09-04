import axios from "axios";

export interface Member {
  id: number
  name: string;
  affiliation: string;
  note?: number | null | string; // esg 포럼에서의 직위
}

export const getMemberData = async (): Promise<Member[]> => {
  const apiUrl = process.env.REACT_APP_API_URL;

  try {
    const response = await axios.get(`${apiUrl}/members`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });

    if (response.status === 200) {
      const committeeData: Member[] = response.data; // 데이터를 MemberData 타입 배열로 변환
      return committeeData;
    }

    return [];

  } catch (error) {
    return [];
  }
};

export default getMemberData;