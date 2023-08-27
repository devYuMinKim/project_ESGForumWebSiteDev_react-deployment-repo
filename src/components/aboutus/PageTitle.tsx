import styled from 'styled-components';

interface PageTitleProps {
  background?: string;
  children?: React.ReactNode;
}

const PageTitle = (props: PageTitleProps) => {
  return (
    <PageTitleContainer $background={props.background}>
      <TitleContent>{props.children}</TitleContent>
    </PageTitleContainer>
  );
};

const TitleContent = styled.div<{ $dark?: boolean }>`
  color: ${(props) => (props.$dark ? '#374151' : '#f5f5f5')};
  font-family: Noto Sans;
  font-size: 54px;
  font-style: normal;
  font-weight: 700;
  line-height: 64px; /* 118.519% */
`;

const PageTitleContainer = styled.div<{ $background?: string }>`
  display: flex;
  height: 21rem;
  padding: 104px 63px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  background: ${(props) => props.$background || '#fff'};
`;

export default PageTitle;
