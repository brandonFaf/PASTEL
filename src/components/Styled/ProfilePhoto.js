import React from "react";
import styled from'styled-components/macro';
import { lightBlue, highlight } from "./colors";
const PhotoImg = styled.img`
  border-radius: 90px;
  justify-self: center;
  height: ${props => (props.size === "large" ? "150px" : "30px")};
  width: ${props => (props.size === "large" ? "150px" : "30px")};
`;
const PhotoDiv = styled.div`
  border-radius: 90px;
  justify-self: center;
  height: ${props => (props.size === "large" ? "150px" : "30px")};
  width: ${props => (props.size === "large" ? "150px" : "30px")};
  background-color: ${lightBlue};
  color: ${highlight};
  font-size: ${props => (props.size === "large" ? "50px" : "12px")};
  display: inline-grid;
  justify-content: center;
  align-items: center;
`;

const ProfilePhoto = ({ onClick, size, src, displayName }) => {
  const initals = displayName && displayName.split(" ").map(w => w[0]);
  if (src) {
    return <PhotoImg onClick={onClick} size={size} src={src} alt="profile" />;
  }
  return (
    <PhotoDiv onClick={onClick} size={size}>
      {initals}
    </PhotoDiv>
  );
};

export default React.memo(ProfilePhoto);
