import { useEffect, useState } from 'react'
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import {
  GetCommitteeData,
  subscriberData,
  CommitteeData,
  statisticsCardsData
} from "../../data";
import TableHead from '../../components/layout/table/tableHead';
import SubscribersData from '../../components/widget/cards/tableBodySubscribers';
import axios from 'axios';
import StatisticsCardsSection from '../../components/layout/dashboard/statisticsCard';
import AddCommitteeModal from '../../components/widget/cards/addCommitteeModal';
import CommitteeTableSection from '../../components/layout/dashboard/committeeTable';

const apiUrl = "http://127.0.0.1:8000/api";

const Dashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [committe, setCommitte] = useState("");
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");
  const [assetCommittee, setAssetCommittee] = useState<CommitteeData[]>([]);

  const assetData = {
    committees: assetCommittee
  }

  useEffect(() => {
    const fetchData = async () => {
      const committeeData = await GetCommitteeData();
      if (Array.isArray(committeeData)) {
        setAssetCommittee(committeeData);
      }
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
        const newCommittee = response.data;
        assetCommittee.push(newCommittee);
        setCommitte("");
        setExplanation("");
        setShowModal(false);
        setAssetCommittee(assetCommittee)
      }
    }
    catch (err) {
      setError("오류가 발생했습니다. 다시 시도하세요.")
    }
  };

  return (
    <div className="m-12">
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
              <TableHead topics={["이름", "소속", "허가"]} px="px-5"></TableHead>
              <SubscribersData subscribers={subscriberData}></SubscribersData>
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
  );
}

export default Dashboard