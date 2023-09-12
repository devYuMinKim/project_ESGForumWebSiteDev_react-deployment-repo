import { DesContent } from "../../components/aboutus/DesContent";
import { Body, ContentContainer } from "../../components/aboutus/Layout";
import PageTitle from "../../components/aboutus/PageTitle";
import SubNav from "../../components/layout/subnav";

const RulesPage = () => {
  console.log(process.env.REACT_APP_API_URL);
  return (
    <Body>
      <PageTitle background="#ADCF9F">운영규율</PageTitle>
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
