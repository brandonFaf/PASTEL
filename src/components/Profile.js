/* eslint-disable no-useless-escape */
import React, { useState, useContext } from "react";
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase/app";
import "firebase/storage";
import { updateUser, displayNameIsUnique } from "../data/firebaseUserAPI";
import useForm from "./hooks/useForm";
import Input from "./FloatingInput";
import ProfilePhoto from "./Styled/ProfilePhoto";
import { ProfileForm, EditLabel } from "./Styled/ProfilePage";
import ActionButton from "./Styled/ActionButton";
import Toggle from "react-toggle";
import "./ToggleCSS.css";
import { UserContext } from "../contexts/UserContext";
import Header from "./Styled/Header";
import styled from "styled-components";

const ProfileHeader = styled(Header)`
  height: 5vh;
  position: absolute;
  top: 0;
  width: 82vw;
  background-color: transparent;
`;

const Profile = ({ user, history, toggleProfile }) => {
  const { values, handleChange } = useForm({
    ...user
  });
  const { setPhotoURL } = useContext(UserContext);
  const [
    { displayNameValid, emailValid, phoneNumberValid, displayNameUnique },
    setValid
  ] = useState({
    displayNameValid: true,
    emailValid: true,
    phoneNumberValid: true,
    displayNameUnique: true
  });

  const submitForm = async e => {
    e.preventDefault();

    if (await validateForm()) {
      try {
        await updateUser(user.id, {
          displayName: values.displayName,
          email: values.email || "",
          phoneNumber: values.phoneNumber || ""
        });
      } catch (e) {
        alert("Can't save right now. Try again Later");
      } finally {
        history.push("/");
      }
    }
  };

  const validateForm = async () => {
    let dnv, ev, pv, dnu;
    if (!values.displayName) {
      dnv = false;
    } else {
      //username exists, is longer than 4 and less than 20
      dnv = values.displayName.length > 4 && values.displayName.length < 20;
      dnu = await displayNameIsUnique(values.displayName, user.id);
    }
    //email is valid form
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    ev = values.email ? re.test(String(values.email).toLowerCase()) : true;

    //phonenumber validation

    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    pv = values.phoneNumber ? phoneno.test(String(values.phoneNumber)) : true;

    setValid({
      displayNameValid: dnv,
      emailValid: ev,
      phoneNumberValid: pv,
      displayNameUnique: dnu
    });
    const valid = dnv && ev && pv && dnu ? true : false;
    return valid;
  };
  const handleUploadSuccess = filename => {
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(photoURL => {
        updateUser(user.id, { photoURL });
        setPhotoURL(photoURL);
        handleChange({ target: { name: "photoURL", value: photoURL } });
      });
  };
  const [allowNotifications, setAllowNotifications] = useState(false);
  const toggleNotifications = () => {
    setAllowNotifications(!allowNotifications);
  };
  const handleUploadStart = () => console.log("starting");
  const handleUploadError = error => {
    console.error(error);
  };

  return (
    <>
      <ProfileForm onSubmit={submitForm}>
        {toggleProfile && (
          <ProfileHeader>
            <div>Profile</div>
            {user && <span onClick={toggleProfile}>X</span>}
          </ProfileHeader>
        )}
        {user && (
          <div style={{ justifySelf: "center" }}>
            <ProfilePhoto
              size="large"
              src={values.photoURL}
              displayName={values.displayName}
            />
            <EditLabel>
              <FileUploader
                hidden
                accept="image/*"
                name="avatar"
                randomizeFilename
                storageRef={firebase.storage().ref("images")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
              />
            </EditLabel>
          </div>
        )}

        <fieldset>
          <Input
            id="displayName"
            label="Name"
            name="displayName"
            onChange={handleChange}
            value={values.displayName}
          />
          {!displayNameValid && (
            <label className="error">Invalid Display Name</label>
          )}
          {!displayNameUnique && (
            <label className="error">Display Name Taken</label>
          )}

          {allowNotifications && (
            <>
              <Input
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                type="phone"
                onChange={handleChange}
                value={values.phoneNumber}
              />
              {!phoneNumberValid && (
                <label className="error">Invalid Phone number</label>
              )}
              <Input
                id="email"
                label="Email"
                name="email"
                type="email"
                onChange={handleChange}
                value={values.email}
              />
              {!emailValid && <label className="error">Invalid email</label>}
            </>
          )}
          <Toggle
            id="notifications"
            defaultChecked={allowNotifications}
            onChange={toggleNotifications}
          />
          <label className="toggle-label" htmlFor="notifications">
            Notifications
          </label>
        </fieldset>
        <ActionButton type="submit">NEXT</ActionButton>
      </ProfileForm>
    </>
  );
};

export default Profile;
