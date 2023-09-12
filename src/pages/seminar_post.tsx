import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SendSeminar, User } from "../types/seminars.interface";
import { createSeminar } from "../services/seminar.service";
import { getCurrentUser } from "../services/user.service";
import useToken from "../hooks/useToken";
import moment from "moment";
import { Input } from "@material-tailwind/react";
import DateTimePicker from "react-datetime-picker";
import { Value } from "../types/react-datetime-picker.type";
import QuillEditor from "../components/editor/quill-editor";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const SeminarPostPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [subject, setSubject] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [host, setHost] = useState<string>("");
  const [supervision, setSupervision] = useState<string>("");
  const [participation, setParticipation] = useState<string>("");
  const [startDateTime, setStartDateTime] = useState<Value>(new Date());
  const [endDateTime, setEndDateTime] = useState<Value>(new Date());

  const token = useToken();
  const navigate = useNavigate();

  const handler = {
    subject: (e: React.ChangeEvent<HTMLInputElement>) => {
      setSubject(e.target.value);
    },
    location: (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocation(e.target.value);
    },
    content: (e: React.ChangeEvent<HTMLInputElement>) => {
      setContent(e.target.value);
    },
    host: (e: React.ChangeEvent<HTMLInputElement>) => {
      setHost(e.target.value);
    },
    supervision: (e: React.ChangeEvent<HTMLInputElement>) => {
      setSupervision(e.target.value);
    },
    participation: (e: React.ChangeEvent<HTMLInputElement>) => {
      setParticipation(e.target.value);
    },
  };

  const handleSend = async () => {
    if (!window.confirm("작성하시겠습니까?")) return;

    const seminar: SendSeminar = {
      subject: subject,
      date_start: moment(startDateTime as Date).format("YYYY-MM-DD HH:mm:ss"),
      date_end: moment(endDateTime as Date).format("YYYY-MM-DD HH:mm:ss"),
      location: location,
      content: content,
      host: host,
      participation: participation,
      supervision: supervision,
    };

    try {
      await createSeminar(seminar);
      alert("작성이 완료되었습니다.");
      navigate("/seminars");
    } catch (error) {
      console.error(error);
      alert("작성에 실패하였습니다.");
    }
  };

  const handleDraft = (msg: string) => {
    if (!window.confirm(msg)) return;

    const seminar: SendSeminar = {
      subject: subject,
      date_start: startDateTime
        ? moment(startDateTime as Date).format("YYYY-MM-DD HH:mm:ss")
        : moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      date_end: moment(endDateTime as Date).format("YYYY-MM-DD HH:mm:ss"),
      location: location,
      content: content,
      host: host,
      participation: participation,
      supervision: supervision,
    };

    try {
      localStorage.setItem("seminar", JSON.stringify(seminar));
      alert("임시저장이 완료되었습니다.");
      navigate("/seminars");
    } catch (error) {
      console.error(error);
      alert("임시저장에 실패하였습니다.");
    }
  };

  const handleBackDraft = () => {
    const draft = localStorage.getItem("seminar") as string;

    if (draft && !window.confirm("임시저장된 세미나가 있습니다. 불러오시겠습니까?")) {
      return localStorage.removeItem("seminar");
    }

    const seminar = JSON.parse(draft);

    setSubject(seminar?.subject || "");
    setLocation(seminar?.location || "");
    setContent(seminar?.content || "");
    setHost(seminar?.host || "");
    setParticipation(seminar?.participation || "");
    setSupervision(seminar?.supervision || "");
  };

  useEffect(() => {
    handleBackDraft();
  }, []);

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

  return (
    <div className="flex justify-center min-h-screen mt-5">
      <div className="rounded flex justify-center overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0">
        <div className="rounded overflow-hidden w-full bg-white mx-3 md:mx-0 lg:mx-0 p-4 space-y-3">
          {/* 이전 페이지로 돌아가기 버튼 */}
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              handleDraft("작성중인 세미나가 있습니다. 뒤로가기 전 임시저장을 하시겠습니까?");
              navigate("/seminars");
            }}
          >
            뒤로가기
          </button>
          {/* 제목 */}
          <div className="w-full flex justify-start items-center pr-3">
            <div className="w-full">
              <Input label="주제" onChange={handler.subject} value={subject} required />
            </div>
          </div>

          <div className="flex flex-wrap justify-start items-center pr-3 gap-3">
            <div className="text-base text-gray-600">
              <Input label="주최" onChange={handler.host} value={host} required />
            </div>
            <div className="text-base text-gray-600">
              <Input label="주관" onChange={handler.supervision} value={supervision} required />
            </div>
            <div className="text-base text-gray-600">
              <Input label="참여" onChange={handler.participation} value={participation} required />
            </div>
            <div className="text-base text-gray-600">
              <Input label="장소" onChange={handler.location} value={location} required />
            </div>
          </div>
          {/* 날짜 */}
          <div className="w-full flex justify-start items-center pr-3 space-x-4">
            <div className="flex justify-start flex-col gap-3 pl-4">
              <div className="text-base text-gray-600">
                <span className="pr-3">시작 날짜</span>
                <DateTimePicker onChange={setStartDateTime} value={startDateTime} required />
              </div>
              <div className="text-base text-gray-600">
                <span className="pr-3">종료 날짜</span>
                <DateTimePicker onChange={setEndDateTime} value={endDateTime} required />
              </div>
            </div>
          </div>

          <hr />
          {/* 내용 */}
          <div className="text-lg p-3 h-4/6">
            <QuillEditor onChange={setContent} style={{ height: 700 }} value={content} />
          </div>
          <hr />
          {/* 버튼 */}
          {/* 작성버튼과 임시저장버튼(다른 색)*/}
          <div className="flex justify-end items-center p-3 space-x-4">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSend}
            >
              작성하기
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDraft("임시저장 하시겠습니까?")}
            >
              임시저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeminarPostPage;
