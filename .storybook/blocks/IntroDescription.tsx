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
import ReactDOMServer from 'react-dom/server';
import { MDXProvider } from '@mdx-js/react';

import { getDocsStories } from './utils';

import { CodeOrSourceMdx, AnchorMdx, HeadersMdx } from './mdx';

const defaultComponents = {
  code: CodeOrSourceMdx,
  a: AnchorMdx,
  ...HeadersMdx,
};
import { Tag, List, ListItem } from '../../src';
import Story from '../../src/components/Story/Story';

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
  const { component, notes, info, docs, introText } = parameters;
  const { extractComponentDescription = noDescription } = docs || {};
  const target = of === CURRENT_SELECTION ? component : of;
  const componentDescription = introText
    ? introText
    : extractComponentDescription(target, parameters);

  return { markdown: componentDescription ? componentDescription : '' };
  switch (type) {
    /* case DescriptionType.INFO:
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
    case DescriptionType.AUTO:*/
    default:
      return { markdown: extractComponentDescription(target, parameters) };
  }
};

const allComponents = {
  ...defaultComponents,
};

const DescriptionContainer: FunctionComponent<DescriptionProps> = (props) => {
  const context = useContext(DocsContext);
  const { markdown } = getDescriptionProps(props, context);

  const Docs = context.parameters.mdx;

  const lookup = {
    experimental: { name: 'Experimental component', type: 'warning' },
    released: { name: 'Ready for production', type: 'wfp' },
    legacy: { name: 'Legacy: do not use in new projects', type: 'warning' },
  };

  const componentsTableOfContent = {
    wrapper: ({ children, ...props }) => {
      const output = Array.isArray(children)
        ? children.map((child, i) => {
            if (['h1', 'h2', 'h3'].includes(child.props.mdxType)) {
              return (
                <ListItem key={i}>
                  <a
                    href={`#${child.props.children
                      .toLowerCase()
                      .replace(/ /g, '-')}`}
                    target="_self">
                    {child.props.children}
                  </a>
                </ListItem>
              );
            }
            return null;
          })
        : '';

      const reversedChildren = React.Children.toArray(children).reverse();
      const componentStories = getDocsStories(context);

      const examplesList = componentStories.map((e) => (
        <ListItem>
          <a
            href={`#${e.id.replace('components-module--', '')}`}
            target="_self">
            {e.name}
          </a>
        </ListItem>
      ));
      return (
        <List className="table-of-content">
          <ListItem>
            <a href={`#anchor--${context.parameters.id}`} target="_self">
              Demo
            </a>
          </ListItem>
          {/*{examplesList}*/}
          {output}
        </List>
      );
    },
  };
  context.parameters.extended = 'legacy';
  return (
    <Story>
      {context.parameters.status && (
        <div className="docs-status">
          <Tag
            className={`status__${context.parameters.status}`}
            type={lookup[context.parameters.status].type}>
            {lookup[context.parameters.status].name}
          </Tag>
        </div>
      )}

      <div className="intro-description">
        <Description markdown={markdown} />
        <MDXProvider components={componentsTableOfContent}>
          {Docs && <Docs />}
        </MDXProvider>
      </div>
    </Story>
  );
};

// since we are in the docs blocks, assume default description if for primary component story
DescriptionContainer.defaultProps = {
  of: '.',
};

export { DescriptionContainer as IntroDescription };
