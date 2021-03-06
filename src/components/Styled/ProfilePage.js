import styled from 'styled-components/macro';
import Edit from '../../img/Edit.svg';
import { background } from './colors';

export const EditLabel = styled.label`
  background-image: url(${Edit});
  height: 20px;
  width: 20px;
  margin-left: -20px;
  float: right;
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  top: 110px;
  z-index: 20;
`;
export const ErrorLabel = styled.label`
  color: red;
`;

export const ProfileForm = styled.form`
  display: grid;
  grid-area: guts;
  grid-template-rows: 20vh 35vh 5vh;
  align-items: center;
  justify-content: center;
  justify-items: center;
  background-color: ${props => (props.side ? 'transparent' : background)};
  width: 100%;
  height: 100%;
  position: absolute;
  fieldset {
    border: none;
    align-self: baseline;
  }
`;
