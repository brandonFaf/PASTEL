import styled from 'styled-components/macro';
import { background, highlight } from './colors';
export const Header = styled.div`
  height: 75px;
  display: grid;
  font-weight: bold;
  font-size: 15px;
  width: 100%;
  grid-template-columns: 70px 1fr 70px;
  justify-content: center;
  align-items: center;
  justify-items: center;
  text-transform: uppercase;
  opacity: 0.75;
  z-index: 12;
  backdrop-filter: blur(5px);
  background-color: ${background};

  .header-middle {
    text-align: center;
  }
`;
export const HeaderGroupName = styled.div`
  font-size: 14px;
  color: ${highlight};
`;
