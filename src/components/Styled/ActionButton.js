import styled from "styled-components";
import { highlight, highlight_text } from "./colors";
const ActionButton = styled.button`
  width: 158px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${highlight};
  color: ${highlight_text};
  border-radius: 45px;
  img {
    width: 8px;
  }
  span {
    font-size: 8px;
  }
`;
export default ActionButton;
