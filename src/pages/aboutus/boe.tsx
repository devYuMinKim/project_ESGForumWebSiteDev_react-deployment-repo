import { BoEItem, DesContent } from "../../components/aboutus/DesContent";
import { Body, ContentContainer } from "../../components/aboutus/Layout";
import PageTitle from "../../components/aboutus/PageTitle";
import SubNav from "../../components/layout/subnav";

import bgHistory from "../../assets/img/history-bg.png";

// Background of Establishment
const BoEPage = () => (
  <Body>
    <PageTitle background={bgHistory}>설립배경 및 취지</PageTitle>
    <SubNav />
    <ContentContainer>
      <DesContent>
        <h2>설립배경 및 취지</h2>
        <h3>지속가능한 경제와 미래를 위해서</h3>
        <div>
          <p>
            ESG는 환경, 사회, 거버넌스의 혁신을 통한 지속 가능한 경제와 미래를 목표로 한다. <br />
            <br />
            전 지구적인 기후 위기와 나날이 격화되는 분쟁 앞에서 ESG는 시대적 반성과 문명적 전환으로
            연결되는 우리 모두의 각성이며 실천의 시작이라고 할 수 있다. UN과 국제사회가 시작하고,
            의식 있는 투자자와 기업이 이에 호응하면서 이제 ESG는 전 지구적 경제 규범으로 자리
            잡아가고 있다. 하지만 기후 위기의 심각성은 더욱 강한 ESG 체제, 더욱 획기적인 ESG 실천을
            요구하고 있다. ESG를 일부 기업과 투자 시장에만 맡겨 놓을 수는 없는 것이다. 이제 대학은
            문명적 위기 앞에서 시대적 소명을 실천하기 위해 앞장 설 때가 되었다. <br />
            <br />
            이에 뜻을 같이하는 대학인들이 힘을 합쳐 대학ESG실천포럼을 창립하고 다음과 같은 사업을
            실천하고자 한다. <br />
            지속 가능한 미래를 위한 대학의 실천에 많은 분의 참여와 성원이 있기를 기대한다.
          </p>
          <div className="flex flex-col gap-8 py-6">
            <BoEItem>
              첫째:: 대학ESG실천포럼은 다양한 연구와 실천을 통해 지속 가능한 경제와 ESG 경영의
              정당성과 필요성을 입증하고 실천 가능한 프로그램을 개발하여 기후 위기를 극복하는 데
              앞장선다.
            </BoEItem>
            <BoEItem>
              둘째:: 대학ESG실천포럼은 대학이 ESG의 가치를 교육, 연구, 행정에 내재화하고 학생을
              비롯한 구성원과 함께 지속 가능한 미래를 만들어 가는 공동체가 될 수 있도록 모든 대학과
              함께 협력한다.
            </BoEItem>
            <BoEItem>
              셋째:: 대학ESG실천포럼은 대학생들을 비롯한 청년들의 지속 가능한 미래와 ESG 가치를 위한
              실천 활동을 적극 지원한다.
            </BoEItem>
            <BoEItem>
              넷째:: 대학ESG실천포럼은 지속 가능한 미래를 실현하기 위하여 시민사회, 지방 자치단체,
              ESG 혁신경영 기업과의 실천 네트워크를 구축한다.
            </BoEItem>
          </div>
        </div>
      </DesContent>
    </ContentContainer>
  </Body>
);

export default BoEPage;
