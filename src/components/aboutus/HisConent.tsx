import styled from 'styled-components';
import { History } from '../../types/aboutus.interface';

export const HistoryComponent = (props: { data: History[] }) => {
  const sortedData = props.data.toSorted((a, b) => b.date.getTime() - a.date.getTime());

  const groupedDatas = new Map<number, { date: string; content: string }[]>();

  sortedData.forEach((item) => {
    var year = item.date.getFullYear();
    var mmdd = item.date.getMonth() + 1 + '.' + item.date.getDate();

    if (groupedDatas.has(year)) {
      groupedDatas.get(year)?.push({ date: mmdd, content: item.content });
    } else {
      groupedDatas.set(year, [{ date: mmdd, content: item.content }]);
    }
  });

  return (
    <>
      {Array.from(groupedDatas).map(([key, value]) => {
        return (
          <YearItem key={key}>
            <Year>
              <ThisYear>{key}</ThisYear>
            </Year>
            <HistoryList>
              {value.map((item, i) => {
                return (
                  <HistoryItem key={i}>
                    <Date>{item.date}</Date>
                    <Content>{item.content}</Content>
                  </HistoryItem>
                );
              })}
            </HistoryList>
          </YearItem>
        );
      })}
    </>
  );
};

export const YearItem = styled.div`
  display: flex;
  align-items: flex-start;
`;
export const Year = styled.div`
  margin-right: 58px;
  display: flex;
  align-items: center;
  width: 128px;
`;
export const ThisYear = styled.p`
  display: contents;
  font-family: 'IBMPlexSansKR-Regular';
  font-size: 32px;
  font-weight: 400;
  line-height: 64px;
  color: rgba(0, 0, 0, 1);
  &:before {
    content: '';
    display: flex;
    width: 12px;
    height: 12px;
    background-color: rgba(255, 255, 255, 1);
    margin-right: 20px;
    border-radius: 100px;
    border: 4px solid rgba(0, 0, 0, 1);
  }
`;
export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;
export const HistoryItem = styled.div`
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;
export const Date = styled.p`
  width: 64px;
  min-width: 64px;
  font-family: 'IBMPlexSansKR-Regular';
  font-size: 24px;
  font-weight: 400;
  line-height: 64px;
  color: rgba(0, 0, 0, 1);
  margin-right: 27px;
`;
export const Content = styled.p`
  font-family: 'IBMPlexSansKR-Regular';
  font-size: 20px;
  font-weight: 400;
  line-height: 64px;
  color: rgba(0, 0, 0, 1);
`;
