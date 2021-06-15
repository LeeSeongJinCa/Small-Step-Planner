import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import { GrSteps } from "../assets";

const Header = () => {
  return (
    <HeaderWrap className="flex-center">
      <Link to="/" className="flex-center">
        <GrSteps />
        <h1>Small Step 스몰스텝</h1>
      </Link>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.header`
  width: 100%;
  height: 48px;
  background-color: #0064ff;
  color: #fff;
  user-select: none;
  z-index: 8;
  a {
    height: 100%;
    color: white;
    text-decoration: none;
    svg {
      width: 24px;
      height: 24px;
      margin-right: 12px;
      polygon {
        stroke: white;
      }
    }
  }
`;

export default Header;
