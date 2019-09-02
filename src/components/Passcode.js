import React, { useState } from 'react';
import styled from 'styled-components/macro';
import Input from './FloatingInput';
import ActionButton from './Styled/ActionButton';
import { GroupFormError } from './Styled/Groups';

const Passcode = ({ group, changeStage, goToConfirm }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const handleChange = e => {
    setPasscode(e.target.value);
  };
  const submit = async () => {
    if (passcode === group.passcode) {
      changeStage();
      goToConfirm(group);
    } else {
      setError(true);
    }
  };
  return (
    <div style={{ width: '70vw' }}>
      <Input
        autocomplete="off"
        id="passcode"
        label="Passcode"
        name="passcode"
        onChange={handleChange}
        value={passcode}
      />
      {error && (
        <GroupFormError>
          That passcode is incorrect. Please try again with a different passcode
        </GroupFormError>
      )}
      <ButtonContainer>
        <Button onClick={submit}>Join</Button>
        <Button onClick={changeStage}>Cancel</Button>
      </ButtonContainer>
    </div>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Button = styled(ActionButton)`
  margin-bottom: 15px;
`;

export default Passcode;
