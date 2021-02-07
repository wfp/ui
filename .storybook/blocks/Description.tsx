import React, { FunctionComponent, useContext } from 'react';
import {
  Description,
  DescriptionProps as PureDescriptionProps,
} from '@storybook/components';
import {
  DocsContext,
  DocsContextProps,
} from '@storybook/addon-docs/dist/esm/blocks/DocsContext';
import { Component, CURRENT_SELECTION } from './types';
import { str } from '@storybook/addon-docs/dist/esm/lib/docgen';

import Story from '../../src/components/Story';

export enum DescriptionType {
  INFO = 'info',
  NOTES = 'notes',
  DOCGEN = 'docgen',
  LEGACY_5_2 = 'legacy-5.2',
  AUTO = 'auto',
}

type Notes = string | any;
type Info = string | any;

interface DescriptionProps {
  of?: '.' | Component;
  type?: DescriptionType;
  markdown?: string;
  children?: string;
}

const getNotes = (notes?: Notes) =>
  notes &&
  (typeof notes === 'string' ? notes : str(notes.markdown) || str(notes.text));

const getInfo = (info?: Info) =>
  info && (typeof info === 'string' ? info : str(info.text));

const noDescription = (component?: Component): string | null => null;

export const getDescriptionProps = (
  { of, type, markdown, children }: DescriptionProps,
  { parameters }: DocsContextProps
): PureDescriptionProps => {
  if (children || markdown) {
    return { markdown: children || markdown };
  }
  const { component, notes, info, docs } = parameters;
  const { extractComponentDescription = noDescription } = docs || {};
  const target = of === CURRENT_SELECTION ? component : of;
  switch (type) {
    case DescriptionType.INFO:
      return { markdown: getInfo(info) };
    case DescriptionType.NOTES:
      return { markdown: getNotes(notes) };
    // FIXME: remove in 6.0
    case DescriptionType.LEGACY_5_2:
      return {
        markdown: `
${getNotes(notes) || getInfo(info) || ''}

${extractComponentDescription(target) || ''}
`.trim(),
      };
    case DescriptionType.DOCGEN:
    case DescriptionType.AUTO:
    default:
      return { markdown: extractComponentDescription(target, parameters) };
  }
};

const DescriptionContainer: FunctionComponent<DescriptionProps> = (props) => {
  const context = useContext(DocsContext);
  const { markdown } = getDescriptionProps(props, context);

  const Docs = context.parameters.mdx;
  return markdown || context.parameters.mdx ? (
    <Story>
      {context.parameters.mdx && <Docs />}
      {/*<Description markdown={markdown} />*/}
    </Story>
  ) : null;
};

// since we are in the docs blocks, assume default description if for primary component story
DescriptionContainer.defaultProps = {
  of: '.',
};

export { DescriptionContainer as Description };
