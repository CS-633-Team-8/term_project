import React from 'react';
import ModalDialog, { ModalTransition, ModalFooter } from '@atlaskit/modal-dialog';
import Form, { Field, FormFooter } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import { useIdentityContext } from 'react-netlify-identity';

export default function CatchNetlifyRecoveryNullComponent() {
  const formRef = React.useRef()
  const {
    param: { token, type }, signupUser
  } = useIdentityContext();

  // important to check for the current pathname here because else you land
  // in a infinite loop
  if (token && type === 'invite') {
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
      console.log("NO TOKEN: ", token, type)
      return null;
  }
}