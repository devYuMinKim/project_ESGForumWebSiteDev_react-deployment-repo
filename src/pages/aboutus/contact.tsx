import { Body, ContentContainer } from "../../components/aboutus/Layout";
import PageTitle from "../../components/aboutus/PageTitle";
import SubNav from "../../components/layout/subnav";

import bgHistory from "../../assets/img/history-bg.png";
import { DesContent } from "../../components/aboutus/DesContent";

const ContactPage = () => {
  return (
    <Body>
      <PageTitle background={bgHistory}>Contact Us</PageTitle>
      <SubNav />
      <ContentContainer>
        <DesContent>
          <h2>주소</h2>
          <h3>{`(준비중)`}</h3>

          <br />

          <h2>연락처</h2>
          <h3>e-mail: ufesgi1122@gmail.com</h3>
        </DesContent>
      </ContentContainer>
    </Body>
  );
};

export default ContactPage;
