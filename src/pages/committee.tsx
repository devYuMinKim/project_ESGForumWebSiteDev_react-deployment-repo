import React, { useState, useEffect } from "react";
import axios from "axios";
import CommitteeTableRow from "../components/layout/table";
import { CommitteeData } from "../types/committee.interface";

const API_URL = process.env.REACT_APP_API_URL;

const Committee: React.FC = () => {
  const [committees, setCommittees] = useState<CommitteeData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${API_URL}/getMember`);
      setCommittees(response.data);
    };

    fetchData();
  }, []);

  return (
    <section className="antialiased mt-10	text-gray-600 px-4">
      <div className="flex flex-col justify-center">
        {committees.map((committee) => (
          <div
            key={committee.id}
            className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 mb-5"
          >
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">{committee.name}</h2>
              <p className="text-sm">{committee.explanation}</p>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">이름</div>
                      </th>
                      <th className="p-2 whitespace-nowrap w-6/12">
                        <div className="font-semibold text-left">소속</div>
                      </th>
                      <th className="p-2 whitespace-nowrap w-4/12">
                        <div className="font-semibold text-left">이메일</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">비고</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {committee.members &&
                      committee.members.map((member) => (
                        <CommitteeTableRow key={member.id} member={member} />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Committee;
