import { createElement } from 'react';
import StatisticsCard from '../../widget/cards/statisticsCard';
import { StatisticsCardData } from '../../../data';

interface AssetData<T> {
  committees?: T[]
  committee?: T[]
}

export interface StatisticsCardsSectionProps<T> {
  statisticsCardsData: StatisticsCardData[]
  assetData: AssetData<T>
}

const StatisticsCardsSection = <T extends unknown>({
  statisticsCardsData,
  assetData
}: StatisticsCardsSectionProps<T>) => {
  return (
    <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3 bg-clip-border">
      {statisticsCardsData.map(({ icon, name, color, title, value, ...rest }) => (
        <StatisticsCard
          key={title}
          {...rest}
          title={title}
          color={color}
          value={value ? value : assetData[name as keyof AssetData<T>]?.length || 0}
          icon={createElement(icon, {
            className: "w-6 h-6 text-white",
          })}
        />
      ))}
    </div>
  );
};

export default StatisticsCardsSection;
