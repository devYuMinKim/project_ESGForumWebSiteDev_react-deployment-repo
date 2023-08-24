import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as SubHomeIcon } from '../../../assets/icons/subhome.svg';

interface PageProp {
  title: string;
  url: string;
}

const menuList: PageProp[] = [
  {
    title: '목표와 비전',
    url: '/aboutus/objective',
  },
  {
    title: '설립배경 및 취지',
    url: '/aboutus/boe',
  },
  {
    title: '인사말',
    url: '/aboutus/meetings',
  },
  {
    title: '연혁',
    url: '/aboutus/history',
  },
  {
    title: '운영규율',
    url: '/aboutus/rules',
  },
  {
    title: 'Contact Us',
    url: '/aboutus/contact',
  },
];

const SubNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SubNavContainer>
      <SubHome onClick={() => navigate('/aboutus')}>
        <SubHomeIcon />
      </SubHome>
      {menuList.map((menu, i) => (
        <SubNavItem
          key={i}
          $current={location.pathname === menu.url}
          onClick={() => navigate(menu.url)}
        >
          <span>{menu.title}</span>
        </SubNavItem>
      ))}
    </SubNavContainer>
  );
};

const SubHome = styled.div`
  display: flex;
  width: 83.822px;
  padding: 0px 19.607px 0px 19.588px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;

  background: #a29790;
  cursor: pointer;
`;

const SubNavContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  align-self: stretch;

  background: #41578a;
`;

const SubNavItem = styled.a<{ $current: boolean }>`
  display: flex;
  width: 200px;
  padding: 30.433px 23.321px 31.16px 23.489px;
  justify-content: center;
  align-items: center;
  background: #41578a;

  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  ${(props) =>
    props.$current &&
    `
    font-size: 1.25rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 1);
    background: #F7901E;
  `}
`;

export default SubNav;
