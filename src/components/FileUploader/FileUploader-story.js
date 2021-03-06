/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  array,
  boolean,
  number,
  select,
  text,
} from '@storybook/addon-knobs';
import settings from '../../globals/js/settings';

import FileUploader, { FileUploaderButton } from '.';
import FileUploaderSkeleton from './FileUploader.Skeleton';
import FileUploaderItem from './FileUploaderItem';
import FileUploaderDropContainer from './FileUploaderDropContainer';

const { prefix } = settings;
const buttonKinds = {
  'Primary (primary)': 'primary',
  'Secondary (secondary)': 'secondary',
  'Danger (danger)': 'danger',
  'Ghost (ghost)': 'ghost',
  'Danger Primary (danger--primary)': 'danger--primary',
  'Tertiary (tertiary)': 'tertiary',
};

const filenameStatuses = {
  'Edit (edit)': 'edit',
  'Complete (complete)': 'complete',
  'Uploading (uploading)': 'uploading',
};

const props = {
  fileUploaderButton: () => {
    const buttonKind = select('Button kind (buttonKind)', buttonKinds, '');
    return {
      className: 'bob',
      labelText: text('Label text (labelText)', 'Add files'),
      name: text('Form item name: (name)', ''),
      multiple: boolean('Supports multiple files (multiple)', true),
      disabled: boolean('Disabled (disabled)', false),
      buttonKind: buttonKind || 'primary',
      disableLabelChanges: boolean(
        'Prevent the label from being replaced with file selected file (disableLabelChanges)',
        false
      ),
      role: text('ARIA role of the button (role)', 'button'),
      tabIndex: number('Tab index (tabIndex)', 0),
      onChange: action('onChange'),
    };
  },
  fileUploader: () => ({
    labelTitle: text('The label title (labelTitle)', 'Upload'),
    labelDescription: text(
      'The label description (labelDescription)',
      'only .jpg files at 500mb or less'
    ),
    buttonLabel: text('The button label (buttonLabel)', 'Add files'),
    filenameStatus: select(
      'Status for file name (filenameStatus)',
      filenameStatuses,
      'edit'
    ),
    accept: array('Accepted file extensions (accept)', ['.jpg', '.png'], ','),
    name: text('Form item name: (name)', ''),
    multiple: boolean('Supports multiple files (multiple)', true),
    iconDescription: text(
      'Close button icon description (iconDescription)',
      'Clear file'
    ),
  }),
  fileUploaderItem: () => ({
    name: text('Filename (name)', 'README.md'),
    status: select('Status for file name (status)', filenameStatuses, 'edit'),
    iconDescription: text(
      'Close button icon description (iconDescription)',
      'Clear file'
    ),
    onDelete: action('onDelete'),
    invalid: boolean('Invalid (invalid)', false),
    errorSubject: text(
      'Error subject (errorSubject)',
      'File size exceeds limit'
    ),
    errorBody: text(
      'Error body (errorBody)',
      '500kb max file size. Select a new file and try again.'
    ),
  }),
  fileUploaderDropContainer: () => ({
    labelText: text(
      'Label text (labelText)',
      'Drag and drop files here or click to upload'
    ),
    name: text('Form item name (name)', ''),
    multiple: boolean('Supports multiple files (multiple)', true),
    accept: array(
      'Accepted MIME types or file extensions (accept)',
      ['image/jpeg', 'image/png'],
      ','
    ),
    disabled: boolean('Disabled (disabled)', false),
    role: text('ARIA role of the button (role)', ''),
    tabIndex: number('Tab index (tabIndex)', 0),
    onChange: action('onChange'),
  }),
};

storiesOf('Components|FileUploader', module)
  .addDecorator(withKnobs)
  .add('FileUploaderButton', () => (
    <FileUploaderButton {...props.fileUploaderButton()} />
  ))
  .add('FileUploader', () => {
    return (
      <div className={`${prefix}--file__container`}>
        <FileUploader {...props.fileUploader()} />
      </div>
    );
  })
  .add('FileUploaderItem', () => (
    <FileUploaderItem {...props.fileUploaderItem()} />
  ))
  .add('FileUploaderDropContainer', () => (
    <FileUploaderDropContainer {...props.fileUploaderDropContainer()} />
  ))
  .add('Drag and drop upload container example application', () =>
    require('./stories/drop-container').default(
      props.fileUploaderDropContainer()
    )
  )
  .add('skeleton', () => (
    <div style={{ width: '500px' }}>
      <FileUploaderSkeleton />
    </div>
  ));
