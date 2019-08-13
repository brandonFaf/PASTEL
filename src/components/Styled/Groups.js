import styled from "styled-components/macro";
import { wrong, highlight } from "./colors";
import Header from "./Header";
import { animated } from "react-spring";

export const GroupsSlider = styled(animated.div)`
  position: fixed;
  top: 0;
  z-index: 50;
  width: 90vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: "header" "guts" "button";
  grid-template-rows: 10vh 60vh 15vh;
  justify-content: center;
  justify-items: center;
  align-items: center;
  background-color: rgba(22, 51, 89, 0.95);
`;
export const GroupsSlidingHeader = styled(Header)`
  grid-template-columns: 10% 90%;
  height: 5vh;
  position: absolute;
  top: 0;
  width: 82vw;
  background-color: transparent;
`;
export const GroupSliderButtons = styled.div`
  grid-area: button;
  button {
    margin-bottom: 10px;
  }
`;

export const GroupList = styled.div`
  display: grid;
  grid-area: guts;
  align-self: start;
  width: 100%;
  grid-row-gap: 20px;
`;
export const Group = styled.div`
  display: grid;
  grid-template-areas: "active . name" "active photo name" "active photo details" "active . .";
  grid-template-columns: 5% 10% 40%;
  grid-template-rows: 8px 20px 12px 10px;
  grid-row-gap: 0;
  grid-column-gap: 10px;
`;
export const GroupPhoto = styled.div`
  grid-area: photo;
`;

export const GroupDetail = styled.div`
  display: grid;
  grid-area: details;
  font-size: 10px;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: 10px;
`;

export const GroupName = styled.div`
  grid-area: name;
  align-self: self-end;
  font-size: 15px;
  font-weight: 900;
  div {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export const GroupActive = styled.div`
  background-color: ${highlight};
  height: 100%;
  width: 50%;
  border-radius: 0px 10px 10px 0px;
  grid-row: 1/-1;
`;
export const GroupFormError = styled.div`
  font-size: 12px;
  color: ${wrong};
  margin-top: -10px;
  padding-bottom: 10px;
`;

export const CreateGroupForm = styled.div`
  display: flex;
  height: 70vh;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  fieldset {
    border: none;
    width: 70vw;
  }
`;
