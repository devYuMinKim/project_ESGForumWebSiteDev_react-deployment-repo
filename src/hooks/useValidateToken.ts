import { useState, useEffect, useCallback } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { User } from "../types/seminars.interface";

const API_URL = process.env.REACT_APP_API_URL;

const useValidateToken = () => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const getToken = useCallback(() => {
    return localStorage.getItem("token");
  }, []);

  const validateToken = useCallback(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    let decoded: any = false;
    try {
      decoded = jwt_decode(token);
    } catch (error: any) {
      console.error("Error decoding token: ", error);
      return false;
    }

    if (decoded && Math.floor(Date.now() / 1000) <= decoded.exp) {
      return true;
    } else {
      return false;
    }
  }, []);

  useEffect(() => {
    const valid = validateToken();
    setLoggedIn(valid);

    if (valid) {
      checkIsAdmin(); // 로그인이 유효할 때만 관리자 여부 체크
    } else {
      setIsAdmin(null);
    }
  }, [validateToken, getToken()]);

  const checkIsAdmin = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${API_URL}/isAdmin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsAdmin(response.data.is_admin);
    } catch (error) {
      console.error("Error checking admin status: ", error);
    }
  };

  return { loggedIn, isAdmin };
};

export default useValidateToken;
