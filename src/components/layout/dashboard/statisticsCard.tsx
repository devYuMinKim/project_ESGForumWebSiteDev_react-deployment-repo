import React, { createElement } from 'react';
import StatisticsCard from '../../widget/cards/statisticsCard';
import { Member, StatisticsCardData } from '../../../data';
import { CommitteeData } from '../../../data';

interface AssetData {
  committees?: CommitteeData[]
  committee?: CommitteeData[]
  members?: Member[]
}

export interface StatisticsCardsSectionProps {
  statisticsCardsData: StatisticsCardData[]
  assetData: AssetData
}
 
const StatisticsCardsSection: React.FC<StatisticsCardsSectionProps> = ({
  statisticsCardsData,
  assetData }) => {
  return (
    <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3 bg-clip-border">
      {statisticsCardsData.map(({ icon, name, color, title, value, ...rest }) => (
        <StatisticsCard
          key={title}
          {...rest}
          title={title}
          color={color}
          value={value ? value : assetData[name as keyof AssetData]?.length || 0}
          icon={createElement(icon, {
            className: "w-6 h-6 text-white",
          })}
        />
      ))}
    </div>
  );
};

export default StatisticsCardsSection;
