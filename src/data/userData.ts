import axios from "axios";

export interface User {
  email: string,
  affiliation: string,
  name: string,
  autortity: null | number
}

export interface getUserDataResponse {
  users: User[],
  applicants: User[],
}

const failedData: User = {
  email: "",
  affiliation: "",
  name: "",
  autortity: -1
}

const failedReturn = {
  users: [failedData],
  applicants: [failedData],
}

export const getUserData = async (): Promise<getUserDataResponse> => {
  const apiUrl = "http://127.0.0.1:8000/api";

  try {
    const response = await axios.get(`${apiUrl}/users`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });

    if (response.status === 200) {
      const usersData: getUserDataResponse = response.data; // 데이터를 MemberData 타입 배열로 변환
      return usersData;
    }

    return failedReturn;
  } catch (error) {
    return failedReturn;
  }
};
export default getUserData;