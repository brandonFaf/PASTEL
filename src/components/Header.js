import React from 'react';
import { Header as H } from './Styled/Header';
import ProfilePhoto from './Styled/ProfilePhoto';
import hamburger from '../img/Hamburger.svg';
import closeX from '../img/close.svg';

const Header = ({
  style,
  user,
  headerText,
  close,
  toggleProfile,
  toggleGroups
}) => {
  return (
    <H style={{ ...style }}>
      {user && <img src={hamburger} alt={'hamburger'} onClick={toggleGroups} />}
      {close && <img src={closeX} alt="close" onClick={close} />}
      <div className="header-text">{headerText}</div>
      {user && (
        <ProfilePhoto
          onClick={toggleProfile}
          displayName={user.displayName}
          src={user.photoURL}
          size="small"
        />
      )}
    </H>
  );
};

export default Header;
