import React, { useState, useEffect, useContext } from "react";
import Input from "./FloatingInput";
import useForm from "./hooks/useForm";
import ActionButton from "./Styled/ActionButton";
import { groupNameIsUnique, saveGroup } from "../data/firebaseGroupAPI";
import Toggle from "react-toggle";
import "./ToggleCSS.css";
import { CreateGroupForm, GroupFormError } from "./Styled/Groups";
import { UserContext } from "../contexts/UserContext";
const CreateGroup = ({ user, history, setHeader }) => {
  const { values, handleChange } = useForm({ groupName: "" });
  const [
    { groupNameValid, groupNameUnique, passcodeValid },
    setValid
  ] = useState({
    groupNameValid: true,
    groupNameUnique: true,
    passcodeValid: true
  });
  const { setGroup } = useContext(UserContext);
  const [makePrivate, setMakePrivate] = useState(false);
  const togglePrivate = () => {
    setMakePrivate(!makePrivate);
  };
  useEffect(() => {
    setHeader("Create A Group");
  }, [setHeader]);
  const submitForm = async e => {
    e.preventDefault();
    if (await validateForm()) {
      try {
        const group = { groupName: values.groupName };
        if (makePrivate) {
          group.private = true;
          group.passcode = values.passcode;
        }
        const groupId = await saveGroup(user.id, {
          ...group
        });
        group.id = groupId;
        setGroup(group);
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
      setValid({
        groupNameValid: gnv,
        passcodeValid,
        groupNameUnique
      });
      return false;
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
      <CreateGroupForm onSubmit={submitForm}>
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
            <GroupFormError className="error">
              Please enter a display name between 4 and 20 characters
            </GroupFormError>
          )}
          {!groupNameUnique && (
            <GroupFormError className="error">
              Display Name Taken
            </GroupFormError>
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
                <GroupFormError className="error">
                  Please Enter a Passcode
                </GroupFormError>
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
        <ActionButton onClick={submitForm} type="submit">
          NEXT
        </ActionButton>
      </CreateGroupForm>
    </>
  );
};

export default CreateGroup;
