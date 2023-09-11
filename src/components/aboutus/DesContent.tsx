import styled from 'styled-components';

export const ActionListItem = (props: { icon?: React.ReactNode; children?: string }) => {
  const [head, body] = props.children?.split('::') ?? ['', ''];

  return (
    <div className="flex justify-center items-center gap-1">
      <ActionListIcon>{props.icon}</ActionListIcon>
      <div className="flex flex-col justify-center">
        <ContentHead>{head}</ContentHead>
        <ContentBody>{body}</ContentBody>
      </div>
    </div>
  );
};

export const BoEItem = (props: { children?: string }) => {
  const [head, body] = props.children?.split('::') ?? ['', ''];

  return (
    <div className="flex justify-center items-center gap-4">
      <BoeHead>{head}</BoeHead>
      <BoeBody>{body}</BoeBody>
    </div>
  );
};

export const DesContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  h2 {
    font-family: 'KOTRA_BOLD-Bold';
    font-size: 32px;
    font-weight: 700;
    line-height: normal;
    color: rgba(0, 0, 0, 1);
  }
  h3 {
    font-family: 'KOTRA_BOLD-Bold';
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
    color: rgba(27, 59, 134, 1);
  }
  > div {
    font-family: 'IBMPlexSansKR-Regular';
    padding: 12px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-size: 20px;
    font-weight: 500;
    line-height: normal;
    color: rgba(0, 0, 0, 1);
    gap: 1rem;
  }
`;
export const Title = styled.p``;
export const Subtitle = styled.p``;
export const Content = styled.div`
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 20px;
  font-weight: 500;
  line-height: normal;
  color: rgba(0, 0, 0, 1);
  gap: 1rem;
`;
export const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const ActionListIcon = styled.div`
  display: flex;
  width: 5rem;
  height: 5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
`;
const ContentHead = styled.span`
  color: #328924;
  font-family: IBMPlexSansKR-Regular;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const ContentBody = styled.span`
  color: #000;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const BoeHead = styled.span`
  color: rgba(0, 0, 0, 0.8);
  font-family: Roboto;
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const BoeBody = styled.span`
  flex: 1 0 0;
  color: #000;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
