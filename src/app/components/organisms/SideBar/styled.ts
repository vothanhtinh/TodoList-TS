import { styled } from "styled-components";

export const NavbarWrapper = styled.nav`
  background-color: #fafafa;
  z-index: 1;
  width: 300px;
  position: fixed;
  padding-top: 28px;
  transition: transform 0.3s linear ease-in;
  bottom: 0;
  top: 43px;
  padding-left: 18px;
  padding-right: 18px;
`;

export const NavLinks = styled.ul`
  margin: 0;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding-left: 0;
  a {
    text-decoration: none;
  }
`;
