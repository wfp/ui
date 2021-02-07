import { addParameters } from '@storybook/react';
import theme from './theme';

import {
  //DocsPage,
  Title,
  //Subtitle,
  //Description,
  Primary,
  Props,
  Stories,
  types,
  //DocsContainer,
} from '@storybook/addon-docs/blocks';
import { DocsPage } from './blocks/DocsPage';
import { DocsContainer } from './blocks/DocsContainer';
import { Subtitle } from './blocks/Subtitle';

import React, { FC } from 'react';
import Description from './blocks/Description';
import results from '../.jest-test-results.json';

import './storybook.scss';

/*
const githubPath = resultReadme
  ? resultReadme.replace('./src/', './').replace('README.md', '')
  : undefined;*/

export const DocsPaged = (props) => {
  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      <Primary />
      <Props />
      <Stories />
    </>
  );
};

addParameters({
  /*options: {
    showRoots: true,
    storySort: (a, b) => {
      console.log('sort', a[1].kind.split('/'));

      const section = a[1].kind.split('/');

      if (section[0] === 'Components') {
        return -10100000;
      }
      if (a[0] === 'components-ui-elements-slider--regular-slider') {
        return -1100000;
      }
      if (a.includes('Intro')) {
        return -1000;
      }
      if (a.includes('Components')) {
        return 900;
      }
      return 0;
    },
  },*/

  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  viewMode: 'docs',
});

// or global addParameters
export const parameters = {
  controls: { expanded: true },
  docs: {
    theme: theme,
  },
  previewTabs: {
    'storybook/docs/panel': {
      index: -1,
      title: 'Documentation',
    },
    canvas: { title: 'Code', hidden: false },
  },
  options: {
    storySort: {
      order: [
        'Getting started',
          ['Intro', 'Installing the Kit','Using the Kit','Recommended libraries', 'Design resources', 'Browser support',"What's new", 'Support and Feedback','Credits'],
        'Documentation',
        'Templates',
        'Components',
      ],
    },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      // array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark'],
    },
  },
};

/*

addDecorator(
  withTests({
    results,
  })
);*/

const withThemeProvider = (Story, context) => {
  const theme = context.globals.theme;
  document.body.classList.remove(
    `wfp--theme-${theme === 'light' ? 'dark' : 'light'}`
  );
  document.body.classList.add(`wfp--theme-${theme}`);
  return (
    <div className={`wfp--theme-${theme}`}>
      <Story {...context} />
    </div>
  );
};
export const decorators = [withThemeProvider];
