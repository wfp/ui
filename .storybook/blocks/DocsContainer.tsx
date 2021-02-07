import React, { FunctionComponent, useEffect, useContext } from 'react';
import { document, window } from 'global';
import deprecate from 'util-deprecate';
import dedent from 'ts-dedent';
import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider, ensure as ensureTheme } from '@storybook/theming';
import { DocsWrapper, DocsContent } from '@storybook/components';
import { components as htmlComponents } from '@storybook/components';
import {
  DocsContextProps,
  DocsContext,
} from '@storybook/addon-docs/dist/esm/blocks/DocsContext';
import { Code, components } from '@storybook/components';
import { anchorBlockIdFromId } from './Anchor';
import { storyBlockIdFromId } from './Story';
import { SourceContainer } from '@storybook/addon-docs/dist/esm/blocks/SourceContainer';
import { CodeOrSourceMdx, AnchorMdx, HeadersMdx } from './mdx';
import { scrollToElement } from './utils';

import { Subtitle } from './Subtitle';
import { Title } from './Title';
import { ListItem, List } from '../../src/components/List';
import Story from '../../src/components/Story';
import {
  Source as PureSource,
  SourceError,
  SourceProps as PureSourceProps,
} from '@storybook/components';
import mdxComponents from '../../src/components/MdxComponents';

export interface DocsContainerProps {
  context: DocsContextProps;
}

const defaultComponents = {
  ...htmlComponents,
  code: CodeOrSourceMdx,
  a: AnchorMdx,
  ...HeadersMdx,
};

export const DocsContainer: FunctionComponent<DocsContainerProps> = ({
  context,
  children,
}) => {
  const { id: storyId = null, parameters = {} } = context || {};
  const { options = {}, docs = {} } = parameters;
  let themeVars = docs.theme;
  if (!themeVars && options.theme) {
    deprecate(
      () => {},
      dedent`
        options.theme => Deprecated: use  story.parameters.docs.theme instead.
        See https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/theming.md#storybook-theming for details.
    `
    )();
    themeVars = options.theme;
  }
  const theme = ensureTheme(themeVars);

  const code = ({ children, className, ...other }) => {
    const language = className && className.split('-');
    return (
      <PureSource
        format={false}
        dark
        language={(language && language[1]) || 'plaintext'}
        code={children as string}
        {...other}
      />
    );
  };

  const allComponents = {
    ...defaultComponents,
    ...docs.components,
    ...mdxComponents,
    code,
  };

  useEffect(() => {
    let url;
    try {
      url = new URL(window.parent.location);
    } catch (err) {
      return;
    }
    if (url.hash) {
      const element = document.getElementById(url.hash.substring(1));
      if (element) {
        // Introducing a delay to ensure scrolling works when it's a full refresh.
        setTimeout(() => {
          scrollToElement(element);
        }, 200);
      }
    } else {
      const element =
        document.getElementById(anchorBlockIdFromId(storyId)) ||
        document.getElementById(storyBlockIdFromId(storyId));
      if (element) {
        const allStories = element.parentElement.querySelectorAll(
          '[id|="anchor-"]'
        );
        let block = 'start';
        if (allStories && allStories[0] === element) {
          block = 'end'; // first story should be shown with the intro content above
        }
        // Introducing a delay to ensure scrolling works when it's a full refresh.
        setTimeout(() => {
          scrollToElement(element, block);
        }, 200);
      }
    }
  }, [storyId]);

  const contexts = useContext(DocsContext);

  if (context.parameters.fullPage) {
    return (
      <DocsContext.Provider value={context}>
        <SourceContainer>
          <ThemeProvider theme={theme}>
            <MDXProvider components={allComponents}>{children}</MDXProvider>
          </ThemeProvider>
        </SourceContainer>
      </DocsContext.Provider>
    );
  }

  return (
    <DocsContext.Provider value={context}>
      <SourceContainer>
        <ThemeProvider theme={theme}>
          <MDXProvider components={allComponents}>
            <DocsWrapper className="sbdocs sbdocs-wrapper">
              <DocsContent className="sbdocs sbdocs-content">
                <Subtitle />
                <Title />
                {children}
              </DocsContent>
            </DocsWrapper>
          </MDXProvider>
        </ThemeProvider>
      </SourceContainer>
    </DocsContext.Provider>
  );
};
