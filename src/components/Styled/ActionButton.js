import styled from 'styled-components/macro';
import { highlight, highlight_text, wrong } from './colors';
const ActionButton = styled.button`
  width: ${props => (props.small ? '10vw' : '47vw')};
  display: flex;
  justify-content: space-around;
  justify-self: center;
  align-items: center;
  background-color: ${props =>
    props.hallow ? 'transparent' : props.red ? wrong : highlight};
  color: ${props => (props.hallow || props.red ? '#DBDBDB' : highlight_text)};
  border-radius: ${props => (props.small ? '0 0 45px 45px' : '45px')};
  padding: 8px;
  z-index: 10;
  border: ${props => (props.hallow ? '1px solid #DBDBDB' : 'none')};
  font-size: 11px;
  font-weight: bold;
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
  :focus {
    outline: none;
  }
`;
export default ActionButton;
