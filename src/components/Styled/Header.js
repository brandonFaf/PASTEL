import styled from "styled-components";
import { background } from "./colors";
const Header = styled.div`
  padding: 16px 0;
  background-color: ${background};
  opacity: 0.7;
  align-items: center;
  display: grid;
  grid-template-columns: 90% 10%;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  div {
    margin-left: 10vw;
  }
`;
export default Header;
