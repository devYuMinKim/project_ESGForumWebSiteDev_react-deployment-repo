import React, { createElement } from "react";
import StatisticsCard, { onClick } from "../../widget/cards/statisticsCard";
import { Member, committeeMember, StatisticsCardData } from "../../../types/admin.interface";
import { CommitteeData } from "../../../types/admin.interface";

interface AssetData {
  committees?: CommitteeData[]
  committee?: CommitteeData[]
  members?: Member[] | committeeMember[]
}

export interface StatisticsCardsSectionProps {
  statisticsCardsData: StatisticsCardData[]
  assetData: AssetData
  onClick?: onClick[]
}

const StatisticsCardsSection: React.FC<StatisticsCardsSectionProps> = ({
  statisticsCardsData,
  assetData,
  onClick }) => {
  return (
    <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3 bg-clip-border">
      {statisticsCardsData.map(({ icon, name, color, title, value, ...rest }) => (
        <StatisticsCard
          key={title}
          name={name}
          {...rest}
          title={title}
          color={color}
          value={value ? value : assetData[name as keyof AssetData]?.length || 0}
          icon={createElement(icon, {
            className: "w-6 h-6 text-white",
          })}
          onClick={onClick ? onClick : undefined}
        />
      ))}
    </div>
  );
};

export default StatisticsCardsSection;
