import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";
import { Input, initTE } from "tw-elements";
import QuillEditor from "../components/editor/quill-editor";
import { getPostById, updatePost } from "../services/post.service";
import { Post, SendPost } from "../types/post.interface";
import { getUserInfo } from "../services/user.service";

const InputForm = (props: {
  title: string;
  value: string;
  onChange: (data: string) => void;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isMounted) {
      initTE({ Input });
      return () => initTE(null);
    }
    return () => setIsMounted(false);
  }, [isMounted]);

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

const NotificationEditPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const { id } = useParams<{ id: string }>();
  const token = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!id) return;

      const response = await getPostById(id);
      console.log(response);

      if (!response) return;

      setPost(response);

      setTitle(response.title || "");
      setContent(response.content || "");
    })();
  }, [id]);

  async function handleUpdate() {
    if (!window.confirm("수정하시겠습니까?")) return;

    const userInfo = await getUserInfo(token);
    const authorName = userInfo.name;

    const updatedPost: SendPost = {
      title: title,
      content: content,
      files: [],
      view: 0,
      type: "notification",
      author: authorName,
    };

    try {
      await updatePost(id, updatedPost);
      alert("수정이 완료되었습니다.");
      navigate(`/notifications/${id}`);
    } catch (error) {
      console.error(error);
      alert("수정에 실패하였습니다.");
    }
  }

  const handleCancel = async () => {
    if (!window.confirm("취소하시겠습니까?")) return;
    navigate(`/notifications/${id}`);
  };

  return (
    <form id="seminarForm">
      <div className="flex justify-center min-h-screen mt-5">
        <div className="rounded flex justify-center overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0">
          <div className="rounded overflow-hidden w-full bg-white mx-3 md:mx-0 lg:mx-0 p-4">
            {/* 제목 */}
            <div className="text-base text-gray-600">
              <InputForm title="주제" value={title} onChange={setTitle} />
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

export default NotificationEditPage;
