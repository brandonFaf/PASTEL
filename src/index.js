import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import UserStore from './contexts/UserContext';
import styled from 'styled-components/macro';
import { background } from './components/Styled/colors';
import { BrowserRouter as Router } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

LogRocket.init('ubbstg/pastel');
setupLogRocketReact(LogRocket);

const Body = styled.div`
  font-family: 'acumin-pro', sans-serif;
  background-color: ${background};
  color: #fff;
`;
Sentry.init({
  dsn: 'https://7faa51524dc04dfd9246958ef613611e@sentry.io/1548429'
});

const MainApp = () => (
  <Body>
    <UserStore>
      <Router>
        <App />
      </Router>
    </UserStore>
  </Body>
);

ReactDOM.render(<MainApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
