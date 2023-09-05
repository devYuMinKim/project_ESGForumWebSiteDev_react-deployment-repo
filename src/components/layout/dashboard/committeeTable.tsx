import React from "react";
import { Typography, Card, CardHeader, CardBody } from "@material-tailwind/react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import TableHead from "../table/tableHead";
import TBodyCommittee from "../../widget/cards/tableBodyCommittee"; // 아래 설명 참고
import { CommitteeData } from "../../../types/admin.interface";

interface CommitteeTableSectionProps {
  committees: CommitteeData[];
  setShowModal: (show: boolean) => void;
}

const CommitteeTableSection: React.FC<CommitteeTableSectionProps> = ({
  committees,
  setShowModal,
}) =>
(
  <Card className="overflow-hidden xl:col-span-2 border-2 border-slate-100 rounded-lg">
    <CardHeader
      floated={false}
      shadow={false}
      color="transparent"
      className="m-0 flex items-center justify-between p-6"
    >
      <div className="relative">
        <Typography variant="h6" color="blue-gray" className="mb-1">
          위원회
        </Typography>
      </div>
      <div className="absolute mb-1 right-6">
        <PlusCircleIcon
          className="font-medium w-10 cursor-pointer"
          type="button"
          onClick={() => setShowModal(true)}>
        </PlusCircleIcon>
      </div>
    </CardHeader>
    {/* 위원회 데이터 */}
    <CardBody className="overflow-y-scroll px-0 pt-0 pb-2 h-60">
      <table className="w-full min-w-[640px] table-auto">
        <TableHead topics={["id", "이름", "설명"]} px="px-12"></TableHead>
        <TBodyCommittee
          committees={committees}></TBodyCommittee>
      </table>
    </CardBody>
  </Card>
);

export default CommitteeTableSection;
