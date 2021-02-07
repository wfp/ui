import React, { FC, useContext } from 'react';
import {
  Source as PureSource,
  SourceError,
  SourceProps as PureSourceProps,
} from '@storybook/components';
import {
  DocsContext,
  DocsContextProps,
} from '@storybook/addon-docs/dist/esm/blocks/DocsContext';
import {
  SourceContext,
  SourceContextProps,
} from '@storybook/addon-docs/dist/esm/blocks/SourceContainer';
import { CURRENT_SELECTION } from './types';

import { enhanceSource } from './enhanceSource';

interface CommonProps {
  language?: string;
  dark?: boolean;
  code?: string;
}

type SingleSourceProps = {
  id: string;
} & CommonProps;

type MultiSourceProps = {
  ids: string[];
} & CommonProps;

type CodeProps = {
  code: string;
} & CommonProps;

type NoneProps = CommonProps;

type SourceProps = SingleSourceProps | MultiSourceProps | CodeProps | NoneProps;

export const getSourceProps = (
  props: SourceProps,
  docsContext: DocsContextProps,
  sourceContext: SourceContextProps
): PureSourceProps => {
  const { id: currentId, storyStore } = docsContext;
  const { sources } = sourceContext;

  const codeProps = props as CodeProps;
  const singleProps = props as SingleSourceProps;
  const multiProps = props as MultiSourceProps;

  let source = codeProps.code; // prefer user-specified code
  if (!source) {
    const targetId =
      singleProps.id === CURRENT_SELECTION || !singleProps.id
        ? currentId
        : singleProps.id;
    const targetIds = multiProps.ids || [targetId];
    source = targetIds
      .map((sourceId) => {
        const snippet = sources && sources[sourceId];
        if (snippet) return snippet;
        if (storyStore) {
          const data = storyStore.fromId(sourceId);
          const enhanced = data && (enhanceSource(data) || data.parameters);
          return enhanced?.docs?.source?.code || '';
        }
        return '';
      })
      .join('\n\n');
  }
  return source
    ? {
        code: source,
        language: props.language || 'jsx',
        dark: props.dark || false,
      }
    : { error: SourceError.SOURCE_UNAVAILABLE };
};

/**
 * Story source doc block renders source code if provided,
 * or the source for a story if `storyId` is provided, or
 * the source for the current story if nothing is provided.
 */
export const Source: FC<SourceProps> = (props) => {
  const sourceContext = useContext(SourceContext);
  const docsContext = useContext(DocsContext);
  const sourceProps = getSourceProps(props, docsContext, sourceContext);
  return <PureSource {...sourceProps} />;
};
