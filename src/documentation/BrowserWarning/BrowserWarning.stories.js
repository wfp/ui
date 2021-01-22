import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import BrowserWarning from './BrowserWarning';

import Modal from '../../components/Modal';
import Link from '../../components/Link';
import InfoBar from '../../components/InfoBar';

import markdown from './README.mdx';

export default {
  title: 'Templates/Browser warning (outdated)',
  component: BrowserWarning,
  parameters: {
    componentSubtitle: 'Template',
    status: 'legacy',
    mdx: markdown,
    previewWidth: 'full',
  },
};

export const ErrorDialog = (args) => {
  const [open, setOpen] = useState(true);

  const isIE = () => {
    var ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
    var msie = ua.indexOf('MSIE '); // IE 10 or older
    var trident = ua.indexOf('Trident/'); //IE 11
    //Remove this line in production and use second line
    return true;
    //return msie > 0 || trident > 0;
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  const submitAndClose = () => {
    setOpen(false);
  };

  if (isIE())
    return (
      <>
        <button onClick={toggleModal}>Manually open warning modal</button>
        <Modal
          open={open}
          primaryButtonText="Continue with current browser"
          onRequestSubmit={submitAndClose}
          modalHeading="Outdated browser"
          onRequestClose={toggleModal}
          danger>
          <p className="wfp--modal-content__text">
            It looks like you are using Internet Explorer 11 or older as your
            favourite browser. We recommend that you switch to a more modern
            browser to ensure that you get the best experience out of this
            application. <Link href="#">Learn more on go.wfp.org.</Link>
          </p>
        </Modal>
      </>
    );
  return null;
};

export const Warning = (args) => (
  <InfoBar>
    Your browser version is outdated. <Link href="#">Please upgrade</Link>
  </InfoBar>
);

Warning.parameters = {
  code: false,
};

Warning.story = {
  parameters: {
    docs: {
      storyDescription: `In cases the applications works with minor restrictions and you just want to inform the user you can show a <InfoBar />.`,
    },
  },
};
