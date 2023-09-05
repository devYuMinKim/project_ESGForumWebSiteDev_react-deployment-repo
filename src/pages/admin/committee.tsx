import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import FormInput from "../../components/layout/login";
import FormTextarea from "../../components/layout/dashboard/textarea";
import StatisticsCardsSection from "../../components/layout/dashboard/statisticsCard";
import { CommitteeData, committeeMember, StatisticsCardData } from "../../types/admin.interface";
import { BookmarkSquareIcon, PlusCircleIcon, UserGroupIcon, UserIcon, ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import AddMemberModal from "../../components/widget/cards/addMemberModal";
import TableHead from "../../components/layout/table/tableHead";
import TBodyMembers, { findChairMan } from "../../components/widget/cards/tableBodyMembers";
import Spinner from "../../components/layout/dashboard/spinner";
import authenticatedAxios from "../../services/request.service";
import { Link } from "react-router-dom";

const CommitteeInfo: React.FC = ({
}) => {

  const navigate = useNavigate();
  const id = Number(useLocation().pathname.split("/")[3]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [committee, setCommittee] = useState<CommitteeData>({
    id,
    name: "",
    explanation: ""
  });
  const [members, setMembers] = useState<committeeMember[]>([]);
  const [cName, setCommitteeName] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [mName, setMemberName] = useState<string>("");
  const [affiliation, setAffiliation] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const [chairman, setChairman] = useState<string>("");

  const assetData = {
    committee: [committee],
    members: members,
    chairman: chairman
  }

  useEffect(() => {
    const fetchData = async () => {
      axios
        .all([
          authenticatedAxios.get(`/committee/${id}`),
          authenticatedAxios.get(`/committee/${id}/members`),
        ])
        .then(
          axios.spread((committeeDataResponse, committeeMemberDataResponse) => {
            setReady(true);
            const committeeData: CommitteeData = committeeDataResponse.data;
            const committeeMemberData: committeeMember[] = committeeMemberDataResponse.data;
            setMembers(committeeMemberData);
            setChairman(findChairMan(committeeMemberData));
            setCommittee(committeeData);
            setCommitteeName(committeeData.name);
            setExplanation(committeeData.explanation);
          }))
        .catch(() => {
          window.alert("데이터를 불러올 수 없습니다");
          navigate("/admin");
        });
    };

    fetchData();
  }, []);

  const committeeStatisticsCardsData = (name: string, members: committeeMember[], chairMan: string): StatisticsCardData[] => {
    return (
      [
        {
          name: "committees",
          color: "bg-slate-700",
          icon: BookmarkSquareIcon,
          title: "위원회 이름",
          value: name
        },
        {
          name: "users",
          color: "bg-slate-700",
          icon: UserIcon,
          title: "위원장",
          value: chairMan
        },
        {
          name: "members",
          color: "bg-slate-700",
          icon: UserGroupIcon,
          title: "회원 수",
          value: members.length
        },
      ]
    );
  }

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

        const response = await authenticatedAxios.delete(`committee/${id}`);

        if (response.status === 204) {
          window.alert("삭제 완료");
          navigate("/admin");
        }

        setError("삭제할 수 없습니다. 다시 시도하세요.")
        setIsDelete(false);
        return;
      }

      const response = await authenticatedAxios.put(`/committee/${id}`, {
        id,
        name: cName,
        explanation,
      });

      if (response.status === 201) {
        committee.name = cName;
        committee.explanation = explanation;
        setCommittee({ ...committee });
        window.alert("수정 완료");
        setError("");
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
      const response = await authenticatedAxios.post(`/committee/${id}/members`, {
        name: mName,
        affiliation,
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
      window.alert("오류가 발생했습니다. 다시 시도하세요.");
    }
  }

  return (
    <div>
      <Spinner flag={ready} />
      <div className={`${ready ? "mx-24 my-6" : "opacity-0"} transition-opacity`}>
        <div className="flex mb-12 text-slate-600 hover:animate-pulse cursor-pointer align-middle">
          <ArrowLeftCircleIcon className="w-10" />
          <div className="align-middle">
            <Link to={'/admin'}>
              <Typography variant="h5" color="blue-gray" className={""}>
                이전 페이지
              </Typography>
            </Link>
          </div>
        </div>
        <StatisticsCardsSection
          statisticsCardsData={committeeStatisticsCardsData(committee.name, members, chairman)}
          assetData={assetData}
          gridCols={"xl:grid-cols-3"}
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
                    value={cName}
                    width={"w-full"}
                    onChange={(e) => setCommitteeName(e.target.value)}
                  />
                  <FormTextarea
                    id="explanation"
                    label="설명"
                    autoComplete="explanation"
                    placeholder="위원회에 대한 설명을 적어주세요."
                    value={explanation}
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
                  위원회 회원 명단
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
                <TableHead topics={["이름", "소속", "위원회 직위", "위원회 회원 관리"]} px="px-5" />
                <TBodyMembers c_id={id} members={members} setMembers={setMembers} setChairman={setChairman}></TBodyMembers>
              </table>
            </CardBody>
          </Card>

          <AddMemberModal
            showModal={showModal}
            name={mName}
            affiliation={affiliation}
            setShowModal={setShowModal}
            handleSubmit={handleMemberSubmit}
            setName={setMemberName}
            setAffiliation={setAffiliation}
          />
        </div>
      </div>
    </div >
  );
};

export default CommitteeInfo;
