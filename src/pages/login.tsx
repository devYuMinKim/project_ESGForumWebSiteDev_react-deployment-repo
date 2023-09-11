import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FormInput from "../components/layout/login";

const API_URL = process.env.REACT_APP_API_URL;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        const eventPromise = new Promise<void>((resolve) => {
          const listener = () => {
            window.removeEventListener("auth-changed", listener);
            resolve();
          };
          window.addEventListener("auth-changed", listener);
        });

        window.dispatchEvent(new CustomEvent("auth-changed"));
        await eventPromise;

        navigate("/");
      } else {
        setError(
          "로그인에 실패했습니다. 이메일과 비밀번호를 다시 확인해주세요."
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        setError("로그인을 할 수 없는 유저입니다. 관리자에게 문의해주세요.");
        return;
      }

      setError("로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex min-h-full items-center flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900">
              ESG 실천을 위해, 이제 대학이 나서겠습니다
            </h2>
          </div>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <FormInput
                id="email"
                label="이메일 주소"
                type="email"
                autoComplete="email"
                placeholder="@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <FormInput
                id="password"
                label="비밀번호"
                type="password"
                autoComplete="current-password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div>
                <button
                  type="submit"
                  className="flex w-96 justify-center rounded-md bg-lime-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                >
                  로그인
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              회원이 아니신가요?{" "}
              <Link
                to="/register"
                className="font-semibold leading-6 text-lime-600 hover:text-lime-500"
              >
                회원가입하기
              </Link>
            </p>
            {error && (
              <p className="mt-2 text-center text-sm text-red-500">{error}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
