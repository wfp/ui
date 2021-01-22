import React from 'react';
import RegularPage from '../RegularPage';
import Link from '../../components/Link';
import Story from '../../components/Story';
import Icon from '../../components/Icon';
import Wrapper from '../../components/Wrapper';
import { iconWfpHumEmergencyResponsePos } from '@wfp/icons';
import markdown from './README.mdx';
export default {
  title: 'Templates/Not found (404)',

  parameters: {
    componentSubtitle: 'Example',
    status: 'released',
    mdx: markdown,
    introText:
      'Not Found page is also known as an “error page” or “404” page. This page indicates that the user reached the domain they requested, but the URL path provided no information.',
    previewWidth: 'full',
  },
};

export const Regular = (args) => (
  <Wrapper pageWidth="lg" spacing="md">
    <Story className="wfp--story__center wfp--story__full-height">
      <Icon
        icon={iconWfpHumEmergencyResponsePos}
        fill="#0a6eb4"
        width={200}
        height={200}
        style={{ marginBottom: '3rem', transform: 'rotate(10deg)' }}
      />
      <h1 className="wfp--story__title">Sorry, we couldn't find that page</h1>
      <p>
        Go back to <Link href="http://www.wfp.org">Homepage</Link> or visit{' '}
        <Link href="http://www.wfp.org">another Page</Link>
      </p>
    </Story>
  </Wrapper>
);

Regular.decorators = [
  (Story) => (
    <RegularPage withoutSecondary>
      <Story />
    </RegularPage>
  ),
];

// Regular.args = {};

Regular.parameters = {
  code: false,
};
