import styled from "styled-components/macro";
import { highlight } from "./colors";
import Header from "./Header";

export const GroupsSlider = styled.div`
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
  grid-template-areas: "active name" "active name" "active details" "active .";
  grid-template-columns: 10% 60%;
  grid-template-rows: 8px 20px 12px 10px;
  grid-row-gap: 0;
`;

export const GroupDetail = styled.div`
  display: flex;
  grid-area: details;
  justify-content: space-between;
  align-self: self-end;
  font-size: 10px;
`;

export const GroupName = styled.div`
  grid-area: name;
  align-self: self-end;
  font-size: 15px;
  font-weight: 900;
`;
export const GroupActive = styled.div`
  background-color: ${highlight};
  height: 100%;
  width: 50%;
  border-radius: 0px 10px 10px 0px;
  grid-row: 1/-1;
`;
