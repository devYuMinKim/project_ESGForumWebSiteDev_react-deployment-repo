import React, { useEffect, useState } from "react";
import {
  createSeminar,
  getAllSeminars,
  getSeminars,
  getSeminarById,
  updateSeminar,
} from "../services/seminar.service";
import { Seminar, SendSeminar } from "../types/seminars.interface";
import Pagination from "rc-pagination";

import { ReactComponent as SearchIcon } from "../assets/icons/seminars-search.svg";

const SeminarCard = (props: { seminar: Seminar }) => {
  const { seminar } = props;

  return (
    <tr className="py-10 text-m bg-gray-100 hover:bg-gray-200 font-medium">
      <td className="px-4 py-4">{seminar.subject}</td>
      <td className="px-4 py-4">{seminar.host}</td>
      <td className="items-center px-4 py-4">
        <div className="flex flex-col">
          <div className="font-medium text-red-500">{seminar.date_start}</div>~
          <div className="text-xs text-gray-500">{seminar.date_end}</div>
        </div>
      </td>
      <td className="px-4 py-4">{seminar.created_at}</td>
    </tr>
  );
};

// TODO: 아직 작성 중 (written on 2023/08/24 3:28 PM)
const SeminarPage = () => {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await getAllSeminars();
      setSeminars(response.data);
      setTotalItems(response.total);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getSeminars(currentPage);
      setSeminars(response.data);
      setTotalItems(response.total);
    })();
  }, [currentPage]);

  return (
    <>
      <div>
        <div className="items-center w-full px-4 py-4 mx-auto my-10 bg-white rounded-lg shadow-md sm:w-11/12">
          <div className="container mx-auto">
            {/* 주제 */}
            <div className="flex justify-between w-full px-4 py-2 items-center">
              <div className="text-xl font-bold">세미나</div>
            </div>
            {/* 종류 */}
            <ul className="flex flex-row space-x-2 sm:space-x-6 md:space-x-12 mt-4 mx-4 items-center border-b border-gray-300 overflow-auto text-sm">
              <li className=" text-blue-500 group">
                <a href="#">전체</a>
                <div className="h-1 bg-blue-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
              </li>
              <li className="group">
                <a href="#">진행중인 세미나</a>
                <div className="h-1 bg-blue-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
              </li>
              <li className="group">
                <a href="#">지난 세미나</a>
                <div className="h-1 bg-blue-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
              </li>
            </ul>
            {/* 필터 기능 */}
            <div className="flex flex-col sm:flex-row space-y-2 gap-4 sm:space-y-0 w-full px-4 mb-2 mt-4 items-center">
              <div className="flex bg-gray-100 w-full sm:w-2/5 items-center rounded-lg">
                {/* FIXME: <SearchIcon /> */}
                {/* _input 검색 */}
                <input
                  className="w-full bg-gray-100 outline-none border-transparent focus:border-transparent focus:ring-0 rounded-lg text-sm"
                  type="text"
                  placeholder="Search a product..."
                />
              </div>
              {/* 필터기능 */}
              <div className="flex-row space-x-2 items-center ">
                <select className="border border-gray-300 rounded-md text-gray-600 px-2 pl-2 pr-8 bg-white hover:border-gray-400 focus:outline-none text-xs focus:ring-0">
                  <option>Filter by</option>
                  <option></option>
                  <option></option>
                </select>
                <select className="border border-gray-300 rounded-md text-gray-600 px-2 pl-2 pr-8 bg-white hover:border-gray-400 focus:outline-none text-xs focus:ring-0">
                  <option>Short by</option>
                  <option></option>
                  <option></option>
                </select>
                <button className="border border-gray-300 rounded-md text-gray-600 px-3 py-[9px] bg-white hover:border-gray-400 focus:outline-none text-xs focus:ring-0">
                  {/* FIXME: <SearchIcon /> */}
                </button>
              </div>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full table-auto">
                {/* 테이블 헤더 (attributes) */}
                <thead className="">
                  <tr className="text-m font-semibold text-center border-b-2 border-blue-500 uppercase">
                    <th className="px-4 py-3 w-5/12">주제</th>
                    <th className="px-4 py-3 w-3/12">주관</th>
                    <th className="px-4 py-3">날짜</th>
                    <th className="px-4 py-3">생성일</th>
                  </tr>
                </thead>
                {/* 테이블 바디 (데이터) */}
                <tbody className="text-sm font-normal text-gray-700 text-center">
                  {seminars.map((seminar) => (
                    <SeminarCard seminar={seminar} />
                  ))}
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

export default SeminarPage;
