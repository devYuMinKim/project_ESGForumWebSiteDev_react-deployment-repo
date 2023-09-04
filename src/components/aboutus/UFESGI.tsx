import styled from 'styled-components';

const UFESGI = () => {
  return (
    <UFESGIContainer>
      <UFESGIItem>University</UFESGIItem>
      <SpacingVBar />
      <UFESGIItem>Forum</UFESGIItem>
      <SpacingVBar />
      <UFESGIItem>Environment</UFESGIItem>
      <SpacingVBar />
      <UFESGIItem>Social</UFESGIItem>
      <SpacingVBar />
      <UFESGIItem>Governance</UFESGIItem>
      <SpacingVBar />
      <UFESGIItem>Implementation</UFESGIItem>
    </UFESGIContainer>
  );
};

const UFESGIItem = (props: { children?: string }) => {
  return (
    <UFESGIItemContainer>
      <ItemHead>{props.children?.charAt(0)}</ItemHead>
      <ItemBody>{props.children?.slice(1)}</ItemBody>
    </UFESGIItemContainer>
  );
};

export default UFESGI;

const UFESGIItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  width: 200.343px;
  height: 37.852px;
`;

const ItemHead = styled.span`
  display: flex;
  width: 50.47px;
  height: 50.47px;
  flex-direction: column;
  justify-content: center;
  color: var(--gray-6, #f2f2f2);
  text-align: center;
  font-family: Roboto;
  font-size: 40.376px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 40.376px;
`;

const ItemBody = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: #666666;
`;

const SpacingVBar = styled.div`
  width: 3px;
  height: 30px;
  border-radius: 116px;
  background: rgba(243, 244, 246, 0.44);
`;

const UFESGIContainer = styled.div`
  display: flex;
  padding: 10px 0px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;
