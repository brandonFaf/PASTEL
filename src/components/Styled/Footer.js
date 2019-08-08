import styled from'styled-components/macro';
import { animated } from "react-spring";
import { background } from "./colors";
const Footer = styled(animated.div)`
  position: fixed;
  text-align: center;
  background-color: ${background};
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default Footer;
