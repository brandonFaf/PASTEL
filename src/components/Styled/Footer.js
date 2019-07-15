import styled from "styled-components";
import { animated } from "react-spring";
import { background } from "./colors";
const Footer = styled(animated.div)`
  position: fixed;
  text-align: center;
  height: 95vh;
  top: 91vh;
  background-color: ${background};
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default Footer;
