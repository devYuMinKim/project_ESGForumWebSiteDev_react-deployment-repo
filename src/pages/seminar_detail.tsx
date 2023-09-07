import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Seminar, User } from "../types/seminars.interface";
import {
  deleteSeminar,
  getCurrentUser,
  getSeminarById,
} from "../services/seminar.service";
import useToken from "../hooks/useToken";

const SeminarDetailPage: React.FC = () => {
  const [seminar, setSeminar] = useState<Seminar | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { id } = useParams<{ id: string }>();

  const token = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!token) return;

      try {
        const user = await getCurrentUser(token);
        setCurrentUser(user);
      } catch (error) {
        setCurrentUser(null);
      }
    })();
  }, [token]);

  useEffect(() => {
    (async () => {
      if (!id) return;

      const response = await getSeminarById(id);

      if (!response) return;

      setSeminar(response);
    })();
  }, [id]);

  if (!seminar) return <div>Loading...</div>;

  async function handleDelete() {
    try {
      await deleteSeminar(id);
      alert("게시글이 삭제되었습니다.");
      navigate("/seminars");
    } catch (error) {
      alert("Failed to delete the seminar.");
    }
  }

  return (
    <>
      <div className="flex justify-center min-h-screen mt-5">
        <div className="rounded flex justify-center overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0">
          <div className="rounded overflow-hidden w-full bg-white mx-3 md:mx-0 lg:mx-0 p-4">
            {/* 제목 */}
            <h2 className="text-4xl font-bold p-3">{seminar.subject}</h2>
            {/* 날짜 */}
            <div className="w-full flex justify-end items-center p-3 space-x-4">
              <p className="text-xs text-gray-600">
                {seminar.date_start} ~ {seminar.date_end}
              </p>
            </div>
            {/* 지역 */}
            <div className="w-full flex justify-end items-center pr-3 space-x-4">
              <p className="text-base text-gray-600">{seminar.location}</p>
            </div>

            <hr />
            {/* 내용 */}
            <p className="text-lg p-3 h-4/6">{seminar.content}</p>
            {/* 수정, 삭제 버튼 */}
            {currentUser && (
              <div className="flex justify-end mb-2">
                <button
                  type="button"
                  className="py-2 px-4 bg-teal-500 hover:bg-teal-600 focus:ring-teal-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg mr-2"
                >
                  수정
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="py-2 px-4 bg-red-500 hover:bg-red-600 focus:ring-red-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                >
                  삭제
                </button>
              </div>
            )}

            <hr />

            <p className="block text-base text-blue-500 px-e3 py-f2 flex items-center space-x-g1 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                />
              </svg>
              첨부파일
            </p>
            {/* TODO: 첨부파일 기능 정상 동작하는지 확인 요함 */}
            <div className="w-full flex items-center pl-3 space-x-4">
              {seminar.files &&
                seminar.files.map((file, index) => (
                  <a key={index} href={file.url} download>{`File ${
                    index + 1
                  }`}</a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeminarDetailPage;
