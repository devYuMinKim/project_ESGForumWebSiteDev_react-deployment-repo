import styled from 'styled-components';

export const Body = styled.div`
  display: flex;
  max-width: 1200px;
  // padding: 10px 140px;
  margin: 0 auto;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

export const Description = styled.div`
  display: flex;
  padding: 30px 40px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 75px;
  align-self: stretch;
`;

export const ContentContainer = styled.div`
  display: flex;
  padding: 1.875rem 2.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 3rem;
  align-self: stretch;
`;
