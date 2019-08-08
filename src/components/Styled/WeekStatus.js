import styled from'styled-components/macro';
import { highlight } from "./colors";
const WeekStatus = styled.div`
  display: grid;
  grid-auto-flow: row;
  justify-content: center;
  align-items: center;
  .week {
    font-size: 10px;
    line-height: 12px;
  }
  .main {
    font-size: 25px;
    line-height: 30px;
    margin-bottom: 10px;
  }
  .streak {
    font-size: 15px;
    line-height: 18px;
  }
  strong {
    color: ${highlight};
  }
`;
export default WeekStatus;
