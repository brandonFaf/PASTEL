import styled from "styled-components";
import { highlight, highlight_text, lightBlue, lightBlue_text } from "./colors";

export const TeamButton = styled.button`
  background-color: ${props => (props.active ? highlight : lightBlue)};
  color: ${props => (props.active ? highlight_text : lightBlue_text)};
  font-weight: 900;
  height: 100%;
  border: none;
  font-size: 11px;
`;
export const PickPage = styled.div`
  margin: 0 20px;
`;
export const Game = styled.div`
  font-size: 10px;
  display: grid;
  margin-top: 15px;
  grid-template-columns: 5fr 3fr 5fr;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: ${lightBlue};
  color: ${lightBlue_text};
  text-align: center;
`;
