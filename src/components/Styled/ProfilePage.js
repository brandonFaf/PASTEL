import styled from "styled-components";
import Edit from "../../img/Edit.svg";
import { animated } from "react-spring";

export const EditLabel = styled.label`
  background-image: url(${Edit});
  height: 25px;
  width: 25px;
  float: right;
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  top: 125px;
`;

export const ProfileForm = styled.form`
  display: grid;
  grid-template-rows: 30vh 45vh 5vh;
  justify-content: center;
  fieldset {
    border: none;
  }
`;
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
