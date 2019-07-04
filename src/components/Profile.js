/* eslint-disable no-useless-escape */
import React, { useState, useRef } from "react";
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase/app";
import "firebase/storage";
import { updateUser, displayNameIsUnique } from "../data/firebaseUserAPI";
import useForm from "./useForm";
const Profile = ({ currentUser }) => {
  const fileUploader = useRef();
  const { values, handleChange } = useForm({
    ...currentUser
  });
  const [file, setFile] = useState();
  // const [{ email, phoneNumber, photoURL }, setState] = useState();
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
      updateUser(currentUser.id, {
        displayName: values.displayName,
        email: values.email || "",
        phoneNumber: values.phoneNumber || ""
      });
      if (file) {
        fileUploader.startUpload(file);
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
      dnu = await displayNameIsUnique(values.displayName, currentUser.id);
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
        updateUser(currentUser.id, { photoURL });
        onchange({ target: { name: "photoURL", value: photoURL } });
      });
  };

  const handleUploadStart = () => console.log("starting");
  const handleUploadError = error => {
    console.error(error);
  };
  const onChangeHandler = event => {
    const {
      target: { files }
    } = event;
    setFile(files[0]);
  };

  return (
    <>
      <form
        onSubmit={submitForm}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px"
        }}
      >
        <label>Display Name:</label>
        {!displayNameValid && (
          <label className="error">Invalid Display Name</label>
        )}
        {!displayNameUnique && (
          <label className="error">Display Name Taken</label>
        )}
        <input
          type="text"
          name="displayName"
          value={values.displayName}
          onChange={handleChange}
        />
        <label>Phone Number:</label>
        {!phoneNumberValid && (
          <label className="error">Invalid Phone number</label>
        )}
        <input
          type="text"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
        />
        <label>Email:</label>
        {!emailValid && <label className="error">Invalid email</label>}
        <input
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <label>Profile Photo:</label>
        {values.photoURL ? (
          <img alt="profilePhoto" src={values.photoURL} />
        ) : (
          <span>No Photo Selected</span>
        )}
        <FileUploader
          accept="image/*"
          name="avatar"
          randomizeFilename
          storageRef={firebase.storage().ref("images")}
          onChange={onChangeHandler}
          ref={fileUploader}
          onUploadStart={handleUploadStart}
          onUploadError={handleUploadError}
          onUploadSuccess={handleUploadSuccess}
        />
        <button>Cancel</button>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Profile;
