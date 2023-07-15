import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/layout/login/FormInput";
import logo from "../assets/odego_logo.png";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: email,
          password: password,
        }),
      });

      if (response.status === 200) {
        navigate("/");
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

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
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              회원이 아니신가요?{" "}
              <Link
                to="/signup"
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
