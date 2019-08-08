import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import UserStore from "./contexts/UserContext";
import styled from'styled-components/macro';
import { background } from "./components/Styled/colors";
const Body = styled.div`
  font-family: "acumin-pro", sans-serif;
  background-color: ${background};
  color: #fff;
`;

const MainApp = () => (
  <Body>
    <UserStore>
      <App />
    </UserStore>
  </Body>
);

ReactDOM.render(<MainApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
