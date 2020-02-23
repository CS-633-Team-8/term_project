import React from 'react';
import Form, { Field, FormFooter } from '@atlaskit/form';
import Button, { ButtonGroup } from '@atlaskit/button';
import TextField from '@atlaskit/textfield';
import Banner from '@atlaskit/banner';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import styled from 'styled-components';
import ModalDialog, { ModalTransition, ModalFooter } from '@atlaskit/modal-dialog';
import {
  Redirect,
} from 'react-router-dom';

const Container = styled.div `
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;
`;

const Icon = <WarningIcon label="Warning icon" secondaryColor="inherit" />;

const WarningBanner = ({ isOpen,  message}) => (
  <Banner icon={Icon} isOpen={isOpen} appearance="warning">
    {message}
  </Banner>
);

class LoginAuto extends React.Component {
  
  state = { redirectToReferrer: false };

  login = () => {
    this.props.identity.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  register = () => {
    this.props.identity.register(() => {
      this.setState({ redirectToReferrer: true });
    })
  }



  render() {
    let { from } = { from: { pathname: '/faqs' } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div>
        <Container>
          <h3>You are trying to view a protected page. Please log in</h3>
          <ButtonGroup appearance="primary">
            <Button onClick={this.login} appearance="primary">
              Log In
            </Button>
            <Button onClick={this.register} appearance="default">
              Register
            </Button>
          </ButtonGroup>
        </Container>
      </div>
    );
  }
}

export default function Login(props) {
  const { loginUser } = props;
  const formRef = React.useRef()
  const [msg, setMsg] = React.useState("")
  const [isLoading, load] = useLoading()
 
  
  return(
  <div>
  <Container>
    <div
      style={{
        display: 'flex',
        width: '400px',
        maxWidth: '100%',
        margin: '0 auto',
        flexDirection: 'column',
      }}
    >
    <h3>You are trying to view a protected page. Please log in</h3>
    <Form ref={formRef} onSubmit={e => {
        e.preventDefault()
        const email = e.target.username.value
        const password = e.target.password.value
        load(loginUser(email, password))
          .then(user => {
            console.log("Success! Logged in", user)
          })
          .catch(err => console.error(err) || setMsg("Error: " + err.message))
      }}>
      {({ formProps }) => (
        <form {...formProps}>
          <Field name="email" defaultValue="" label="Email" isRequired>
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>
          <Field name="password" defaultValue="" label="Password" isRequired>
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>
          <FormFooter>
            <ButtonGroup>
              <Button isLoading={isLoading} type="submit" appearance="primary">
                Login
              </Button>
            </ButtonGroup>
          </FormFooter>
          {msg ? 
            <FormFooter>
              <WarningBanner isOpen message={msg} />
            </FormFooter>
          : undefined}
        </form>
      )}
    </Form>
    </div>
  </Container>
  
  </div>
  )
};

function useLoading() {
  const [isLoading, setState] = React.useState(false);
  const load = aPromise => {
    setState(true);
    return aPromise
      .then((...args) => {
        setState(false);
        return Promise.resolve(...args);
      })
      .catch((...args) => {
        setState(false);
        return Promise.reject(...args);
      });
  };
  return [isLoading, load];
}