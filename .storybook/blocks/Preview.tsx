import React, {
  FC,
  ReactElement,
  ReactNode,
  ReactNodeArray,
  useContext,
} from 'react';
import { MDXProvider } from '@mdx-js/react';
import { toId, storyNameFromExport } from '@storybook/csf';
import { resetComponents } from '@storybook/components';
import {
  //Preview as PurePreview,
  PreviewProps as PurePreviewProps,
} from '@storybook/components';
import { Preview as PurePreview } from './PurePreview';
import {
  DocsContext,
  DocsContextProps,
} from '@storybook/addon-docs/dist/esm/blocks/DocsContext';
import {
  SourceContext,
  SourceContextProps,
} from '@storybook/addon-docs/dist/esm/blocks/SourceContainer';
import { getSourceProps } from './Source';

import ReactDOMServer from 'react-dom/server';

export enum SourceState {
  OPEN = 'open',
  CLOSED = 'closed',
  NONE = 'none',
}

type PreviewProps = PurePreviewProps & {
  withSource?: SourceState;
  mdxSource?: string;
};

const getPreviewProps = (
  {
    withSource = SourceState.CLOSED,
    mdxSource,
    children,
    ...props
  }: PreviewProps & { children?: ReactNode },
  docsContext: DocsContextProps,
  sourceContext: SourceContextProps
): PurePreviewProps => {
  if (withSource === SourceState.NONE) {
    return props;
  }
  if (mdxSource) {
    return {
      ...props,
      withSource: getSourceProps(
        { code: decodeURI(mdxSource) },
        docsContext,
        sourceContext
      ),
    };
  }
  const name = docsContext.kind.substr(docsContext.kind.lastIndexOf('/') + 1);

  /*const output = ReactDOMServer.renderToStaticMarkup(
      <ReactTablePagination {...args} columns={columns} data={data} />
    ); */
  const childArray: ReactNodeArray = Array.isArray(children)
    ? children
    : [children];
  const stories = childArray.filter(
    (c: ReactElement) => c.props && (c.props.id || c.props.name)
  ) as ReactElement[];
  const { mdxComponentMeta, mdxStoryNameToKey } = docsContext;
  const targetIds = stories.map(
    (s) =>
      s.props.id ||
      toId(
        mdxComponentMeta.id || mdxComponentMeta.title,
        storyNameFromExport(mdxStoryNameToKey[s.props.name])
      )
  );
  const sourceProps = getSourceProps(
    { ids: targetIds },
    docsContext,
    sourceContext
  );
  return {
    ...props, // pass through columns etc.
    name: name,
    storyFn: docsContext.storyFn,
    subcomponents: docsContext.parameters.subcomponents,
    withSource: sourceProps,
    isExpanded: withSource === SourceState.OPEN,
  };
};

export const Preview: FC<PreviewProps> = (props) => {
  const docsContext = useContext(DocsContext);
  const sourceContext = useContext(SourceContext);
  const previewProps = getPreviewProps(props, docsContext, sourceContext);
  const { children } = props;
  return (
    <MDXProvider components={resetComponents}>
      <PurePreview {...previewProps} storyComponent={props.storyComponent}>
        {children}
      </PurePreview>
    </MDXProvider>
  );
};
