import React from 'react';
import markdown from './README.mdx';
import Item from '.';
import Button from '../Button';
import Tag from '../Tag';

export default {
  title: 'Components/UI Elements/Item',
  component: Item,
  parameters: {
    componentSubtitle: 'Component',
    status: 'released',
    mdx: markdown,
  },
};

export const Regular = (args) => <Item {...args} />;

Regular.args = {
  title: 'A title is shown',
  children: `nonumy eirmod tempor invidunt`,
  subText: `This is the subText. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.  At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. `,
  icon: (
    <img
      alt="Moving van"
      src="https://www.wfp.org/sites/default/files/styles/medium/public/images/publication/YiR_banner.jpg"
    />
  ),
  showAdditionalIcon: true,
  additional: 'Yesterday',
  hint: <Tag kind="wfp">Hint</Tag>,
  wrapper: 'button',
};

export const Horizontal = (args) => <Item {...args} />;

Horizontal.args = {
  title: 'A title is shown',
  children: `nonumy eirmod tempor invidunt`,
  subText: `This is the subText. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.  At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. `,
  kind: 'horizontal',
  icon: (
    <img
      alt="Moving van"
      src="https://www.wfp.org/sites/default/files/styles/medium/public/images/publication/YiR_banner.jpg"
    />
  ),
  showAdditionalIcon: true,
  additional: 'Yesterday',
  hint: <Tag kind="wfp">Hint</Tag>,
  wrapper: 'sidebar',
};
