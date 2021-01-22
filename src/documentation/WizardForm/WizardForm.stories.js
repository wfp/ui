import React from 'react';

import { Field } from 'react-final-form';
import {Wizard,Page} from './Wizard';
import ReduxFormWrapper from '../../components/ReduxFormWrapper';
import TextInput from '../../components/TextInput';
import TextArea from '../../components/TextArea';
import FormGroup from '../../components/FormGroup';
import Blockquote from '../../components/Blockquote';
import Wrapper from '../../components/Wrapper';
import RadioButton from '../../components/RadioButton/RadioButton';
import RegularPage from '../RegularPage';
import markdown from './README.mdx';

// const markdown = 'TODO: sourcecode coming soon';

export default {
  title: 'Templates/WizardForm',
  parameters: {
    componentSubtitle: 'Example',
    status: 'released',
    mdx: markdown,
  },
};

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? (
    <span className="wfp--form-requirement">{error}</span>
  ) : (
    false
  );

export const Regular = (args) => (
  <Wrapper background="lighter" pageWidth="lg" spacing="xl">

    <Wizard initialValues={{ employed: true, stooge: 'larry' }}>
      <Page label="Name and last name">
        <Blockquote style={{ marginBottom: '2rem' }} title="Regular Blockquote">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.{' '}
        </Blockquote>
        <div className="row">
          <div className="col-md-6">
            <Field
              id="firstName"
              name="firstName"
              helperText="Enter your full first name"
              component={ReduxFormWrapper}
              inputComponent={TextInput}
              labelText="First Name"
            />
          </div>
          <div className="col-md-6">
            <Field
              id="lastName"
              name="lastName"
              helperText="Some more requirements"
              component={ReduxFormWrapper}
              inputComponent={TextInput}
              labelText="Last Name"
            />
          </div>
        </div>

        <Field
          component={ReduxFormWrapper}
          inputComponent={TextArea}
          name="notes"
          labelText="Notes"
          placeholder="Notes"
        />

        <Field
          id="firstName"
          name="firstName"
          helperText="Enter your full first name"
          component={ReduxFormWrapper}
          inputComponent={TextInput}
          labelText="First Name"
        />
      </Page>
      <Page label="Contact data">
        <FormGroup>
          <label htmlFor="sex">Sex</label>
          <FormGroup
            className="wfp--input-group"
            name="input-group"
            defaultSelected="default-selected"
            legend="Group Legend">
            <Field
              name="sex"
              component={ReduxFormWrapper}
              inputComponent={RadioButton}
              type="radio"
              value="male"
              labelText="Male"
            />
            <Field
              name="sex"
              component={ReduxFormWrapper}
              inputComponent={RadioButton}
              type="radio"
              value="female"
              labelText="Female"
            />
          </FormGroup>
          <FormGroup>
            <Field
              component={ReduxFormWrapper}
              inputComponent={TextArea}
              name="notes"
              labelText="Notes"
              placeholder="Notes"
            />
          </FormGroup>
          <Field name="sex" component={renderError} />
        </FormGroup>
      </Page>
      <Page
        label="Additional notes"
        validate={(values) => {
          const errors = {};
          if (!values.newNotes) {
            errors.newNotes = 'Required';
          }
          return errors;
        }}>
        <Field
          component={ReduxFormWrapper}
          inputComponent={TextArea}
          name="newNotes"
          labelText="Notes"
          placeholder="Notes"
        />
      </Page>
      <Page label="Sulamen mon anmen">
        <Field
          component={ReduxFormWrapper}
          inputComponent={TextArea}
          name="newNotes"
          labelText="Notes"
          placeholder="Notes"
        />
      </Page>
      <Page
        label="Summary"
        helperText="Check & validate"
        status={'summary'}>
        <Field
          component={ReduxFormWrapper}
          inputComponent={TextArea}
          name="newNotes"
          labelText="Summary"
          placeholder="Summary"
        />
      </Page>
    </Wizard>
  </Wrapper>
);

Regular.decorators = [
  (Story) => (
    <RegularPage title="Wizard form" withoutSecondaryTabs pageWidth="lg">
      <Story />
    </RegularPage>
  ),
];

Regular.parameters = {
  code: false,
};

