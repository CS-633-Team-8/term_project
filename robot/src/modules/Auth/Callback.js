// src/Callback/Callback.js
import React from 'react';
import { withRouter } from 'react-router';
import AuthContext from '../Context/auth-context';

class Callback extends React.Component {
  render() {
    let auth = this.context;
    let props = this.props;
    auth.handleAuthentication().then(() => {
      props.history.push('/faqs');
    });
    return (
      <div>
      Loading user profile.
    </div>
    );
  }
}

Callback.contextType = AuthContext;

export default withRouter(Callback);