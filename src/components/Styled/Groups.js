import styled from "styled-components";
import { highlight } from "./colors";

export const GroupList = styled.div`
  display: grid;
`;
export const Group = styled.div`
  display: grid;
`;

export const GroupDetail = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 10px;
`;

export const GroupName = styled.div`
  .current {
    color: ${highlight};
  }
`;
