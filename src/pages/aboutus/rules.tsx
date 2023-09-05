import { Body, ContentContainer } from '../../components/aboutus/Layout';
import PageTitle from '../../components/aboutus/PageTitle';
import QuillEditor from '../../components/editor/quill-editor';
import SubNav from '../../components/layout/subnav';

const RulesPage = () => {
  console.log(process.env.REACT_APP_API_URL);
  return (
    <Body>
      <PageTitle background="#ADCF9F">운영규율</PageTitle>
      <SubNav />
      <ContentContainer>
        <QuillEditor />
      </ContentContainer>
    </Body>
  );
};

export default RulesPage;
