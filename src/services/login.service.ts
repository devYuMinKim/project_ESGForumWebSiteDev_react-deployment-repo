import { useEffect } from "react";

export const LogoutCleanup: React.FC = () => {
  const handleBeforeUnload = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
};

export default LogoutCleanup;
