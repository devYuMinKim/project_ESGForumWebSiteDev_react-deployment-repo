import React from "react";
import logo from "../assets/odego_logo.png";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex min-h-full items-center flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src={logo} alt="로고" />
            <h2 className="mt-10 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900">
              ESG 실천을 위해, 이제 대학이 나서겠습니다
            </h2>
          </div>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div>
              <Link
                to="/login"
                className="flex w-96 justify-center rounded-md bg-lime-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
