import styled from 'styled-components/macro';
import LogoImage from '../../img/Logo.gif';
const Logo = styled.div`
  height: 35vh;
  width: 80vw;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url(${LogoImage});
`;
export default Logo;
