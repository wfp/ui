import React from 'react';
import Wrapper from '../../components/Wrapper';
import RegularPage from '../RegularPage';
import markdown from '../WizardForm/README.mdx';
import WizardForm from './WizardForm';

// const markdown = 'TODO: sourcecode coming soon';

export default {
  title: 'Templates/WizardForm (react-hook-form)',
  parameters: {
    componentSubtitle: 'Example',
    status: 'released',
    mdx: markdown,
  },
};

export const Regular = (args) => {
  return(
  <Wrapper background="lighter" pageWidth="lg" spacing="xl">
      <WizardForm/>
  </Wrapper>
)
}

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