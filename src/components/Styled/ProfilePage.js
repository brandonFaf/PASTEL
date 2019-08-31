import styled from 'styled-components/macro';
import Edit from '../../img/Edit.svg';

export const EditLabel = styled.label`
  background-image: url(${Edit});
  height: 20px;
  width: 20px;
  margin-left: -20px;
  float: right;
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  top: 125px;
`;

export const ProfileForm = styled.form`
  display: grid;
  grid-area: guts;
  grid-template-rows: 25vh 37vh 5vh;
  justify-content: center;
  justify-items: center;
  fieldset {
    border: none;
  }
`;
