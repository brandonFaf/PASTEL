import React, { useState } from "react";
import Input from "./FloatingInput";
import useForm from "./hooks/useForm";
import { ProfileForm } from "./Styled/ProfilePage";
import ActionButton from "./Styled/ActionButton";
import { groupNameIsUnique, saveGroup } from "../data/firebaseGroupAPI";

const CreateGroup = ({ user, history }) => {
  const { values, handleChange } = useForm({ groupName: "" });
  const [{ groupNameValid, groupNameUnique }, setValid] = useState({
    groupNameValid: true,
    groupNameUnique: true
  });

  const submitForm = async e => {
    e.preventDefault();

    if (await validateForm()) {
      try {
        await saveGroup(user.id, {
          groupName: values.groupName
        });
      } catch (e) {
        alert("Can't save right now. Try again Later");
      } finally {
        history.push("/");
      }
    }
  };

  const validateForm = async () => {
    let gnv, gnu;
    if (!values.groupName) {
      gnv = false;
    } else {
      //username exists, is longer than 4 and less than 20
      gnv = values.groupName.length > 4 && values.groupName.length < 20;
      gnu = await groupNameIsUnique(values.groupName);
    }

    setValid({
      groupNameValid: gnv,
      groupNameUnique: gnu
    });
    const valid = gnv && gnu ? true : false;
    return valid;
  };
  return (
    <>
      <ProfileForm onSubmit={submitForm}>
        <fieldset>
          <Input
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
        </fieldset>
        <ActionButton type="submit">NEXT</ActionButton>
      </ProfileForm>
    </>
  );
};

export default CreateGroup;
