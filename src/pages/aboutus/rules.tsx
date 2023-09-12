import { DesContent } from "../../components/aboutus/DesContent";
import { Body, ContentContainer } from "../../components/aboutus/Layout";
import PageTitle from "../../components/aboutus/PageTitle";
import SubNav from "../../components/layout/subnav";

import bgHistory from "../../assets/img/history-bg.png";

const RulesPage = () => {
  return (
    <Body>
      <PageTitle background={bgHistory}>운영규율</PageTitle>
      <SubNav />
      <ContentContainer>
        {/* FIXME: No data yet */}
        <DesContent>
          <h2>운영규율은</h2>
          <h3>☞ 현재준비중입니다</h3>
        </DesContent>
      </ContentContainer>
    </Body>
  );
};

export default RulesPage;
