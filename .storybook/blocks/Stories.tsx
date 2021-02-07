import React, { useContext, FunctionComponent } from 'react';
import { DocsContext } from '@storybook/addon-docs/dist/esm/blocks/DocsContext';
import { DocsStory } from './DocsStory';
import { Heading } from './Heading';
import { getDocsStories } from './utils';
import { DocsStoryProps } from './types';

interface StoriesProps {
  title?: JSX.Element | string;
  includePrimary?: boolean;
}

export const Stories: FunctionComponent<StoriesProps> = ({
  title,
  includePrimary = false,
}) => {
  const context = useContext(DocsContext);
  const componentStories = getDocsStories(context);

  let stories: DocsStoryProps[] = componentStories;
  if (!includePrimary) stories = stories.slice(1);

  if (!stories || stories.length === 0) {
    return null;
  }

  return (
    <>
      <Heading>{title}</Heading>
      {stories.map(
        (story) => story && <DocsStory key={story.id} {...story} expanded />
      )}
    </>
  );
};

Stories.defaultProps = {
  title: 'Stories',
};
