import { useState, useEffect, useCallback } from "react";
import jwt_decode from "jwt-decode";

const useValidateToken = () => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

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
    setLoggedIn(validateToken());
  }, [validateToken, localStorage.getItem("token")]);

  return { loggedIn };
};

export default useValidateToken;
