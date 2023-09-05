import React, { useEffect, useState } from "react";
import { Typography, Card, CardHeader, CardBody } from "@material-tailwind/react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import TableHead from "../table/tableHead";
import TBodyCommittee from "../../widget/cards/tableBodyCommittee";
import { CommitteeData } from "../../../types/admin.interface";
import authenticatedAxios from "../../../services/request.service";
import Spinner from "./spinner";
import { useNavigate } from "react-router-dom";
import AddCommitteeModal from "../../widget/cards/addCommitteeModal";

interface CommitteeTableSectionProps {
  committeeCount: number
  setCommitteeCount: React.Dispatch<React.SetStateAction<number>>;
}

const CommitteeTableSection: React.FC<CommitteeTableSectionProps> = ({
  committeeCount,
  setCommitteeCount
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const [committees, setCommittees] = useState<CommitteeData[]>([]);
  const [committe, setCommitte] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    authenticatedAxios.get("/committees")
      .then((res) => {
        setReady(true);
        setCommittees(res.data);
        setCommitteeCount(res.data.length);
      })
      .catch(() => {
        window.alert("데이터를 불러올 수 없습니다");
        navigate("/");
      });
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await authenticatedAxios.post<CommitteeData>(`/committees`, {
        name: committe,
        explanation,
      });

      if (response.status === 201) {
        const newCommittees = response.data;
        window.alert("위원회 생성 완료");
        setCommitte("");
        setExplanation("");
        setCommitteeCount(++committeeCount);
        setShowModal(false);
        setCommittees([...committees, newCommittees]);
      }
    }
    catch (err) {
      setError("오류가 발생했습니다. 다시 시도하세요.");
    }
  };

  return (
    <div className="relative">
      <Spinner flag={ready} />
      <div className={`${ready ? "" : "opacity-0"} transition-opacity`}>

        <Card className="overflow-hidden border-2 border-slate-100 rounded-lg">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div className="relative">
              <Typography variant="h6" color="blue-gray" className="mb-1">
                위원회 정보
              </Typography>
            </div>
            <div className="absolute mb-1 right-6">
              <PlusCircleIcon
                className="font-medium w-10 cursor-pointer"
                type="button"
                onClick={() => setShowModal(true)} />
            </div>
          </CardHeader>
          {/* 위원회 데이터 */}
          <CardBody className="overflow-y-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <TableHead topics={["id", "이름", "설명"]} px="px-5" />
              <TBodyCommittee
                committees={committees}></TBodyCommittee>
            </table>
          </CardBody>
        </Card>
      </div>

      <AddCommitteeModal
        showModal={showModal}
        committe={committe}
        explanation={explanation}
        error={error}
        setShowModal={setShowModal}
        setError={setError}
        handleSubmit={handleSubmit}
        setCommitte={setCommitte}
        setExplanation={setExplanation}
      />
    </div>
  );
}

export default CommitteeTableSection;
