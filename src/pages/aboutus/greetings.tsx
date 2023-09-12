import { useEffect, useState } from "react";
import { DesContent } from "../../components/aboutus/DesContent";
import { Body, ContentContainer } from "../../components/aboutus/Layout";
import PageTitle from "../../components/aboutus/PageTitle";
import SubNav from "../../components/layout/subnav";
import parse from "html-react-parser";
import { getGreetings } from "../../services/aboutus.service";
import SignatureCard from "../../components/aboutus/SignatureCard";
import { Greetings } from "../../types/aboutus.interface";

import bgHistory from "../../assets/img/history-bg.png";

const GreetingsPage = () => {
  const [greetings, setGreetings] = useState<Greetings>({
    greetings: "",
    chairman: {
      name: "",
      position: "",
      image: "",
    },
  });

  useEffect(() => {
    getGreetings().then((data) => {
      setGreetings(data);
    });
  }, []);

  return (
    <Body>
      <PageTitle background={bgHistory}>인사말</PageTitle>
      <SubNav />
      <ContentContainer>
        <DesContent>
          <h2>인사말</h2>
          <div>{parse(greetings.greetings)}</div>
        </DesContent>

        {/* FIXME: 사인은 예시입니다. 수정필요 */}
        <SignatureCard data={greetings.chairman} />
      </ContentContainer>
    </Body>
  );
};

export default GreetingsPage;
