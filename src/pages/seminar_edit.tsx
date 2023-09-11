import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Seminar, SendSeminar, User } from '../types/seminars.interface';
import { updateSeminar, getSeminarById } from '../services/seminar.service';
import useToken from '../hooks/useToken';
import moment from 'moment';

import QuillEditor from '../components/editor/quill-editor';
import { Input } from '@material-tailwind/react';
import DateTimePicker from 'react-datetime-picker';

import { Value } from '../types/react-datetime-picker.type';
import { getUserInfo } from '../services/user.service';

const SeminarEditPage: React.FC = () => {
  const [seminar, setSeminar] = useState<Seminar | null>(null);
  const [subject, setSubject] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [host, setHost] = useState<string>('');
  const [supervision, setSupervision] = useState<string>('');
  const [participation, setParticipation] = useState<string>('');
  const [startDateTime, setStartDateTime] = useState<Value>(new Date());
  const [endDateTime, setEndDateTime] = useState<Value>(new Date());

  const { id } = useParams<{ id: string }>();
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

  useEffect(() => {
    (async () => {
      if (!id) return;

      const response = await getSeminarById(id);
      console.log(response);

      if (!response) return;

      setSeminar(response);
      setSubject(response.subject);
      setLocation(response.location);
      setContent(response.content);
      setHost(response.host);
      setParticipation(response.participation);
      setSupervision(response.supervision);
      setStartDateTime(new Date(response.date_start));
      setEndDateTime(new Date(response.date_end));
    })();
  }, [id]);

  async function handleUpdate() {
    if (!window.confirm('수정하시겠습니까?')) return;

    const updatedSeminar: SendSeminar = {
      subject: subject,
      location: location,
      content: content,
      host: host,
      supervision: supervision,
      participation: participation,
      date_start: moment(startDateTime as Date).format('YYYY-MM-DD HH:mm:ss'),
      date_end: moment(endDateTime as Date).format('YYYY-MM-DD HH:mm:ss'),
    };

    try {
      await updateSeminar(id, updatedSeminar);
      alert('수정이 완료되었습니다.');
      navigate(`/seminars/${id}`);
    } catch (error) {
      console.error(error);
      alert('수정에 실패하였습니다.');
    }
  }

  const handleCancel = async () => {
    if (!window.confirm('취소하시겠습니까?')) return;
    navigate(`/seminars/${id}`);
  };

  return (
    <div className="flex justify-center min-h-screen mt-5">
      <div className="rounded flex justify-center overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0">
        <div className="rounded overflow-hidden w-full bg-white mx-3 md:mx-0 lg:mx-0 p-4 space-y-3">
          {/* 제목 */}
          <div className="w-full flex justify-start items-center pr-3">
            <div className="w-full">
              <Input label="주제" onChange={handler.subject} value={subject} required />
            </div>
          </div>

          <div className="grid grid-cols-4 justify-start items-center pr-3 space-x-3">
            <div className="col-span-1 text-base text-gray-600">
              <Input label="주최" onChange={handler.host} value={host} required />
            </div>
            <div className="col-span-1 text-base text-gray-600">
              <Input label="주관" onChange={handler.supervision} value={supervision} required />
            </div>
            <div className="col-span-1 text-base text-gray-600">
              <Input label="참여" onChange={handler.participation} value={participation} required />
            </div>
            <div className="col-span-1 text-base text-gray-600">
              <Input label="장소" onChange={handler.location} value={location} required />
            </div>
          </div>
          {/* 날짜 */}
          <div className="w-full flex justify-end items-center p-3 space-x-4">
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
          {/* 장소 */}
          <div className="w-full flex justify-end items-center pr-3 space-x-4">
            <div className="text-base text-gray-600">
              {/* <InputForm title="장소" value={location} onChange={setLocation} /> */}
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
  );
};

export default SeminarEditPage;
