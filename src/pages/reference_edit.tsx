import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";
import QuillEditor from "../components/editor/quill-editor";
import { getPostById, updatePost } from "../services/post.service";
import { Post, SendPost } from "../types/post.interface";
import { getUserInfo } from "../services/user.service";
import { Input } from "@material-tailwind/react";

const ReferenceEditPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const { id } = useParams<{ id: string }>();

  const token = useToken();
  const navigate = useNavigate();

  const handler = {
    title: (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    content: (newContent: string) => {
      setContent(newContent);
    },
  };

  useEffect(() => {
    (async () => {
      if (!id) return;

      const response = await getPostById(id);

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
      type: "reference",
      author: authorName,
    };

    try {
      await updatePost(id, updatedPost);
      alert("수정이 완료되었습니다.");
      navigate(`/references/${id}`);
    } catch (error) {
      console.error(error);
      alert("수정에 실패하였습니다.");
    }
  }

  const handleCancel = async () => {
    if (!window.confirm("취소하시겠습니까?")) return;
    navigate(`/references/${id}`);
  };

  return (
    <div className="flex justify-center min-h-screen mt-5">
      <div className="rounded flex justify-center overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0">
        <div className="rounded overflow-hidden w-full bg-white mx-3 md:mx-0 lg:mx-0 p-4">
          {/* 제목 */}
          <div className="text-base text-gray-600">
            <Input
              label="주제"
              onChange={handler.title}
              value={title}
              required
            />
          </div>

          <hr />
          {/* 내용 */}
          <div className="text-lg p-3 h-4/6">
            <QuillEditor
              value={content}
              onChange={handler.content}
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

export default ReferenceEditPage;
