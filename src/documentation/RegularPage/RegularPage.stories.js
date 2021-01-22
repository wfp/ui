import React from 'react';
import Blockquote from '../../components/Blockquote';
import RegularPage from '../RegularPage';
import Story from '../../components/Story';
import Wrapper from '../../components/Wrapper';
import { Module, ModuleHeader, ModuleBody } from '../../components/Module';

import markdown from './README.mdx';

export default {
  title: 'Templates/Regular Page',

  parameters: {
    componentSubtitle: 'Example',
    status: 'released',
    mdx: markdown,
    introText:
      'The regular page template is used for content pages showing mainly linear texts like blog articles, wikis or news. Avoid using it for dashboards with a lot of Modules.',
    previewWidth: 'full',
  },
};

export const Regular = (args) => (
  <RegularPage title="Regular content page" withoutSecondaryTabs>
    <Wrapper pageWidth="lg" spacing="md">
      <div className="row">
        <div className="col-xs-12 col-md-8 col-lg-8">
          <Story>
            <p>
              Use this page type with a white background for displaying{' '}
              <span className="wfp--inline-highlight">read-only</span> content,
              like documentation, news or wiki pages.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua.
            </p>
            <h3>Use this for regular content pages</h3>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua.
            </p>
            <Blockquote title="Notice">
              Notice Resources should not be spent trying to modify legacy
              systems, 3rd party applications or other user interfaces which
              cannot easily be customised.
            </Blockquote>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua.
            </p>
          </Story>
        </div>

        <div className="col-xs-12 col-md-4 col-lg-4">
          <Module noMargin light style={{ padding: '1rem 0 0 2rem' }}>
            <ModuleHeader>Module Example</ModuleHeader>
            <ModuleBody>
              <p>
                Lorem Ipsum is dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </ModuleBody>
          </Module>
          <Module noMargin light style={{ padding: '1rem 0 0 2rem' }}>
            <ModuleHeader>Module Example</ModuleHeader>
            <ModuleBody>
              <p>
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </ModuleBody>
          </Module>
        </div>
      </div>
    </Wrapper>
  </RegularPage>
);

Regular.parameters = {
  code: false,
};
