import { useEffect, useState } from "react"
import axios from "axios";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import {
  CommitteeData,
  User,
  Member,
  UserDataResponse,
} from "../../types/admin.interface";
import TableHead from "../../components/layout/table/tableHead";
import StatisticsCardsSection from "../../components/layout/dashboard/statisticsCard";
import AddCommitteeModal from "../../components/widget/cards/addCommitteeModal";
import CommitteeTableSection from "../../components/layout/dashboard/committeeTable";
import Spinner from "../../components/layout/dashboard/spinner";
import TBodyApplicants from "../../components/widget/cards/tableBodyApplicants";
import { onClick } from "../../components/widget/cards/statisticsCard";
import authenticatedAxios from "../../services/request.service";
import { useNavigate } from "react-router-dom";
import { StatisticsCardData } from "../../types/admin.interface";
import { BookmarkSquareIcon, UserGroupIcon, UserPlusIcon } from "@heroicons/react/24/solid";

const apiUrl = "http://127.0.0.1:8000/api";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [committe, setCommitte] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [ready, setReady] = useState<boolean>(false);
  const [assetCommittee, setAssetCommittee] = useState<CommitteeData[]>([]);
  const [assetApplicants, setAssetApplicants] = useState<User[]>([]);
  const [assetUsers, setAssetUsers] = useState<User[]>([]);
  const [assetMember, setAssetMember] = useState<Member[]>([]);

  const statisticsCardsData: StatisticsCardData[] = [
    {
      name: "committees",
      color: "bg-green-500",
      icon: BookmarkSquareIcon,
      title: "위원회 수",
    },
    {
      name: "members",
      color: "bg-pink-500",
      icon: UserGroupIcon,
      title: "회원 수",
    },
    {
      name: "users",
      color: "bg-blue-500",
      icon: UserPlusIcon,
      title: "가입자 수",
    },
  ];

  const link: onClick[] = [
    {
      name: "members",
      to: "members"
    },
    {
      name: "users",
      to: "users"
    },
  ];

  const assetData = {
    committees: assetCommittee,
    users: assetUsers,
    members: assetMember
  }

  useEffect(() => {
    const fetchData = async () => {
      axios
        .all([
          authenticatedAxios.get("/committees"),
          authenticatedAxios.get("/users"),
          authenticatedAxios.get("/members"),
        ])
        .then(
          axios.spread((committeeDataResponse, userdataResponse, memberDataResponse) => {
            setReady(true);
            const committeeData: CommitteeData[] = committeeDataResponse.data;
            const userdata: UserDataResponse = userdataResponse.data;
            const memberData: Member[] = memberDataResponse.data;
            setAssetCommittee(committeeData);
            setAssetUsers(userdata.users);
            setAssetApplicants(userdata.applicants);
            setAssetMember(memberData);
          })
        )
        .catch(() => {
          window.alert("데이터를 불러올 수 없습니다");
          navigate("/");
        });
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await authenticatedAxios.post<CommitteeData>(`${apiUrl}/committees`, {
        name: committe,
        explanation,
      });

      if (response.status === 201) {
        const newCommittee = response.data;
        const newAssetCommittee = [...assetCommittee, newCommittee];
        window.alert("위원회 생성 완료");
        setCommitte("");
        setExplanation("");
        setShowModal(false);
        setAssetCommittee(newAssetCommittee);
      }
    }
    catch (err) {
      setError("오류가 발생했습니다. 다시 시도하세요.");
    }
  };

  return (
    <div>
      <Spinner flag={ready} />
      <div className={`${ready ? "m-12" : "hidden"}`}>
        <StatisticsCardsSection
          statisticsCardsData={statisticsCardsData}
          assetData={assetData}
          onClick={link}
        />
        <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* 위원회 데이터 */}
          <CommitteeTableSection
            committees={assetCommittee}
            setShowModal={setShowModal}
          />
          <Card
            className="border-2 border-slate-100 rounded-lg">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 p-6"
            >
              <Typography variant="h6" color="blue-gray" className="mb-1">
                가입 신청자
              </Typography>
            </CardHeader>
            {/* 가입 신청자 데이터 */}
            <CardBody className="p-0 overflow-y-scroll h-60">
              <table className="w-full min-w-[300px] table-auto">
                <TableHead topics={["이름", "소속", "허가"]} px="px-5" />
                <TBodyApplicants
                  applicants={assetApplicants}
                  assetUsers={assetUsers}
                  setAssetApplicants={setAssetApplicants}
                  setAssetUsers={setAssetUsers}
                />
              </table>
            </CardBody>
          </Card>

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
      </div>
    </div>
  );
}

export default Dashboard;