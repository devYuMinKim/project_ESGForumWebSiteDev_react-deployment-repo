import { useState, useEffect } from "react";

const useToken = () => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return token;
};

export default useToken;
