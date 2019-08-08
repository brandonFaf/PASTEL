import styled from'styled-components/macro';
import {
  background,
  highlight,
  highlight_text,
  lightBlue,
  lightBlue_text,
  wrong
} from "./colors";

export const GameSection = styled.div`
  div.title {
    color: ${highlight};
    margin-bottom: 25px;
    margin-top: 25px;
    text-align: center;
  }
`;

export const ProgressBar = styled.div`
  position: relative;
  width: 90vw;
  height: 75px;
  margin-top: 25px;
  line-height: 75px;
  vertical-align: midle;
  overflow: hidden;
  font-weight: bold;
  font-size: 30px;
  border-bottom: 4px solid ${background};
`;

export const TeamName = styled.div`
  font-weight: normal;
`;

export const TeamButton = styled.div`
  background-color: transparent;
  font-weight: 700;
  border: none;
  font-size: 13px;
  text-transform: uppercase;
  display: grid;
  grid-template-rows: 15px;
  grid-auto-rows: 15px;
  align-items: center;
  &:focus {
    outline: none;
  }
`;
export const PickPage = styled.div`
  padding-bottom: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  background: ${props =>
    props.active ? (props.outcome === "WRONG" ? wrong : highlight) : lightBlue};
  left: 0;
  width: ${props => props.percent + "%"};
  .container {
    left: 0;
    color: ${props => (props.active ? highlight_text : lightBlue_text)};
  }
`;
export const MiddleButton = styled.div`
  display: grid;
  grid-template-rows: 15px 15px;
  align-items: center;
`;
export const BarHome = styled(Bar)`
  background: ${props =>
    props.active ? (props.outcome === "WRONG" ? wrong : highlight) : lightBlue};
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
  margin-bottom: 25px;
  grid-template-columns: 30vw 30vw 30vw;
  justify-content: center;
  align-items: center;
  height: 75px;
  background-color: transparent;
  text-align: center;
`;
