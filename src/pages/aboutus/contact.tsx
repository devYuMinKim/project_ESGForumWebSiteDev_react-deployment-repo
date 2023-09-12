import { Body, ContentContainer } from "../../components/aboutus/Layout";
import PageTitle from "../../components/aboutus/PageTitle";
import SubNav from "../../components/layout/subnav";

import bgHistory from "../../assets/img/history-bg.png";

const ContactPage = () => {
  return (
    <Body>
      <PageTitle background={bgHistory}>Contact Us</PageTitle>
      <SubNav />
      <ContentContainer></ContentContainer>
    </Body>
  );
};

export default ContactPage;
