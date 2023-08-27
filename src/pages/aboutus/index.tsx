import { Body, ContentContainer } from '../../components/aboutus/Layout';
import PageTitle from '../../components/aboutus/PageTitle';
import SubNav from '../../components/layout/subnav';

const AboutUsPage = () => {
  return (
    <Body>
      <PageTitle background="#ADCF9F">목표와 비전</PageTitle>
      <SubNav />
      <ContentContainer></ContentContainer>
    </Body>
  );
};

export default AboutUsPage;
