import React, { useState } from "react";
import Input from "./FloatingInput";
import useForm from "./hooks/useForm";
import { ProfileForm } from "./Styled/ProfilePage";
import ActionButton from "./Styled/ActionButton";
import { groupNameIsUnique, saveGroup } from "../data/firebaseGroupAPI";
import Toggle from "react-toggle";
import "./ToggleCSS.css";
const CreateGroup = ({ user, history }) => {
  const { values, handleChange } = useForm({ groupName: "" });
  const [
    { groupNameValid, groupNameUnique, passcodeValid },
    setValid
  ] = useState({
    groupNameValid: true,
    groupNameUnique: true,
    passcodeValid: true
  });
  const [makePrivate, setMakePrivate] = useState(false);
  const togglePrivate = () => {
    setMakePrivate(!makePrivate);
  };
  const submitForm = async e => {
    e.preventDefault();

    if (await validateForm()) {
      try {
        const group = { groupName: values.groupName };
        if (makePrivate) {
          group.private = true;
          group.passcode = values.passcode;
        }
        await saveGroup(user.id, {
          ...group
        });
      } catch (e) {
        console.log(e);
        alert("Can't save right now. Try again Later");
      } finally {
        history.push("/");
      }
    }
  };

  const validateForm = async () => {
    let gnv, gnu;
    let pcv = true;
    if (!values.groupName) {
      gnv = false;
    } else {
      //username exists, is longer than 4 and less than 20
      gnv = values.groupName.length > 4 && values.groupName.length < 20;
      gnu = await groupNameIsUnique(values.groupName);
    }
    if (makePrivate && !values.passcode) {
      pcv = false;
    }

    setValid({
      groupNameValid: gnv,
      groupNameUnique: gnu,
      passcodeValid: pcv
    });
    const valid = gnv && gnu && pcv ? true : false;
    return valid;
  };
  return (
    <>
      <ProfileForm onSubmit={submitForm}>
        <fieldset>
          <Input
            autocomplete="off"
            id="groupName"
            label="Group Name"
            name="groupName"
            onChange={handleChange}
            value={values.groupName}
          />
          {!groupNameValid && (
            <label className="error">Invalid Display Name</label>
          )}
          {!groupNameUnique && (
            <label className="error">Display Name Taken</label>
          )}
          {makePrivate && (
            <>
              <Input
                id="passcode"
                label="Passcode"
                name="passcode"
                type="text"
                onChange={handleChange}
                value={values.passcode}
              />
              {!passcodeValid && (
                <label className="error">Please Enter a Passcode</label>
              )}
            </>
          )}
          <label className="toggle-label" htmlFor="private">
            Private?
          </label>
          <Toggle
            id="private"
            defaultChecked={makePrivate}
            onChange={togglePrivate}
          />
        </fieldset>
        <ActionButton type="submit">NEXT</ActionButton>
      </ProfileForm>
    </>
  );
};

export default CreateGroup;
