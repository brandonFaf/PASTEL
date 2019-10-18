/* eslint-disable no-useless-escape */
import React, { useState, useContext } from 'react';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase/app';
import 'firebase/storage';
import { updateUser, displayNameIsUnique } from '../data/firebaseUserAPI';
import useForm from './hooks/useForm';
import Input from './FloatingInput';
import ProfilePhoto from './Styled/ProfilePhoto';
import { ProfileForm, EditLabel, ErrorLabel } from './Styled/ProfilePage';
import ActionButton from './Styled/ActionButton';
import Toggle from 'react-toggle';
import './ToggleCSS.css';
import { UserContext } from '../contexts/UserContext';
import { GroupFormError } from './Styled/Groups';

const Profile = ({ user, history, toggle, setHeader }) => {
  const { values, handleChange } = useForm({
    ...user
  });
  const { setUser, setPhotoURL } = useContext(UserContext);
  const [
    {
      displayNameValid,
      phoneNumberValid,
      displayNameUnique,
      phoneNumberMissing
    },
    setValid
  ] = useState({
    displayNameValid: true,
    phoneNumberValid: true,
    displayNameUnique: true,
    phoneNumberMissing: false
  });
  if (setHeader) {
    setHeader('Profile Details');
  }
  const submitForm = async e => {
    e.preventDefault();

    if (await validateForm()) {
      if (!allowNotifications) {
        values.phoneNumber = '';
      }
      try {
        await updateUser(user.id, {
          displayName: values.displayName,
          phoneNumber: values.phoneNumber || '',
          hasVisited: true,
          notifications: allowNotifications
        });
        await setUser(user.id);
      } catch (e) {
        alert("Can't save right now. Try again Later");
      } finally {
        if (history) {
          history.push('/');
        } else {
          toggle();
        }
      }
    }
  };

  const validateForm = async () => {
    let dnv, pv, dnu, pm;
    if (!values.displayName) {
      dnv = false;
    } else {
      //username exists, is longer than 4 and less than 20
      dnv = values.displayName.length >= 2 && values.displayName.length < 30;
      dnu = await displayNameIsUnique(values.displayName, user.id);
    }

    //phonenumber validation

    if (allowNotifications) {
      pm = !values.phoneNumber;
      var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      pv = values.phoneNumber ? phoneno.test(String(values.phoneNumber)) : true;
    } else {
      pv = true;
      pm = false;
    }

    console.log('pv:', pv);

    setValid({
      displayNameValid: dnv,
      phoneNumberValid: pv,
      displayNameUnique: dnu,
      phoneNumberMissing: pm
    });
    const valid = dnv && pv && dnu && !pm ? true : false;
    return valid;
  };
  const handleUploadSuccess = filename => {
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(photoURL => {
        updateUser(user.id, { photoURL });
        setPhotoURL(photoURL);
        handleChange({ target: { name: 'photoURL', value: photoURL } });
      });
  };
  const [allowNotifications, setAllowNotifications] = useState(
    user.notifications
  );
  const toggleNotifications = () => {
    setAllowNotifications(!allowNotifications);
  };
  const handleUploadStart = () => console.log('starting');
  const handleUploadError = error => {
    console.error(error);
  };

  return (
    <>
      <ProfileForm onSubmit={submitForm} side>
        {user && (
          <div style={{ justifySelf: 'center' }}>
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
                filename={() => user.id}
                storageRef={firebase.storage().ref('images')}
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
            <GroupFormError className="error">
              Invalid Display Name
            </GroupFormError>
          )}
          {!displayNameUnique && (
            <GroupFormError className="error">
              Display Name Taken
            </GroupFormError>
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
                <div>
                  <ErrorLabel className="error">
                    Invalid Phone number
                  </ErrorLabel>
                </div>
              )}
              {phoneNumberMissing && (
                <div>
                  <ErrorLabel className="error">
                    Phone number required for notifications
                  </ErrorLabel>
                </div>
              )}
            </>
          )}
          <label className="toggle-label" htmlFor="notifications">
            Notifications
          </label>
          <Toggle
            id="notifications"
            defaultChecked={allowNotifications}
            onChange={toggleNotifications}
          />
        </fieldset>
        <ActionButton type="submit">Save</ActionButton>
      </ProfileForm>
    </>
  );
};

export default Profile;
