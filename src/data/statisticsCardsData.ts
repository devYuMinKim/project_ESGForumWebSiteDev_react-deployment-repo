import {
  BookmarkSquareIcon,
  UserGroupIcon,
  UserPlusIcon,
  UserIcon
} from "@heroicons/react/24/solid";
import { MemberData } from "./committeeMemberData";

export interface StatisticsCardData {
  name: string
  color: string,
  icon: any,
  title: string,
  value?: string | number
}

export const statisticsCardsData: StatisticsCardData[] = [
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

export const committeeStatisticsCardsData = (name: string, members: MemberData[], chairMan: string): StatisticsCardData[] => {
  return (
    [
      {
        name: "committee",
        color: "bg-slate-700",
        icon: BookmarkSquareIcon,
        title: "위원회 이름",
        value: name ? name : "로드중..."
      },
      {
        name: "user",
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
        value: members[0]?.m_id === -1 ? "로드중..." : members.length
      },
    ]
  );
}

export default statisticsCardsData;
