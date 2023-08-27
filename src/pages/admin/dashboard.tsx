import { useEffect, useState } from "react"
import axios from "axios";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import {
  statisticsCardsData,
  CommitteeData,
  User,
  Member,
  GetCommitteeData,
  getUserData,
  getMemberData,
} from "../../data";
import TableHead from "../../components/layout/table/tableHead";
import StatisticsCardsSection from "../../components/layout/dashboard/statisticsCard";
import AddCommitteeModal from "../../components/widget/cards/addCommitteeModal";
import CommitteeTableSection from "../../components/layout/dashboard/committeeTable";
import Spinner from "../../components/layout/dashboard/spinner";
import TBodyApplicants from "../../components/widget/cards/tableBodyApplicants";

const apiUrl = "http://127.0.0.1:8000/api";

const Dashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [committe, setCommitte] = useState("");
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [assetCommittee, setAssetCommittee] = useState<CommitteeData[]>([]);
  const [assetApplicants, setAssetApplicants] = useState<User[]>([]);
  const [assetUsers, setAssetUsers] = useState<User[]>([]);
  const [assetMember, setAssetMember] = useState<Member[]>([]);

  const assetData = {
    committees: assetCommittee,
    users: assetUsers,
    members: assetMember
  }

  useEffect(() => {
    const fetchData = async () => {
      const committeeData = await GetCommitteeData();
      const userdata = await getUserData();
      const memberData = await getMemberData();
      if (Array.isArray(committeeData)) {
        setAssetCommittee(committeeData);
      }
      setAssetUsers(userdata.users);
      setAssetApplicants(userdata.applicants);
      setAssetMember(memberData);
      setReady(true);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/committees`, {
        name: committe,
        explanation,
      }, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      if (response.status === 201) {
        const newCommittee: CommitteeData = response.data;
        const newAssetCommittee = [...assetCommittee, newCommittee];
        window.alert("위원회 생성 완료")
        setCommitte("");
        setExplanation("");
        setShowModal(false);
        setAssetCommittee(newAssetCommittee);
      }
    }
    catch (err) {
      setError("오류가 발생했습니다. 다시 시도하세요.")
    }
  };

  return (
    <div>
      <Spinner flag={ready}></Spinner>
      <div className={`${ready ? "m-12" : "hidden"}`}>
        <StatisticsCardsSection
          statisticsCardsData={statisticsCardsData}
          assetData={assetData}
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
                  setAssetApplicants={setAssetApplicants}
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
          ></AddCommitteeModal>
        </div>
      </div >
    </div>
  );
}

export default Dashboard