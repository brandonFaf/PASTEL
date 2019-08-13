import React, { useState } from "react";
import Input from "./FloatingInput";
import ActionButton from "./Styled/ActionButton";
import { addUserToGroup } from "../data/firebaseGroupAPI";
import { GroupFormError } from "./Styled/Groups";

const Passcode = ({ group, history, user }) => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const handleChange = e => {
    setPasscode(e.target.value);
  };
  const submit = async () => {
    if (passcode === group.passcode) {
      await addUserToGroup(group.id, user.id);
      history.push("/");
    } else {
      setError(true);
    }
  };
  return (
    <div style={{ width: "70vw" }}>
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
      <ActionButton onClick={submit}>Join</ActionButton>
    </div>
  );
};

export default Passcode;
