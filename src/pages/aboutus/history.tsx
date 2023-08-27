import { useEffect, useState } from 'react';
import { Content, DesContent } from '../../components/aboutus/DesContent';
import { HistoryComponent } from '../../components/aboutus/HisConent';
import { Body, ContentContainer } from '../../components/aboutus/Layout';
import PageTitle from '../../components/aboutus/PageTitle';
import SubNav from '../../components/layout/subnav';
import { History } from '../../types/aboutus.interface';
import { getHistories } from '../../services/aboutus.service';

// const histories = [
//   {
//     date: new Date('2022-10-01'),
//     content: '대학ESG실천포럼 창립 추진 발기인 구성 (일반대 및 전문대)',
//   },
//   {
//     date: new Date('2022-10-03'),
//     content:
//       '포럼 국문, 영문 명칭 및 웹사이트 도메인주소 확정 포럼명칭: (국문) 대학ESG실천포럼 (영문) UFESGI (University Forum for ESG Implementation), (웹사이트) www.ufesgi.org',
//   },
//   {
//     date: new Date('2022-10-03'),
//     content: '포럼CI 디자인 제작을 위한 기본컨셉 수립 및 CI 디자인 작업수행',
//   },
//   {
//     date: new Date('2022-10-21'),
//     content: '포럼 창립취지문 초안 완료',
//   },
//   {
//     date: new Date('2022-10-22'),
//     content: '포럼 웹사이트 구성안 마련, 창립기념 세미나 기본계획(초안) 마련',
//   },
//   {
//     date: new Date('2022-11-22'),
//     content: '창립추진을 위한 발기인회의 개최',
//   },
//   {
//     date: new Date('2023-2-2'),
//     content: '창립기념 제1회 세미나 개최',
//   },
//   {
//     date: new Date('2023-5-8'),
//     content: '분야별 위원장 회의',
//   },
//   {
//     date: new Date('2023-5-10'),
//     content: '포럼 정기회의',
//   },
// ];

const HistoryPage = () => {
  const [histories, setHistories] = useState<History[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getHistories();
      setHistories(data);
    })();
  }, []);

  return (
    <Body>
      <PageTitle background="#ADCF9F">연혁</PageTitle>
      <SubNav />
      <ContentContainer>
        <DesContent>
          <h2>연혁</h2>
          <h3>대학ESG실천포럼의 발자취</h3>
          <Content>
            <HistoryComponent data={histories} />
          </Content>
        </DesContent>
      </ContentContainer>
    </Body>
  );
};

export default HistoryPage;
