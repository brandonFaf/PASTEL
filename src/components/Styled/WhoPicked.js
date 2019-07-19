import styled from "styled-components";
import { highlight, highlight_text, lightBlue, lightBlue_text } from "./colors";

const height = 20;

export const WhoPickedContainer = styled.div`
  height: ${height}vh;
  width: 90vw;
  display: flex;
  justify-content: space-around;
`;

export const PickGroup = styled.div`
  flex: 1;
  text-align: center;
`;
export const Divider = styled.div`
    border-right: 1px solid #fff;
  }
`;
