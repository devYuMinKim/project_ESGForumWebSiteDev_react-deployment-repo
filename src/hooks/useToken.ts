import { useState, useEffect } from "react";

const useToken = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  return token;
};

export default useToken;
