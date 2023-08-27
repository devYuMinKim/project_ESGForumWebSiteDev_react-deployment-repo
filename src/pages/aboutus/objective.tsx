import PageTitle from '../../components/aboutus/PageTitle';
import UFESGI from '../../components/aboutus/UFESGI';
import SubNav from '../../components/layout/subnav';
import { ActionList, ActionListItem, DesContent } from '../../components/aboutus/DesContent';
import { Body, ContentContainer } from '../../components/aboutus/Layout';

import { ReactComponent as ResearchIcon } from '../../assets/icons/aboutus-research.svg';
import { ReactComponent as NetworkIcon } from '../../assets/icons/aboutus-network.svg';
import { ReactComponent as SupportIcon } from '../../assets/icons/aboutus-support.svg';
import { ReactComponent as ValueIcon } from '../../assets/icons/aboutus-value.svg';

const ObjectivePage = () => {
  return (
    <Body>
      <PageTitle background="#ADCF9F">
        UFESGI-100 Movement
        <br />를 통한 ESG 실천
      </PageTitle>
      <SubNav />
      <ContentContainer>
        <DesContent>
          <h2>UFESGI-100 Movement</h2>
          <h3>지속가능한 발전, ESG 실천을 위해</h3>
          <div>
            100개 대학과 협력한다
            <br />
            100개의 실천 사례를 만든다
            <br />
            100개의 교육 성과를 낸다
          </div>
        </DesContent>

        <DesContent>
          <h2>ESG 실천</h2>
          <h3>뜻을 같이하는 대학인의 힘을 합쳐 다음을 실천하는 것</h3>
          <div>
            <ActionList>
              <ActionListItem icon={<ResearchIcon />}>
                연구 및 실천 프로그램 개발::기후변화 대응을 위한 ESG 경영의 정당성과 필요성을
                입증하고, 실천 가능한 프로그램을 개발
              </ActionListItem>
              <ActionListItem icon={<ValueIcon />}>
                ESG가치의 내재화::ESG의 가치를 대학의 교육, 연구, 행정에 내재화
              </ActionListItem>
              <ActionListItem icon={<SupportIcon />}>
                활동 지원::청년들의 지속가능한 미래와 ESG 가치를 위한 실천 활동 지원
              </ActionListItem>
              <ActionListItem icon={<NetworkIcon />}>
                실천 네트워크 구축::대학, 시민사회, 지방자치단체, ESG 혁신경영 기업과의 실천
                네트워크 구축
              </ActionListItem>
            </ActionList>
          </div>
        </DesContent>
        <UFESGI />
      </ContentContainer>
    </Body>
  );
};

export default ObjectivePage;
