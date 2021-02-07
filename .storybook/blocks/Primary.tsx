import React, { useContext, FC } from 'react';
import { DocsContext } from '@storybook/addon-docs/dist/esm/blocks/DocsContext';
import { DocsStory } from './DocsStory';
import { getDocsStories } from './utils';

interface PrimaryProps {
  name?: string;
}

export const Primary: FC<PrimaryProps> = ({ name }) => {
  const context = useContext(DocsContext);
  const componentStories = getDocsStories(context);
  let story;
  if (componentStories) {
    story = name
      ? componentStories.find((s) => s.name === name)
      : componentStories[0];
  }
  return story ? <DocsStory {...story} expanded={false} withToolbar /> : null;
};
