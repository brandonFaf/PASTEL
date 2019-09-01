import styled from 'styled-components/macro';
import { wrong, highlight, background } from './colors';
import { Header } from './Header';
import { animated } from 'react-spring';

export const GroupsSlider = styled(animated.div)`
  position: fixed;
  top: 0;
  z-index: 70;
  width: 85vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: 'header' 'guts' 'button';
  grid-template-rows: 75px 60vh 15vh;
  justify-content: center;
  justify-items: center;
  align-items: center;
  overflow: hidden;
  background-color: rgba(22, 51, 89, 0.95);
`;
export const GroupsSlidingHeader = styled(Header)`
  position: absolute;
  top: 0;
  background-color: transparent;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  grid-template-areas: 'active photo name' 'active photo name' 'active photo details' 'active photo .';
  grid-template-columns: 10% 45px 1fr;
  grid-template-rows: 8px 20px 12px 10px;
  grid-row-gap: 0;
  grid-column-gap: 20px;
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
export const LeaveButton = styled.div`
  background-color: ${wrong};
  width: 100px;
  height: 50px;
  display: grid;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  color: #fff;
`;
export const LeaveGroupButton = styled.div`
  width: 20px;
  height: 20px;
  background-color: #e36655;
  color: #fff;
  font-size: 20px;
  border-radius: 90px;
  justify-self: end;
  align-self: center;
  grid-row: 2/4;
  text-align: center;
  line-height: 16px;
  font-weight: bold;
  grid-area: active;
`;
export const GroupActive = styled.div`
  background-color: ${highlight};
  height: 100%;
  width: 25%;
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
  align-items: center;
  flex-direction: column;
  background-color: ${background};
  height: 100vh;
  width: 100vw;
  z-index: 60;
  fieldset {
    border: none;
    width: 70vw;
  }
`;
