import React from 'react';
import Media from 'react-media';
import GlobalTheme from '@atlaskit/theme';
import Page from '@atlaskit/page';
import { BrowserRouter, Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { DESKTOP_BREAKPOINT_MIN } from '../constants';
//import { modalRoutes, pageRoutes } from './routes';
import { pageRoutes } from './routes';
import ScrollHandler from '../components/ScrollToTop';
import ErrorBoundary from '../components/ErrorBoundary';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import ModalDialog, { ModalTransition, ModalFooter } from '@atlaskit/modal-dialog';
import Form, { Field, FormFooter } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import { useIdentityContext } from 'react-netlify-identity';

export default () => {
    return (<GlobalTheme.Provider value={() => ({ mode: 'light' })}>
      <BrowserRouter>
      <CatchNetlifyRecoveryNullComponent />
        <Media query={`(min-width: ${DESKTOP_BREAKPOINT_MIN}px)`}>
          {(isDesktop) => (
            <div>
              <ScrollHandler />
              <Switch>
                {/* <Route path="/" component={HomePage}/> */}
                <Route render={appRouteDetails => (<Page navigation={isDesktop ? <DesktopNav {...appRouteDetails}/> : false}>
                      {!isDesktop && (<MobileNav appRouteDetails={appRouteDetails}/>)}
                      <ErrorBoundary>
                        <Switch>
                          {pageRoutes.map((routeProps, index) => (<Route {...routeProps} key={index}/>))}
                        </Switch>

                        {/* {modalRoutes.map((modal, index) => (<Route {...modal} key={index}/>))} */}
                      </ErrorBoundary>
                    </Page>)}/>
              </Switch>
            </div>)}
        </Media>
      </BrowserRouter>
    </GlobalTheme.Provider>);
};

function CatchNetlifyRecoveryNullComponent() {
  const formRef = React.useRef()
  const {
    param: { token, type }, signupUser
  } = useIdentityContext();
  const { replace } = useHistory();
  const { pathname } = useLocation();

  // important to check for the current pathname here because else you land
  // in a infinite loop
  if (token && type === 'invite' && pathname === '/') {
    console.log("initiate")
    return (
      <ModalTransition>
        <ModalDialog heading="Register">
            <Form ref={formRef} onSubmit={e => {
              console.log(e)
              const email = e.email
              const password = e.password
              signupUser(email, password)
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
                    <Button type="submit" appearance="primary">
                      Register
                    </Button>
                </FormFooter>
              </form>
            )}
            </Form>
            <ModalFooter />
        </ModalDialog>
        </ModalTransition>
      )
    } else {
      return null;
  }
}