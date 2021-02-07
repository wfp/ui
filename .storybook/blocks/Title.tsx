import React, { useContext, FunctionComponent } from 'react';
import { Title as PureTitle } from '@storybook/components';
import {
  DocsContext,
  DocsContextProps,
} from '@storybook/addon-docs/dist/esm/blocks/DocsContext';
import Text from '../../src/components/Text/Text';

interface TitleProps {
  children?: JSX.Element | string;
}
export const extractTitle = ({ kind, parameters }: DocsContextProps) => {
  const groups = kind.split('/');

  return (groups && groups[groups.length - 1]) || kind;
};

export const Title: FunctionComponent<TitleProps> = ({ children }) => {
  const context = useContext(DocsContext);
  let text: JSX.Element | string = children;
  if (!text) {
    text = extractTitle(context);
  }
  return text ? <Text kind="title">{text}</Text> : null;
};
