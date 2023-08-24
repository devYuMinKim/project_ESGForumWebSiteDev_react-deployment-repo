import { useEffect, useState } from 'react';
import { Content, DesContent } from '../../components/aboutus/DesContent';
import { Body, ContentContainer } from '../../components/aboutus/Layout';
import PageTitle from '../../components/aboutus/PageTitle';
import SubNav from '../../components/layout/subnav';
import parse from 'html-react-parser';
import { getGreetings } from '../../services/aboutus.service';

// const content = `
// <p>
// 안녕하십니까. 「대학ESG실천포럼」 회원 여러분!
// <br />
// <br />
// 그동안 경제적 성장에만 집중했던 우리 사회는 이제 기후변화 위기, 갖가지 사회적 문제
// 등에 직면하면서 과거 효율성 지상주의에서 벗어나 친환경, 사회 적 가치, 건전하고 투명한
// 지배구조를 기반으로 하는 지속 가능한 성장을 지향하는 ‘ESG 경영의 시대’로
// 진입하였습니다.
// <br />
// <br />
// 특히 대학 같은 교육기관은 ‘ESG를 통한 지속 가능한 고등교육 생태계 구축’이라는 시대적
// 요구에 부응하는 한편, 새로운 시장 및 산업 환경에 필요한 ESG 인재 양성을 위해 노력해야
// 하는 상황에 직면하고 있습니다. 이러한 변화 가운데 최근 많은 대학이 환경(E), 사회(S),
// 지배구조(G)를 핵심으로 하는 지속 가능한 성장이라는 시대적 사명에 부응하기 위해
// 앞다투어 ‘ESG 경영’을 선포하고 ESG를 대학 교육과정과 경영에 도입하는 등 다양한 노력을
// 펼치고 있습니다. 그러나 아직 ESG 경영에 필요한 구체적 실천 방안 수립과 객관적 데이터
// 제시 등에 미흡한 모습을 보이는 것이 현실입니다. 이제는 대학이 실행할 수 있는 효과적인
// 추진전략 마련에 지혜를 모으고 학교 구성원의 자발적 참여를 끌어내는 실천 과제 도출이
// 더욱 중요한 때입니다.
// <br />
// <br />
// 이러한 배경에서 우리 포럼은 지속 가능한 성장의 미래를 만들기 위해 대학은 물론 정부,
// 지방자치단체와 공공부문과 기업이 함께 하는 실천 네트워크가 구축되고 참여와 활동이
// 이루어지는 포럼으로 그 역할을 다하고자 합니다.
// <br />
// <br />
// 대학인의 의지를 모아 지속 가능한 성장의 미래를 만들기 위한 의미 있는 발걸음에 여러분의
// 적극적인 성원과 참여를 부탁드립니다. 감사합니다.
// </p>
// `;

const MeetingsPage = () => {
  const [greetings, setGreetings] = useState('');

  useEffect(() => {
    (async () => {
      const data = await getGreetings();
      setGreetings(data);
    })();
  }, []);
  return (
    <Body>
      <PageTitle background="#ADCF9F">인사말</PageTitle>
      <SubNav />
      <ContentContainer>
        <DesContent>
          <div>{parse(greetings)}</div>
        </DesContent>
      </ContentContainer>
    </Body>
  );
};

export default MeetingsPage;
