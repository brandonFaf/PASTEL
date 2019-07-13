import styled from "styled-components";
import { lightBlue, highlight, highlight_text } from "./colors";
const WeekSlider = styled.div`
  position: fixed;
  bottom: 0;
  color: #fff;
  text-align: center;
  display: grid;
  width: 20vw;
  overflow: auto;
  height: 50px;
  padding: 0 40vw;
  grid-template-columns: repeat(19, 20vw);
  background-color: ${lightBlue};
  align-items: center;
  z-index: 12;
  scroll-snap-type: x mandatory;
  border-top: solid 5px ${highlight};
  box-shadow: 0px -4px 17px -1px rgba(0, 0, 0, 1);

  div {
    scroll-snap-align: center;
  }
  .active {
    color: ${highlight_text};
    background-color: ${highlight};
    border-radius: 45px;
    padding: 3px 0;
    div {
      font-size: 9px;
      line-height: 92.1%;
      font-family: Roboto;
      font-style: normal;
    }
  }
`;
export default WeekSlider;
