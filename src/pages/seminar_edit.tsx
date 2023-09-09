import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Seminar, SendSeminar, User } from "../types/seminars.interface";
import { updateSeminar, getSeminarById } from "../services/seminar.service";
import useToken from "../hooks/useToken";
import moment from "moment";

import { Datetimepicker, Input, initTE } from "tw-elements";
import QuillEditor from "../components/editor/quill-editor";

const InputForm = (props: {
  title: string;
  value: string;
  onChange: (data: string) => void;
}) => {
  initTE({ Input });

  return (
    <div className="relative mb-3" data-te-input-wrapper-init>
      <input
        id={props.title}
        type="text"
        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      />
      <label
        htmlFor={props.title}
        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
      >
        {props.title}
      </label>
    </div>
  );
};

const DatetimeForm = (props: {
  title: string;
  name: string;
  value: string;
  onChange: (date: string) => void;
}) => {
  initTE({ Input, Datetimepicker });

  return (
    <div
      className="relative mb-3"
      data-te-date-timepicker-init
      data-te-input-wrapper-init
      data-te-inline="true"
    >
      <input
        type="text"
        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id={props.title}
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
      <label
        htmlFor="form2"
        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
      >
        {props.title}
      </label>
    </div>
  );
};

const SeminarEditPage: React.FC = () => {
  const [seminar, setSeminar] = useState<Seminar | null>(null);
  const [subject, setSubject] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [host, setHost] = useState<string>("");
  const [supervision, setSupervision] = useState<string>("");
  const [participation, setParticipation] = useState<string>("");
  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!id) return;

      const response = await getSeminarById(id);
      console.log(response);

      if (!response) return;

      setSeminar(response);

      setSubject(response.subject || "");
      setLocation(response.location || "");
      setContent(response.content || "");
      setHost(response.host || "");
      setSupervision(response.supervision || "");
      setParticipation(response.participation || "");

      setDateStart(moment.utc(response.date_start).format("YYYY-MM-DD"));
      setDateEnd(moment.utc(response.date_end).format("YYYY-MM-DD"));
    })();
  }, [id]);

  async function handleUpdate() {
    if (!window.confirm("수정하시겠습니까?")) return;

    const updatedSeminar: SendSeminar = {
      subject: subject,
      location: location,
      content: content,
      host: host,
      supervision: supervision,
      participation: participation,
      date_start: dateStart,
      date_end: dateEnd,
    };

    try {
      await updateSeminar(id, updatedSeminar);
      alert("수정이 완료되었습니다.");
      navigate(`/seminars/${id}`);
    } catch (error) {
      console.error(error);
      alert("수정에 실패하였습니다.");
    }
  }

  const handleCancel = async () => {
    if (!window.confirm("취소하시겠습니까?")) return;
    navigate(`/seminars/${id}`);
  };

  return (
    <form id="seminarForm">
      <div className="flex justify-center min-h-screen mt-5">
        <div className="rounded flex justify-center overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0">
          <div className="rounded overflow-hidden w-full bg-white mx-3 md:mx-0 lg:mx-0 p-4">
            {/* 제목 */}
            <div className="text-base text-gray-600">
              <InputForm title="주제" value={subject} onChange={setSubject} />
            </div>
            <div className="w-full flex justify-end items-center pr-3 space-x-4">
              <div className="text-base text-gray-600">
                <InputForm title="주최" value={host} onChange={setHost} />
              </div>
              <div className="text-base text-gray-600">
                <InputForm
                  title="주관"
                  value={supervision}
                  onChange={setSupervision}
                />
              </div>
              <div className="text-base text-gray-600">
                <InputForm
                  title="참여"
                  value={participation}
                  onChange={setParticipation}
                />
              </div>
            </div>
            {/* 날짜 */}
            <div className="w-full flex justify-end items-center p-3 space-x-4">
              <div className="text-xs text-gray-600 flex gap-x-5">
                <DatetimeForm
                  title="시작 날짜"
                  name="startDateTime"
                  value={dateStart}
                  onChange={setDateStart}
                />
                <DatetimeForm
                  title="종료 날짜"
                  name="endDateTime"
                  value={dateEnd}
                  onChange={setDateEnd}
                />
              </div>
            </div>
            {/* 장소 */}
            <div className="w-full flex justify-end items-center pr-3 space-x-4">
              <div className="text-base text-gray-600">
                <InputForm
                  title="장소"
                  value={location}
                  onChange={setLocation}
                />
              </div>
            </div>

            <hr />
            {/* 내용 */}
            <div className="text-lg p-3 h-4/6">
              <QuillEditor
                value={content}
                onChange={(newContent) => setContent(newContent)}
                style={{ height: 700 }}
              />
            </div>
            <hr />
            {/* 버튼 */}
            <div className="flex justify-end items-center p-3 space-x-4">
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCancel}
              >
                취소하기
              </button>
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleUpdate}
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SeminarEditPage;
