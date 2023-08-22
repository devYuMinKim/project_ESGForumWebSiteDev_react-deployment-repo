import {
  BookmarkSquareIcon,
  UserGroupIcon,
  UserPlusIcon,
  UserIcon
} from "@heroicons/react/24/solid";

export interface StatisticsCardData {
  name: string
  color: string,
  icon: any,
  title: string,
  value?: string
}

export const statisticsCardsData: StatisticsCardData[] = [
  {
    name: "member",
    color: "bg-pink-500",
    icon: UserGroupIcon,
    title: "회원 수",
    value: '개발중'
  },
  {
    name: "committee",
    color: "bg-green-500",
    icon: BookmarkSquareIcon,
    title: "위원회 수",
  },
  {
    name: "user",
    color: "bg-blue-500",
    icon: UserPlusIcon,
    title: "가입자 수",
    value: '개발중'
  },
];

export const committeeStatisticsCardsData = (name: string): StatisticsCardData[] => (
  [
    {
      name: "committee",
      color: "bg-green-500",
      icon: BookmarkSquareIcon,
      title: "위원회 이름",
      value: name
    },
    {
      name: "user",
      color: "bg-green-500",
      icon: UserIcon,
      title: "위원장",
      value: "개발중"
    },
    {
      name: "member",
      color: "bg-green-500",
      icon: UserGroupIcon,
      title: "회원 수",
    },
  ]
);

export default statisticsCardsData;
