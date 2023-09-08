import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Seminar, SendSeminar, User } from '../types/seminars.interface';
import {
  createSeminar,
  deleteSeminar,
  getCurrentUser,
  getSeminarById,
} from '../services/seminar.service';
import useToken from '../hooks/useToken';
import moment from 'moment';

// import { Datetimepicker, Input, initTE } from 'tw-elements';
import QuillEditor from '../components/editor/quill-editor';

const InputForm = (props: { title: string; onChange: (data: string) => void }) => {
  useEffect(() => {
    // initTE({ Input });
  });
  return (
    <div className="relative mb-3" data-te-input-wrapper-init>
      <input
        id={props.title}
        type="text"
        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
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

const DatetimeForm = (props: { title: string; name: string }) => {
  useEffect(() => {
    // initTE({ Input, Datetimepicker });
  });
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

interface SeminarFormElement extends HTMLFormElement {
  elements: Elements;
}

interface Elements extends HTMLFormControlsCollection {
  startDateTime: HTMLInputElement;
  endDateTime: HTMLInputElement;
}

//
const SeminarPostPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [title, setTitle] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [host, setHost] = useState<string>('');
  const [supervision, setSupervision] = useState<string>('');
  const [participation, setParticipation] = useState<string>('');

  const form = document.getElementById('seminarForm') as SeminarFormElement;

  const token = useToken();
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!window.confirm('작성하시겠습니까?')) return;

    // FIXME: tw-elements 에서 options으로 datetime format을 지정할 수 있도록 수정해야 함. (현재는 moment를 사용해서 format을 변경함.) (written on 2023/09/08 12:44 PM)
    const seminar: SendSeminar = {
      subject: title,
      date_start:
        form.elements.startDateTime.value &&
        moment(form.elements.startDateTime.value, 'DD/MM/YYYY, h:mm A').format(
          'YYYY-MM-DD HH:mm:ss'
        ),
      date_end:
        form.elements.endDateTime.value &&
        moment(form.elements.endDateTime.value, 'DD/MM/YYYY, h:mm A').format('YYYY-MM-DD HH:mm:ss'),
      location: location,
      content: content,
      host: host,
      participation: participation,
      supervision: supervision,
    };

    try {
      await createSeminar(seminar);
      alert('작성이 완료되었습니다.');
      navigate('/seminars');
    } catch (error) {
      console.error(error);
      alert('작성에 실패하였습니다.');
    }
  };

  const handleDraft = async () => { };

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
    <form id="seminarForm">
      <div className="flex justify-center min-h-screen mt-5">
        <div className="rounded flex justify-center overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0">
          <div className="rounded overflow-hidden w-full bg-white mx-3 md:mx-0 lg:mx-0 p-4">
            {/* 제목 */}
            <div className="text-base text-gray-600">
              <InputForm title="주제" onChange={setTitle} />
            </div>
            <div className="w-full flex justify-end items-center pr-3 space-x-4">
              <div className="text-base text-gray-600">
                <InputForm title="주최" onChange={setHost} />
              </div>
              <div className="text-base text-gray-600">
                <InputForm title="주관" onChange={setSupervision} />
              </div>
              <div className="text-base text-gray-600">
                <InputForm title="참여" onChange={setParticipation} />
              </div>
            </div>
            {/* 날짜 */}
            <div className="w-full flex justify-end items-center p-3 space-x-4">
              <div className="text-xs text-gray-600 flex gap-x-5">
                <DatetimeForm title="시작 날짜" name="startDateTime" />
                <DatetimeForm title="종료 날짜" name="endDateTime" />
              </div>
            </div>
            {/* 장소 */}
            <div className="w-full flex justify-end items-center pr-3 space-x-4">
              <div className="text-base text-gray-600">
                <InputForm title="장소" onChange={setLocation} />
              </div>
            </div>

            <hr />
            {/* 내용 */}
            <div className="text-lg p-3 h-4/6">
              <QuillEditor onChange={setContent} style={{ height: 700 }} />
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
                onClick={handleDraft}
              >
                임시저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SeminarPostPage;
