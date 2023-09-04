import styled from 'styled-components';
import { Chairman } from '../../types/aboutus.interface';

interface SignatureCardProps {
  data: Chairman;
}

const SignatureCard = (props: SignatureCardProps) => {
  return (
    <div className="flex w-full justify-end">
      <SignatureContainer>
        <NameCard>
          <Position>{props.data.position}</Position>
          <Name>{props.data.name}</Name>
        </NameCard>
        <Signature>
          <Image1 alt="" src={props.data.image} />
        </Signature>
      </SignatureContainer>
    </div>
  );
};

export default SignatureCard;

const SignatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const NameCard = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Position = styled.p`
  font-family: 'Noto Sans';
  font-size: 18px;
  font-weight: 400;
  line-height: normal;
  color: rgba(0, 0, 0, 1);
  text-align: right;
  margin-bottom: 10px;
  margin-left: 5px;
`;
const Name = styled.p`
  font-family: 'Noto Sans';
  font-size: 32px;
  font-weight: 400;
  line-height: normal;
  color: rgba(0, 0, 0, 1);
  align-self: stretch;
  text-align: right;
`;
const Signature = styled.div`
  padding: 0 0 0 70px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Image1 = styled.img`
  width: 209px;
  height: 107.55px;
`;
