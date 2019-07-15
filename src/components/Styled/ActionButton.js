import styled from "styled-components";
import { highlight, highlight_text } from "./colors";
const ActionButton = styled.button`
  width: ${props => (props.small ? "10vw" : "47vw")};
  display: flex;
  justify-content: space-around;
  justify-self: center;
  align-items: center;
  background-color: ${highlight};
  color: ${highlight_text};
  border-radius: ${props => (props.small ? "0 0 45px 45px" : "45px")};
  padding: 8px;
  z-index: 10;
  margin-bottom: ${props => (props.small ? "15px" : "-8px")};
  a {
    text-decoration: none;
    cursor: pointer;
  }
  img {
    width: 8px;
  }
  img.down {
    transform: rotate(180deg);
  }
  span {
    font-size: 8px;
  }
`;
export default ActionButton;
