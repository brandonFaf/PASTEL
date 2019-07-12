import styled from "styled-components";
import { highlight, highlight_text, lightBlue, lightBlue_text } from "./colors";

export const TeamButton = styled.div`
  background-color: transparent;
  font-weight: 900;
  height: 100%;
  border: none;
  font-size: 11px;
  text-transform: uppercase;
  &:focus {
    outline: none;
  }
`;
export const PickPage = styled.div`
  margin: 0 5vw;
  padding-bottom: 50px;
`;
const Bar = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  overflow: hidden;
  .container {
    position: absolute;
    display: block;
    width: 90vw;
    height: 100%;
    text-align: center;
    color: green;
  }
`;
export const BarVis = styled(Bar)`
  background: ${props => (props.active ? highlight : lightBlue)};
  left: 0;
  width: ${props => props.percent + "%"};
  .container {
    left: 0;
    color: ${props => (props.active ? highlight_text : lightBlue_text)};
  }
`;
export const BarHome = styled(Bar)`
  background: ${props => (props.active ? highlight : lightBlue)};
  right: 0;
  width: ${props => props.percent + "%"};
  .container {
    right: 0;
    color: ${props => (props.active ? highlight_text : lightBlue_text)};
  }
`;
export const Game = styled.div`
  font-size: 10px;
  display: grid;
  margin-bottom: 15px;
  grid-template-columns: 30vw 30vw 30vw;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: transparent;
  text-align: center;
`;
