import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/seminars.interface";
import { getCurrentUser } from "../services/user.service";
import useToken from "../hooks/useToken";
import { Input } from "@material-tailwind/react";
import QuillEditor from "../components/editor/quill-editor";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { createPost } from "../services/post.service";
import { SendPost } from "../types/post.interface";

const NotificationPostPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const token = useToken();
  const navigate = useNavigate();

  const handler = {
    title: (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    content: (e: React.ChangeEvent<HTMLInputElement>) => {
      setContent(e.target.value);
    },
  };

  const handleSend = async () => {
    if (!window.confirm("작성하시겠습니까?")) return;

    const notification: SendPost = {
      author: author,
      content: content,
      title: title,
      type: "notification",
      view: 0,
    };

    try {
      //   await createSeminar();
      await createPost(notification);
      alert("작성이 완료되었습니다.");
      navigate("/notifications");
    } catch (error) {
      console.error(error);
      alert("작성에 실패하였습니다.");
    }
  };

  const handleDraft = (msg: string) => {
    if (!window.confirm(msg)) return;

    const notification: SendPost = {
      view: 0, // FIXME: it must be implement
      title: title,
      author: author,
      content: content,
      type: "notification",
    };

    try {
      localStorage.setItem("notification", JSON.stringify(notification));
      alert("임시저장이 완료되었습니다.");
      navigate("/notifications");
    } catch (error) {
      console.error(error);
      alert("임시저장에 실패하였습니다.");
    }
  };

  const handleBackDraft = () => {
    const draft = localStorage.getItem("notification") as string;

    if (
      draft &&
      !window.confirm("임시저장된 내용이 있습니다. 불러오시겠습니까?")
    ) {
      return localStorage.removeItem("notification");
    }

    const notification = JSON.parse(draft);

    setTitle(notification?.title || "");
    setContent(notification?.content || "");
    setAuthor(notification?.author || "");
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
              handleDraft(
                "작성중인 내용이 있습니다. 뒤로가기 전 임시저장을 하시겠습니까?"
              );
              navigate("/notifications");
            }}
          >
            뒤로가기
          </button>
          {/* 제목 */}
          <div className="w-full flex justify-start items-center pr-3">
            <div className="w-full">
              <Input
                label="제목"
                onChange={handler.title}
                value={title}
                required
              />
            </div>
          </div>

          <hr />
          {/* 내용 */}
          <div className="text-lg p-3 h-4/6">
            <QuillEditor
              onChange={setContent}
              style={{ height: 700 }}
              value={content}
            />
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

export default NotificationPostPage;
