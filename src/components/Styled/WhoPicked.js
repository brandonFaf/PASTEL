import styled from "styled-components";
import { background } from "./colors";
export const WhoPickedContainer = styled.div`
  height: 100%;
  width: 90vw;
  display: flex;
  justify-content: space-around;
  background-color: rgba(22, 51, 89, 0.7);
`;

export const PickGroup = styled.div`
  flex: 1;
  text-align: center;
`;
export const Divider = styled.div`
  border-right: 4px solid ${background};
`;
