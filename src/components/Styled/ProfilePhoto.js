import styled from "styled-components";
const ProfilePhoto = styled.img`
  border-radius: 90px;
  justify-self: center;
  height: ${props => (props.large ? "150px" : "30px")};
  width: ${props => (props.large ? "150px" : "30px")};
`;
export default ProfilePhoto;
