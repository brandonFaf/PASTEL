import React, { useState } from "react";
import Input from "./FloatingInput";
import ActionButton from "./Styled/ActionButton";
import { addUserToGroup } from "../data/firebaseGroupAPI";

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
    <>
      <Input
        autocomplete="off"
        id="passcode"
        label="Passcode"
        name="passcode"
        onChange={handleChange}
        value={passcode}
      />
      {error && (
        <div>
          That passcode is incorrect. Please Try Again with a different passcode{" "}
        </div>
      )}
      <ActionButton onClick={submit}>Join</ActionButton>
    </>
  );
};

export default Passcode;
