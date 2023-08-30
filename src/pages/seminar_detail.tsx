import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Seminar } from "../types/seminars.interface";
import { getSeminarById } from "../services/seminar.service";

const SeminarDetailPage: React.FC = () => {
  const [seminar, setSeminar] = useState<Seminar | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      if (!id) return;

      const response = await getSeminarById(id);

      if (!response) return;

      setSeminar(response);
    })();
  }, [id]);

  if (!seminar) return <div>Loading...</div>;

  return (
    <>
      <div className="flex justify-center min-h-screen mt-5">
        <div className="rounded flex justify-center overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0">
          <div className="rounded overflow-hidden w-full bg-white mx-3 md:mx-0 lg:mx-0 p-4">
            <h2 className="text-4xl font-bold p-3">{seminar.subject}</h2>
            <div className="w-full flex justify-end items-center p-3 space-x-4">
              <p className="text-xs text-gray-600">
                {seminar.date_start} ~ {seminar.date_end}
              </p>
            </div>
            <div className="w-full flex justify-end items-center pr-3 space-x-4">
              <p className="text-base text-gray-600">{seminar.location}</p>
            </div>

            <hr />
            <p className="text-lg p-3 h-4/6">{seminar.content}</p>
            <hr />

            <p className="block text-base text-blue-500 px-e3 py-f2 flex items-center space-x-g1">
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
