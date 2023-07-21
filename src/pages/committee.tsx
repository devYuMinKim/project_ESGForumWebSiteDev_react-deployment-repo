import React, { useState, useEffect } from "react";
import axios from "axios";
import CommitteeTableRow from "../components/layout/table";

interface CommitteeMember {
  id: number;
  name: string;
  affiliation: string;
  note: string;
  pivot: {
    cId: number;
    id2: number;
    note: string;
  };
}

interface CommitteeData {
  id: number;
  name: string;
  explanation: string;
  members: CommitteeMember[];
}

const Committee: React.FC = () => {
  const apiUrl = "http://127.0.0.1:8000/api";
  const [committees, setCommittees] = useState<CommitteeData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${apiUrl}/committees`);
      setCommittees(response.data);
    };

    fetchData();
  }, []);

  return (
    <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
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
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">소속</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">비고</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {committee.members.map((member) => (
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
