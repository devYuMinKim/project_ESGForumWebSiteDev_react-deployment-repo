import PlusCircleIcon from "@heroicons/react/24/solid/PlusCircleIcon";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import TableHead from "../table/tableHead";
import { useState } from "react";
import { CommitteeMember } from "../../../types/admin.interface";
import authenticatedAxios from "../../../services/request.service";
import AddMemberModal from "../../widget/cards/addMemberModal";
import axios from "axios";
import { selectMember } from "../../../services/member.service";

interface CommitteeMembersProps {
  members: CommitteeMember[];
  c_id: number;
  setMembers: React.Dispatch<React.SetStateAction<CommitteeMember[]>>;
  setChairman: React.Dispatch<React.SetStateAction<string>>;
}

const CommitteeMembers: React.FC<CommitteeMembersProps> = ({
  members,
  c_id,
  setMembers,
  setChairman,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const tdTextContent = "font-medium text-blue-gray-600 text-center";
  const [selected, setSelected] = useState<number[]>([]);
  const myAxios = authenticatedAxios();

  const handleSubmit = async (name: string, affiliation: string) => {
    try {
      const response = await myAxios.post(`/committee/${c_id}/members`, {
        name,
        affiliation,
      });

      if (response.status === 201) {
        const newMember = response.data;
        window.alert("추가 성공");
        setMembers([...members, newMember]);
        setShowModal(false);
        return;
      }

      window.alert("오류가 발생했습니다. 다시 시도하세요.");
    }
    catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        window.alert("이미 위원회의 회원입니다.");
        return;
      }
      window.alert("오류가 발생했습니다. 다시 시도하세요.");
    }
  }

  const findChairMan = (members: CommitteeMember[]) => {
    for (const member of members) {
      if (member.pivot.note === "위원장") {
        return member.name;
      }
    }
    return "공석";
  }

  const appointmentHandler = async (
    ids: number[],
    setMembers: React.Dispatch<React.SetStateAction<CommitteeMember[]>>,
    setChairman: React.Dispatch<React.SetStateAction<string>>,) => {

    if (!(ids?.length === 1)) {
      window.alert("회원 한 명을 선택하세요.");
      return;
    }

    try {
      // 수정 - 위원장 임명
      const response = await myAxios.put(`/committee/${c_id}/members/${ids[0]}`);

      if (response.status === 201) {
        const newMembersInfo = response.data;
        setMembers(newMembersInfo);
        setChairman(findChairMan(newMembersInfo));
        setSelected([]);
        window.alert("위원장 임명 완료");
        return;
      }
      
      window.alert("오류가 발생했습니다. 다시 시도하세요.");
    }
    catch (error) {
      window.alert("오류가 발생했습니다. 다시 시도하세요.");
    }
    setSelected([]);
  }

  const deleteHandler = async (
    ids: number[],
    setMembers: React.Dispatch<React.SetStateAction<CommitteeMember[]>>,
    setChairman: React.Dispatch<React.SetStateAction<string>>
    ) => {
    try {
      const flag = window.confirm("탈퇴 시키겠습니까?");
      // 삭제
      if (flag) {
        const response = await myAxios.delete(`/committee/${c_id}/members`, {
          data: { ids }
        });

        if (response.status === 204) {
          const newMembers = [...members].filter((member) => !(ids.includes(member.pivot.id2)));
          setMembers(newMembers);
          setChairman(findChairMan(newMembers));
          setSelected([]);
          window.alert("탈퇴 완료");
        }
      }
    }
    catch (err) {
      window.alert("오류가 발생했습니다. 다시 시도하세요.");
    }
    setSelected([]);
  }

  return (
    <div>
      <Card className="border-2 border-slate-100 rounded-lg">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 flex items-center justify-between p-6"
        >
          <div className="relative">
            <Typography variant="h6" color="blue-gray" className="mb-1">
              위원회 회원 명단
            </Typography>
          </div>
          <div className="absolute mb-1 right-6 flex items-center">
            <div className={`space-x-5 ${selected?.length ? "" : "opacity-0"} transition-opacity`}>
              <button
                className={`${(selected?.length === 1) ? "" : "opacity-0"} transition-opacity
                w-15 bg-admin text-white font-bold text-sm px-1 py-1 rounded shadow hover:shadow-lg`}
                onClick={async () => appointmentHandler(selected, setMembers, setChairman)}
              >
                위원장 임명
              </button>
              <button
                className={"w-15 bg-red-500 text-white font-bold text-sm px-1 py-1 rounded shadow hover:shadow-lg my-1"}
                onClick={async () => deleteHandler(selected, setMembers, setChairman)}
              >
                위원회 탈퇴
              </button>
            </div>
            <PlusCircleIcon
              className="font-medium w-10 cursor-pointer ml-5 text-admin"
              type="button"
              onClick={() => setShowModal(true)}
            />
          </div>
        </CardHeader>
        {/* 회원 데이터 */}
        <CardBody className="overflow-y-scroll px-0 pt-0 pb-2 h-[380px]">
          <table className="w-full min-w-[640px] table-auto">
            <TableHead topics={["", "이름", "소속", "위원회 직위"]} px="px-5" />
            <tbody>
              {members.map(
                ({ pivot, name, affiliation }, key) => {
                  const className = `py-3 px-1 ${key === members.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <tr
                      key={pivot.id2}
                      className={`transition-shadow hover:shadow-inner ${selected.includes(pivot.id2)
                        ? "bg-gray-50"
                        : ""}`}
                      onClick={() => selectMember(pivot.id2, selected, setSelected)}
                    >
                      <td className={`${className} flex justify-center`}>
                        <div className="h-full">
                          <input
                            type="checkbox"
                            value={pivot.id2}
                            checked={selected.includes(pivot.id2)}
                            className="rounded"
                            onChange={() => selectMember(pivot.id2, selected, setSelected)}
                          />
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className={tdTextContent}
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className={tdTextContent}
                        >
                          {affiliation}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant={`${(pivot.note === "1") ? "h6" : "small"}`}
                          className={tdTextContent}
                        >
                          {pivot.note}
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <AddMemberModal
        title="위원회 회원 추가"
        showModal={showModal}
        setShowModal={setShowModal}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default CommitteeMembers;