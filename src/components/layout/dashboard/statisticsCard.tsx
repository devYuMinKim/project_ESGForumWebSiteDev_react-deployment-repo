import React, { createElement } from "react";
import StatisticsCard from "../../widget/cards/statisticsCard";
import { Member, committeeMember, StatisticsCardData, Track } from "../../../types/admin.interface";
import { CommitteeData } from "../../../types/admin.interface";

interface AssetData {
  committees?: CommitteeData[]
  committee?: CommitteeData[]
  members?: Member[] | committeeMember[]
}

export interface StatisticsCardsSectionProps {
  statisticsCardsData: StatisticsCardData[]
  assetData?: AssetData
  onClick?: Track[]
  gridCols?: string
  track?: Track
  setTrack?: React.Dispatch<React.SetStateAction<Track>>;
}

const StatisticsCardsSection: React.FC<StatisticsCardsSectionProps> = ({
  statisticsCardsData,
  assetData,
  onClick,
  gridCols,
  track,
  setTrack }) => {

  const valueOfdata = (value: string | number | undefined, name: string) => {
    if (typeof value === "number") {
      return value;
    }
    if (assetData) {
      return assetData[name as keyof AssetData]?.length || 0
    }
  }

  return (
    <div className={`mb-12 grid gap-y-8 gap-x-6 md:grid-cols-2 ${gridCols || "xl:grid-cols-4"} bg-clip-border`}>
      {statisticsCardsData.map(({ icon, name, color, title, value, ...rest }) => (
        <StatisticsCard
          key={title}
          name={name}
          {...rest}
          title={title}
          color={color}
          value={value ? value : valueOfdata(value, name)}
          icon={createElement(icon, {
            className: "w-7 h-7 text-white",
          })}
          track={track}
          setTrack={setTrack}
          onClick={onClick ? onClick : undefined}
        />
      ))}
    </div>
  );
};

export default StatisticsCardsSection;
