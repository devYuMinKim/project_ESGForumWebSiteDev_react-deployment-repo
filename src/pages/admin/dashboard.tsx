import { useEffect, useState } from "react"
import axios from "axios";
import { Track } from "../../types/admin.interface";
import StatisticsCardsSection from "../../components/layout/dashboard/statisticsCard";
import CommitteeTableSection from "../../components/layout/dashboard/committeeTable";
import Spinner from "../../components/layout/dashboard/spinner";
import authenticatedAxios from "../../services/request.service";
import { useNavigate } from "react-router-dom";
import { StatisticsCardData } from "../../types/admin.interface";
import { BookmarkSquareIcon, UserGroupIcon, QueueListIcon } from "@heroicons/react/24/solid";
import Members from "../../components/layout/dashboard/members";
import Applicants from "../../components/layout/dashboard/applicants";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState<boolean>(false);
  const [committeeCount, setCommitteeCount] = useState<number>(0);
  const [memberCount, setMemberCount] = useState<number>(0);
  const [applicantsCount, setApplicantsCount] = useState<number>(0);
  const [track, setTrack] = useState<Track>("committees");

  useEffect(() => {
    axios
      .all([
        authenticatedAxios.get("/committees/count"),
        authenticatedAxios.get("/members/count"),
      ])
      .then(
        axios.spread((committeeDataResponse, memberDataResponse) => {
          const committeeData = committeeDataResponse.data;
          const memberData = memberDataResponse.data;
          setCounts(committeeCount, committeeData, setCommitteeCount);
          setCounts(applicantsCount, memberData.applicants, setApplicantsCount);
          setCounts(memberCount, memberData.members, setMemberCount);
          // setCommitteeCount(committeeData);
          // setApplicantsCount(memberData.applicants);
          // setMemberCount(memberData.members);
        })
      )
      .catch(() => {
        window.alert("데이터를 불러올 수 없습니다");
        navigate("/");
      });
    setReady(true);
  }, []);
  console.log("dashboard")

  const setCounts = (
    count: number,
    newCount: number,
    setFunction: React.Dispatch<React.SetStateAction<number>>) => {

    if (count !== newCount) {
      setFunction(newCount);
    } 
  }

  const statisticsCardsData: StatisticsCardData[] = [
    {
      name: "committees",
      color: "bg-slate-700",
      icon: BookmarkSquareIcon,
      title: "위원회 수",
      value: committeeCount
    },
    {
      name: "members",
      color: "bg-slate-700",
      icon: UserGroupIcon,
      title: "포럼 회원 수",
      value: memberCount
    },
    {
      name: "applicants",
      color: "bg-slate-700",
      icon: QueueListIcon,
      title: "사이트 가입 신청자 수",
      value: applicantsCount
    },
  ];

  const link: Track[] = [
    "committees",
    "members",
    "applicants",
  ];

  const trackedData = (track: Track) => {
    switch (track) {
      case "members":
        return <Members
          memberCount={memberCount}
          setMemberCount={setMemberCount}
        />

      case "applicants":
        return <Applicants
          applicantsCount={applicantsCount}
          setApplicantsCount={setApplicantsCount}
        />

      default:
        return <CommitteeTableSection
          committeeCount={committeeCount}
          setCommitteeCount={setCommitteeCount} />
    }
  }

  return (
    <div>
      <Spinner flag={ready} />
      <div className={`${ready ? "mx-24 my-12" : "opacity-0"} transition-opacity`}>
        <StatisticsCardsSection
          statisticsCardsData={statisticsCardsData}
          onClick={link}
          track={track}
          setTrack={setTrack}
        />
        {trackedData(track)}
      </div>
    </div>
  );
}

export default Dashboard;