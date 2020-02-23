import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './modules/App';
import { IdentityContextProvider } from 'react-netlify-identity';



ReactDOM.render(<IdentityContextProvider url={"https://askharold.netlify.com"}><App /></IdentityContextProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (process.env.NODE_ENV !== 'production') {
  serviceWorker.unregister();
}

