import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, NavigateFunction } from "react-router-dom";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import FormInput from "../../components/layout/login";
import FormTextarea from "../../components/layout/dashboard/textarea";
import StatisticsCardsSection from "../../components/layout/dashboard/statisticsCard";
import {
  CommitteeData,
  committeeStatisticsCardsData,
} from "../../data";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import AddMemberModal from "../../components/widget/cards/addMemberModal";
import { GetMemberData, MemberData } from "../../data";
import TableHead from "../../components/layout/table/tableHead";
import TBodyMembers, { findChairMan } from "../../components/widget/cards/tableBodyMembers";
import Spinner from "../../components/layout/dashboard/spinner";

const apiUrl = "http://127.0.0.1:8000/api";

const notFount = (id: unknown, navigate: NavigateFunction) => {
  if (typeof id !== "number" || isNaN(id)) {
    window.alert("존재하지 않는 위원회 입니다.");
    navigate("/admin");
  }
}

const CommitteeInfo: React.FC = ({
}) => {

  const navigate = useNavigate();
  const id = Number(useLocation().pathname.split("/")[3]);
  const [showModal, setShowModal] = useState(false);
  const [committee, setCommittee] = useState<CommitteeData>({
    id,
    name: "",
    explanation: ""
  });
  const [members, setMembers] = useState<MemberData[]>([]);
  const [cName, setCommitteeName] = useState("");
  const [explanation, setExplanation] = useState("");
  const [mName, setMemberName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [error, setError] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [ready, setReady] = useState(false);
  const [chairman, setChairman] = useState("");

  const assetData = {
    committee: [committee],
    members: members,
    chairman: chairman
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/committee/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });

        const members = await GetMemberData(id);
        setMembers(members);
        setChairman(findChairMan(members));

        if (response.status === 200) {
          const committeeData: CommitteeData = response.data;
          setCommittee(committeeData);
          setCommitteeName(committeeData.name);
          setExplanation(committeeData.explanation);
          setReady(true);
        }

        return [];
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            window.alert("존재하지 않는 위원회 입니다.");
            navigate("/admin");
          }
        }
        setReady(true);
        return [];
      }
    };

    fetchData();
  }, []);

  // 위원회 작업
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isDelete) {
        const flag = window.confirm("삭제 하시겠습니까?");

        if (!flag) {
          setIsDelete(false);
          return;
        }

        const response = await axios.delete(`${apiUrl}/committee/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });

        if (response.status === 204) {
          window.alert("삭제 완료");
          navigate("/admin");
        }

        setError("삭제할 수 없습니다. 다시 시도하세요.")
        setIsDelete(false);
        return;
      }

      const response = await axios.put(`${apiUrl}/committees/${id}`, {
        id,
        name: cName,
        explanation,
      }, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      if (response.status === 200) {
        committee.name = cName;
        committee.explanation = explanation;
        setCommittee({ ...committee });
        window.alert("수정 완료");
      }
    }
    catch (err) {
      setError("오류가 발생했습니다. 다시 시도하세요.");
      setIsDelete(false);
    }
  };

  // 회원 작업
  const handleMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 회원 추가 /committees/{committee}/members
      const response = await axios.post(`${apiUrl}/committees/${id}/members`, {
        name: mName,
        affiliation,
      }, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      if (response.status === 201) {
        const newMember = response.data;
        members.push(newMember);
        window.alert("추가 성공");
        setMemberName("");
        setAffiliation("");
        setMembers(members);
        setShowModal(false);
      }
    }
    catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        window.alert("이미 위원회의 회원입니다.");
        setMemberName("");
        setAffiliation("");
        return;
      }
      setError("오류가 발생했습니다. 다시 시도하세요.")
    }
  }

  return (
    <div>
      <Spinner flag={ready}></Spinner>
      <div className={`${ready ? "m-12" : "hidden"}`}>
        <StatisticsCardsSection
          statisticsCardsData={committeeStatisticsCardsData(committee.name, members, chairman)}
          assetData={assetData}
        />
        <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card className="overflow-hidden xl:col-span-1 border-2 border-slate-100 rounded-lg">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 flex items-center justify-between p-6"
            >
              <Typography variant="h6" color="blue-gray" className="mb-1">
                위원회 데이터 작업
              </Typography>
            </CardHeader>
            <CardBody className="relative px-0 pt-0 pb-1">
              <div className="relative py-1 px-5 flex-auto justify-center">
                <form className="space-y-3 " onSubmit={handleSubmit}>
                  <FormInput
                    id="name"
                    label={"이름"}
                    type="text"
                    autoComplete="name"
                    placeholder={"변경하고 싶은 이름을 입력하세요."}
                    value={cName ? cName : "로드중..."}
                    width={"w-full"}
                    onChange={(e) => setCommitteeName(e.target.value)}
                  />
                  <FormTextarea
                    id="explanation"
                    label="설명"
                    autoComplete="explanation"
                    placeholder="위원회에 대한 설명을 적어주세요."
                    value={explanation ? explanation : "로드중..."}
                    onChange={(e) => setExplanation(e.target.value)}
                  />
                  <button
                    className="w-full bg-slate-700 text-white font-bold uppercase text-m px-3 py-2 rounded shadow hover:shadow-lg mb-5"
                    type="submit"
                  >
                    수정
                  </button>
                  <button
                    className="w-full bg-red-500 text-white font-bold uppercase text-m px-3 py-2 rounded shadow hover:shadow-lg mb-5"
                    onClick={(e) => setIsDelete(true)}
                  >
                    위원회 삭제
                  </button>
                  <p>
                    {error}
                  </p>
                </form>
              </div>
            </CardBody>
          </Card>
          <Card className="overflow-hidden xl:col-span-2 border-2 border-slate-100 rounded-lg">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 flex items-center justify-between p-6"
            >
              <div className="relative">
                <Typography variant="h6" color="blue-gray" className="mb-1">
                  회원 명단
                </Typography>
              </div>
              <div className="absolute mb-1 right-6">
                <PlusCircleIcon
                  className="font-medium w-10 cursor-pointer"
                  type="button"
                  onClick={() => setShowModal(true)}
                />
              </div>
            </CardHeader>
            {/* 회원 데이터 */}
            <CardBody className="overflow-y-scroll px-0 pt-0 pb-2 h-96">

              <table className="w-full min-w-[640px] table-auto">
                <TableHead topics={["이름", "소속", "직위", "작업하기"]} px="px-1" />
                <TBodyMembers c_id={id} members={members} setMembers={setMembers} setChairman={setChairman}></TBodyMembers>
              </table>
            </CardBody>
          </Card>

          <AddMemberModal
            showModal={showModal}
            name={mName}
            affiliation={affiliation}
            error={error}
            setShowModal={setShowModal}
            setError={setError}
            handleSubmit={handleMemberSubmit}
            setName={setMemberName}
            setAffiliation={setAffiliation}
          ></AddMemberModal>
        </div>
      </div>
    </div>
  );
};

export default CommitteeInfo;
