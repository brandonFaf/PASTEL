import styled from "styled-components";
import { background, highlight } from "./colors";
const Header = styled.div`
  padding: 16px 0;
  background-color: ${background};
  opacity: 0.85;
  z-index: 12;
  backdrop-filter: blur(5px);
  align-items: center;
  display: grid;
  grid-template-columns: 90% 10%;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  div.header-text {
    margin-left: 10vw;
    /* display: grid;
    grid-template-columns: 1fr 1fr 1fr; */
  }
  span {
    font-size: 8px;
    font-weight: bold;
  }
  .highlight {
    color: ${highlight};
  }
`;
export default Header;
