import styled from "styled-components";
import { animated } from "react-spring";
import Header from "./Header";
export const SlidingPage = styled(animated.div)`
  position: fixed;
  top: 0;
  z-index: 50;
  width: 90vw;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: rgba(22, 51, 89, 0.95);
`;
export const SlidingHeader = styled(Header)`
  grid-template-columns: ${props => (props.left ? "10% 90%" : "90% 10%")};
  height: 5vh;
  position: absolute;
  top: 0;
  width: 82vw;
  background-color: transparent;
`;
