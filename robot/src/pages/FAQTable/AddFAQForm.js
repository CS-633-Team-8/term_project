import React, { Fragment } from 'react';
import TextField from '@atlaskit/textfield';
import TextArea from '@atlaskit/textarea';
import Button, { ButtonGroup } from '@atlaskit/button';
import Form, { Field, FormFooter, HelperMessage, ErrorMessage, ValidMessage, } from '@atlaskit/form';
export default (props) => (<div style={{
    display: 'flex',
    width: '400px',
    maxWidth: '100%',
    margin: 'auto',
    flexDirection: 'column',
}}>
    <Form onSubmit={data => {
    console.log('form data', data);
    props.addItem(data);
    props.onClose();
}}>
      {({ formProps, submitting }) => (<form {...formProps}>
          <Field name="question" label="Question" isRequired defaultValue="">
            {({ fieldProps, error }) => (<Fragment>
                <TextField autoComplete="off" {...fieldProps}/>
                {!error && (<HelperMessage>
                    This question has to fit the responce "I know ..." e.g "what git is"
                  </HelperMessage>)}
                {error && (<ErrorMessage>
                    This user name is already in use, try another one.
                  </ErrorMessage>)}
              </Fragment>)}
          </Field>
          <Field name="answer" label="Answer" defaultValue="" isRequired validate={value => value && value.length < 8 ? 'TOO_SHORT' : undefined}>
            {({ fieldProps, error, valid, meta }) => (<Fragment>
                <TextArea {...fieldProps}/>
                {!error && !valid && (<HelperMessage>
                    Use 8 or more characters.
                  </HelperMessage>)}
                {error && (<ErrorMessage>
                    Needs to be more than 8 characters.
                  </ErrorMessage>)}
                {valid && meta.dirty ? (<ValidMessage>Great Question!</ValidMessage>) : null}
              </Fragment>)}
          </Field>
          <FormFooter>
            <ButtonGroup>
              <Button onClick={function(e) {props.onClose()}} appearance="subtle">Cancel</Button>
              <Button type="submit" appearance="primary" isLoading={submitting}>
                Add Question
              </Button>
            </ButtonGroup>
          </FormFooter>
        </form>)}
    </Form>
  </div>);
