import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

interface PageProp {
  title: string;
  url: string;
}

const menuList: PageProp[] = [
  {
    title: "목표와 비전",
    url: "/aboutus/objective",
  },
  {
    title: "설립배경 및 취지",
    url: "/aboutus/boe",
  },
  {
    title: "인사말",
    url: "/aboutus/greetings",
  },
  {
    title: "연혁",
    url: "/aboutus/history",
  },
  {
    title: "운영규율",
    url: "/aboutus/rules",
  },
  {
    title: "Contact Us",
    url: "/aboutus/contact",
  },
];

const SubNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SubNavContainer>
      {/* 제거   */}
      {/* <SubHome onClick={() => navigate('/aboutus')}>
        <SubHomeIcon />
      </SubHome> */}
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

/* 포럼소개  */
const SubNavContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  align-self: stretch;

  background: white;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.625rem;
  }
`;

const SubNavItem = styled.a<{ $current: boolean }>`
  display: flex;
  width: 200px;
  padding: 30.433px 23.321px 31.16px 23.489px;
  justify-content: center;
  align-items: center;
  background: white

  font-size: 1.25rem;
  color: black;
  cursor: pointer;
  ${(props) =>
    props.$current &&
    `
    font-size: 1.25rem;
    font-weight: 700;
    color: rgb(20 184 166);    /* 🟢 nav 글자색 hover */
    border-bottom: 10px solid rgb(20 184 166);

  `}

  @media (max-width: 1150px) {
    font-size: 1rem;
    ${(props) =>
      props.$current &&
      `
      font-size: 1rem;
      font-weight: 700;
      color: rgb(20 184 166);    /* 🟢 nav 글자색 hover */
    `}
  }
`;

export default SubNav;
