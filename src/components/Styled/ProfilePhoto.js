import React from 'react';
import styled from 'styled-components/macro';
import { highlight } from './colors';
const PhotoImg = styled.div`
  border-radius: 90px;
  justify-self: center;
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
  height: ${props => (props.size === 'large' ? '20vh' : '45px')};
  width: ${props => (props.size === 'large' ? '20vh' : '45px')};
  display: inline-grid;
  justify-content: center;
  align-items: center;
`;
const PhotoDiv = styled.div`
  border-radius: 90px;
  justify-self: center;
  height: ${props => (props.size === 'large' ? '20vh' : '45px')};
  width: ${props => (props.size === 'large' ? '20vh' : '45px')};
  background-color: #265087;
  color: ${highlight};
  font-size: ${props => (props.size === 'large' ? '50px' : '20px')};
  display: inline-grid;
  justify-content: center;
  align-items: center;
`;

const ProfilePhoto = ({ onClick, size, src, displayName }) => {
  let initals =
    displayName &&
    displayName.split(' ').reduce((acc, w) => {
      const word = w.toLowerCase();
      if (
        word !== 'the' &&
        word !== 'of' &&
        word !== 'a' &&
        word !== 'an' &&
        word !== 'to'
      ) {
        acc += w[0];
      }
      return acc;
    }, '');
  if (initals === '') {
    initals = '?';
  }
  if (src) {
    return <PhotoImg onClick={onClick} size={size} src={src} alt="profile" />;
  }
  return (
    <PhotoDiv onClick={onClick} size={size}>
      {initals.substring(0, 2).toUpperCase()}
    </PhotoDiv>
  );
};

export default React.memo(ProfilePhoto);
