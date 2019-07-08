import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import UserStore from "./contexts/UserContext";
import styled from "styled-components";
const Body = styled.div`
  font-family: Acumin Pro;
  background-color: #0c1d34;
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
