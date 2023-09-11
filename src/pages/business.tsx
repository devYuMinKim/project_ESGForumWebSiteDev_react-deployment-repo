import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/layout/card";
import { ReactComponent as Cowork } from "../assets/icons/business-cowork.svg";
import { ReactComponent as Education } from "../assets/icons/business-education.svg";
import { ReactComponent as Management } from "../assets/icons/business-management.svg";
import { ReactComponent as Practice } from "../assets/icons/business-practice.svg";
import { ReactComponent as Research } from "../assets/icons/business-research.svg";
import { ReactComponent as Support } from "../assets/icons/business-support.svg";

interface BusinessData {
  kind: string;
  content: string;
}

const Business: React.FC = () => {
  const apiUrl = "http://127.0.0.1:8000/api";
  const [businessData, setBusinessData] = useState<BusinessData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${apiUrl}/business`);
      setBusinessData(response.data);
    };

    fetchData();
  }, []);

  const icons = [
    /**
     * 1. ESG 연구
     */
    <Research />,
    /**
     * 2. ESG 교육
     */
    <Education />,
    /**
     * 3. ESG 실천
     */
    <Practice />,
    /**
     * 4. ESG 대학경영 사례
     */
    <Management />,
    /**
     * 5. ESG 활동 지원
     */
    <Support />,
    /**
     * 6. ESG 대외협력
     */
    <Cowork />,
  ];

  const bgColors = [
    "bg-red-500", // 1. ESG 연구
    "bg-orange-500", // 2. ESG 교육
    "bg-yellow-500", // 3. ESG 실천
    "bg-lime-500", // 4. ESG 대학경영 사례
    "bg-blue-500", // 5. ESG 활동 지원
    "bg-indigo-500", // 6. ESG 대외협력
  ];

  return (
    <>
      <div className="px-3 md:lg:xl:px-40 border-t border-b py-20 bg-opacity-10">
        <div className="grid grid-cols-1 md:lg:xl:grid-cols-3 group bg-white shadow-xl shadow-neutral-100 border">
          {businessData.map((data, index) => (
            <Card
              key={index}
              bgColor={bgColors[index % 6]}
              icon={icons[index % 6]}
              title={data.kind}
              description={data.content}
              border={index % 3 !== 2}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Business;
