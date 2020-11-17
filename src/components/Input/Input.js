import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import settings from '../../globals/js/settings';
import FormItem from '../FormItem';

const { prefix } = settings;

/**
 * Input is a wrapper for custom inputs providing the label, helperText and errors. */
const Input = ({
  additional,
  addonBefore,
  addonAfter,
  labelText,
  children,
  className,
  id,
  formItemClassName,
  placeholder,
  type,
  onChange,
  onClick,
  hideLabel,
  invalid,
  invalidText,
  helperText,
  light,
  required,
  ...other
}) => {
  const inputProps = {
    id,
    onChange: (evt) => {
      if (!other.disabled && !other.readOnly) {
        onChange(evt);
      }
    },
    onClick: (evt) => {
      if (!other.disabled && !other.readOnly) {
        onClick(evt);
      }
    },
    placeholder,
    type,
  };

  const errorId = id + '-error-msg';

  const inputClasses = classNames(`${prefix}--input`, className, {
    [`${prefix}--input--light`]: light,
    [`${prefix}--input--invalid`]: invalid,
  });

  const labelClasses = classNames(`${prefix}--label`, {
    [`${prefix}--visually-hidden`]: hideLabel || !labelText,
    [`${prefix}--label--disabled`]: other.disabled,
  });

  const helperTextClasses = classNames(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: other.disabled,
  });

  const label = (
    <label htmlFor={id} className={labelClasses}>
      {labelText && labelText}
      {required && '*'}
    </label>
  );

  const error = invalid ? (
    <div className="wfp--form-requirement" id={errorId}>
      {invalid.message ? invalid.message : invalidText}
    </div>
  ) : null;

  const elementProps = invalid
    ? {
        ...other,
        ...inputProps,
        'data-invalid': true,
        'aria-invalid': true,
        'aria-describedby': errorId,
        className: inputClasses,
      }
    : {
        ...other,
        ...inputProps,
        className: inputClasses,
      };

  const helper = helperText ? (
    <div className={helperTextClasses}>{helperText}</div>
  ) : null;

  return (
    <FormItem className={formItemClassName} invalid>
      {label}
      {helper}
      {additional}
      <div className={`${prefix}--input-wrapper`}>
        {addonBefore && (
          <div className={`${prefix}--input-addon-before`}>{addonBefore}</div>
        )}
        {children(elementProps)}
        {addonAfter && (
          <div className={`${prefix}--input-addon-after`}>{addonAfter}</div>
        )}
      </div>
      {error}
    </FormItem>
  );
};

Input.propTypes = {
  /**
   * Specify an optional className to be applied to the &lt;input&gt; node
   */
  className: PropTypes.string,

  /**
   * Optionally provide the default value of the &lt;input&gt;
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the &lt;input&gt; should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify an optional className to be applied to the form-item node
   */
  formItemClassName: PropTypes.string,

  /**
   * Specify a custom `id` for the &lt;input&gt;
   */
  id: PropTypes.string,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: PropTypes.node,

  /**
   * Optionally provide an `onChange` handler that is called whenever &lt;input&gt;
   * is updated
   */
  onChange: PropTypes.func,

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * &lt;input&gt; is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the placeholder attribute for the &lt;input&gt;
   */
  placeholder: PropTypes.string,

  /**
   * Specify the type of the &lt;input&gt;
   */
  type: PropTypes.string,

  /**
   * Specify the value of the &lt;input&gt;
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.string,

  /**
   * Provide additional component that is used alongside the input for customization
   */
  additional: PropTypes.node,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * `true` to use the light version.
   */
  light: PropTypes.bool,
};

Input.defaultProps = {
  className: 'wfp--input',
  disabled: false,
  type: 'text',
  onChange: () => {},
  onClick: () => {},
  invalid: false,
  invalidText: '',
  helperText: '',
  light: false,
};

export default Input;
