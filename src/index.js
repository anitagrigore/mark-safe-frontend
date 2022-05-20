import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';
import {Auth0Provider} from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
        domain="mark-safe.eu.auth0.com"
        clientId="7vETCgAQem5RM9h3nizA4j49XM1RLNZw"
        redirectUri={window.location.origin}
        audience="marksafe-backend"
        scope="openid profile events:read"
    >
        <React.StrictMode>
            <Router>
                <App/>
            </Router>
        </React.StrictMode>
    </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
