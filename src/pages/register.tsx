import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormInput from "../components/layout/login";

const API_URL = process.env.REACT_APP_API_URL;

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email: email,
        password: password,
        name: name,
        affiliation: affiliation,
      });

      if (response.status === 201) {
        navigate("/login");
      } else {
        setError(response.data.error);
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
            {/* FIXME: 로고 추가 후 제거 요함 <img className="mx-auto h-10 w-auto" src={logo} alt="로고" /> */}
            {/* TODO: 로고 추가 예정 */}
            <h2 className="mt-10 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900">
              ESG 실천을 위해, 이제 대학이 나서겠습니다
            </h2>
          </div>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <FormInput
                id="name"
                label="이름"
                type="text"
                autoComplete="name"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <FormInput
                id="affiliation"
                label="소속"
                type="text"
                autoComplete="affiliation"
                placeholder="소속"
                value={affiliation}
                onChange={(e) => setAffiliation(e.target.value)}
              />

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

              <FormInput
                id="passwordConfirm"
                label="비밀번호 확인"
                type="password"
                autoComplete="passwordConfirm"
                placeholder="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />

              <div>
                <button
                  type="submit"
                  className="flex w-96 justify-center rounded-md bg-lime-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                >
                  Sign up
                </button>
                {error && (
                  <p className="mt-2 text-center text-sm text-red-500">
                    {error}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
