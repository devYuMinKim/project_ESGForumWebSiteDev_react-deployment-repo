import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getPosts,
  getOngoingPosts,
  getPastPosts,
  searchPosts,
} from "../services/post.service";
import { Post } from "../types/post.interface";
import Pagination from "rc-pagination";
import Select from "react-select";

import { ReactComponent as WriteIcon } from "../assets/icons/write.svg";
import { User } from "../types/seminars.interface";
import useToken from "../hooks/useToken";
import { getCurrentUser } from "../services/user.service";

const options = [
  { value: "subject", label: "주제" },
  { value: "host", label: "주관" },
];

const PostCard = (props: { post: Post }) => {
  const { post } = props;

  return (
    <tr className="py-10 text-m bg-gray-100 hover:bg-gray-200 font-medium">
      <td className="px-4 py-4">
        <Link to={`/references/${post.id}`}>{post.title}</Link>
      </td>
      <td className="px-4 py-4">
        <Link to={`/references/${post.id}`}>{post.author}</Link>
      </td>
      <td className="px-4 py-4">
        <Link to={`/references/${post.id}`}>{post.created_at}</Link>
      </td>
    </tr>
  );
};

const ReferencePage = () => {
  const [post, setPost] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [type, setType] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState("subject");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const token = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!token) return;

      try {
        const user = await getCurrentUser(token);
        console.log(user);
        setCurrentUser(user);
      } catch (error) {
        setCurrentUser(null);
      }
    })();
  }, [token]);

  useEffect(() => {
    (async () => {
      let response;
      if (type === "all") {
        if (searchKeyword) {
          response =
            searchType === "subject"
              ? await searchPosts(searchKeyword)
              : await searchPosts(undefined, searchKeyword);
        } else {
          response = await getPosts(currentPage);
        }
      } else if (type === "ongoing") {
        response = await getOngoingPosts(
          currentPage,
          searchType === "subject" ? searchKeyword : undefined,
          searchType === "host" ? searchKeyword : undefined
        );
      } else if (type === "past") {
        response = await getPastPosts(
          currentPage,
          searchType === "subject" ? searchKeyword : undefined,
          searchType === "host" ? searchKeyword : undefined
        );
      }

      if (!response) return;

      setPost(response.data);
      setTotalItems(response.total);
    })();
  }, [currentPage, type, searchKeyword, searchType]);

  return (
    <>
      <div>
        <div className="items-center w-8/12 px-4 py-4 mx-auto my-10 bg-white rounded-lg shadow-md sm:w-8/12">
          <div className="container mx-auto">
            {/* 주제 */}
            <div className="flex justify-between w-full px-4 py-2 items-center">
              <div className="text-xl font-bold">자료실</div>
              {currentUser?.is_admin && (
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => {
                    navigate("/references/post");
                  }}
                >
                  {/* TODO: Icon here */}
                  <WriteIcon />
                  <span style={{ marginLeft: "14px" }}>작성하기</span>
                </button>
              )}
            </div>
            {/* 종류 */}
            <ul className="flex flex-row space-x-2 sm:space-x-6 md:space-x-12 mt-4 mx-4 items-center border-b border-gray-300 overflow-auto text-sm">
              <li className={type === "all" ? "text-blue-500 font-bold" : ""}>
                <button onClick={() => setType("all")}>전체</button>
                <div className="h-1 bg-blue-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
              </li>
            </ul>
            {/* 필터 기능 */}
            <div className="flex flex-col sm:flex-row space-y-2 gap-4 sm:space-y-0 w-full px-4 mb-2 mt-4 items-center">
              <div className="flex w-full sm:w-3/5 items-center rounded-lg">
                <div className="flex w-1/6">
                  {/* FIXME: <SearchIcon /> */}
                  <Select
                    value={options.find(
                      (option) => option.value === searchType
                    )}
                    onChange={(selectedOption) => {
                      if (selectedOption !== null)
                        setSearchType(selectedOption.value);
                    }}
                    options={options}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        width: "100px",
                      }),
                    }}
                  />
                </div>
                <div className="flex w-5/6">
                  <input
                    className="w-full bg-gray-100 outline-none border-transparent focus:border-transparent focus:ring-0 rounded-lg text-sm"
                    type="text"
                    placeholder="Search a seminar..."
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    value={searchKeyword}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full table-auto">
                {/* 테이블 헤더 (attributes) */}
                <thead className="">
                  <tr className="text-m font-semibold text-center border-b-2 border-blue-500 uppercase">
                    <th className="px-4 py-3 w-7/12">주제</th>
                    <th className="px-4 py-3 w-2/12">작성자</th>
                    <th className="px-4 py-3 w-2/12">생성일</th>
                  </tr>
                </thead>
                {/* 테이블 바디 (데이터) */}
                <tbody className="text-sm font-normal text-gray-700 text-center">
                  {post &&
                    post.map((post) => {
                      if (post.type === "reference") {
                        return <PostCard key={post.id} post={post} />;
                      } else {
                        return null;
                      }
                    })}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col items-center w-full px-4 py-4 text-sm text-gray-500 justify-center mx-auto">
              <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={10}
                onChange={(page) => setCurrentPage(page)}
                style={{ display: "flex", justifyContent: "center" }}
                itemRender={(current, type, element) => {
                  if (type === "page") {
                    if (currentPage <= 3 && current > Math.min(5, totalItems)) {
                      return null;
                    }

                    if (
                      currentPage > 3 &&
                      currentPage <= totalItems - 3 &&
                      (current < currentPage - 2 || current > currentPage + 2)
                    ) {
                      return null;
                    }

                    if (
                      currentPage > totalItems - 3 &&
                      current < Math.max(totalItems - 4, 1)
                    ) {
                      return null;
                    }

                    return (
                      <div
                        onClick={() => setCurrentPage(current)}
                        className={`inline-block px-3 py-1 border border-blue-500 cursor-pointer rounded-full text-sm ${
                          currentPage === current
                            ? "text-white bg-blue-500"
                            : "text-blue-500 hover:bg-blue-500 hover:text-white"
                        }`}
                      >
                        {current}
                      </div>
                    );
                  }
                  return element;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferencePage;
