import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useCheckLogin = () => {
  const apiUrl = "http://127.0.0.1:8000/api";
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  const isLoggedIn = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/auth/check`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.status === 200;
    } catch (error: any) {
      return false;
    }
  }, []);

  useEffect(() => {
    const handleAuthChanged = () => {
      isLoggedIn().then((loggedIn) => setLoggedIn(loggedIn));
    };

    handleAuthChanged(); // 처음 컴포넌트가 로드될 때 로그인 상태를 확인

    window.addEventListener("auth-changed", handleAuthChanged); // 로그인 상태 변경을 감지할 이벤트 리스너 추가

    isLoggedIn().then((loggedIn) => setLoggedIn(loggedIn));

    return () => {
      window.removeEventListener("auth-changed", handleAuthChanged); // 컴포넌트가 언마운트될 때 이벤트 리스너 삭제
    };
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        const event = new CustomEvent("auth-changed");
        window.dispatchEvent(event);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        console.warn("인증 만료 오류 발생");
      } else {
        console.error(error);
      }
    }
  };

  return { handleLogout, loggedIn };
};

export default useCheckLogin;
