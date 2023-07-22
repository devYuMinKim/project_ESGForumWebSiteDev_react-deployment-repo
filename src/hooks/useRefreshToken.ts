import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useRefreshAccessToken = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const refreshAccessToken = async () => {
    const apiUrl = "http://127.0.0.1:8000/api";
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/auth/refresh_token`,
        { refreshToken },
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setLoading(false);
      }
    } catch (error) {
      console.error("새로운 AccessToken 받기 실패:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAccessToken().catch((error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate("/login");
      }
    });
  }, []);

  return { loading };
};

export default useRefreshAccessToken;
