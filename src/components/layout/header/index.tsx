import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useValidateToken from "../../../hooks/useValidateToken";
import useRefreshAccessToken from "../../../hooks/useRefreshToken";
import { ReactComponent as ESGLogo } from "../../../assets/icons/esg-logo.svg";

const Header: React.FC = () => {
  const { loggedIn } = useValidateToken();
  const { loading } = useRefreshAccessToken();
  const navigate = useNavigate();
  const [authChanged, setAuthChanged] = useState(false);

  useEffect(() => {
    const handleAuthChanged = () => {
      setAuthChanged(!authChanged);
    };

    window.addEventListener("auth-changed", handleAuthChanged);

    return () => {
      window.removeEventListener("auth-changed", handleAuthChanged);
    };
  }, [authChanged]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    const event = new CustomEvent("auth-changed");
    window.dispatchEvent(event);
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="w-full mt-5 text-gray-700 bg-white border-t border-gray-100 shadow-sm body-font">
      <div className="container flex flex-col items-start justify-between p-4 mx-auto md:flex-row">
        <NavLink
          to="/"
          className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0"
        >
          <ESGLogo />
        </NavLink>

        <nav className="flex flex-wrap items-center justify-center pl-24 text-base md:ml-auto md:mr-auto">
          <NavLink
            to="/aboutus"
            className={({ isActive }) =>
              isActive
                ? "mr-10 font-bold text-teal-500"
                : "mr-10 font-medium hover:text-gray-900"
            }
          >
            포럼소개
          </NavLink>
          <NavLink
            to="/business"
            className={({ isActive }) =>
              isActive
                ? "mr-10 font-bold text-teal-500"
                : "mr-10 font-medium hover:text-gray-900"
            }
          >
            주요사업
          </NavLink>
          <NavLink
            to="/seminars"
            className={({ isActive }) =>
              isActive
                ? "mr-10 font-bold text-teal-500"
                : "mr-10 font-medium hover:text-gray-900"
            }
          >
            세미나
          </NavLink>
          <NavLink
            to="/references"
            className={({ isActive }) =>
              isActive
                ? "mr-10 font-bold text-teal-500"
                : "mr-10 font-medium hover:text-gray-900"
            }
          >
            자료실
          </NavLink>
          <NavLink
            to="/committee"
            className={({ isActive }) =>
              isActive
                ? "mr-10 font-bold text-teal-500"
                : "mr-10 font-medium hover:text-gray-900"
            }
          >
            회원안내
          </NavLink>
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              isActive
                ? "mr-10 font-bold text-teal-500"
                : "mr-10 font-medium hover:text-gray-900"
            }
          >
            알림마당
          </NavLink>
        </nav>
        <div className="items-center h-full">
          {loggedIn === null ? (
            <> </>
          ) : loggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease"
            >
              로그아웃
            </button>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease"
            >
              로그인
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
