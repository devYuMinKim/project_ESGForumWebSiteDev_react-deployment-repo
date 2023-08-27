import axios from "axios";

export interface MemberData {
  id: number; // 위원회에서의 순번
  m_id: number;
  name: string;
  affiliation: string;
  pivot: {
    id2: number; // 회원의 순번
    note: string | null; // 위원회에서의 직책
  }
  note?: number | null; // 특정 위원회의 직위 | 회원 만의 직위
}

export const GetMemberData = async (id: number): Promise<MemberData[]> => {
  const apiUrl = "http://127.0.0.1:8000/api";

  try {
    const response = await axios.get(`${apiUrl}/committees/${id}/members`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });

    if (response.status === 200) {
      const committeeData: MemberData[] = response.data; // 데이터를 MemberData 타입 배열로 변환
      return committeeData;
    }

    return [];

  } catch (error) {
    return [];
  }
};

export default GetMemberData;
