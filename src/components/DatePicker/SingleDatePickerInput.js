import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import settings from '../../globals/js/settings';

const { prefix } = settings;

export class SingleDatePickerInput extends PureComponent {
  state = {
    controlledValue: this.props.initialValue ? this.props.value : null,
    focusedInput: null,
  };

  handleFocusChange = focusedInput => {
    if (!focusedInput && typeof this.props.onBlur === 'function') {
      this.props.onBlur();
    }
    this.setState({ focusedInput });
  };

  render() {
    const {
      controlled,
      datePicker,
      labelText,
      className,
      id,
      placeholder,
      type,
      onChange,
      onClick,
      hideLabel,
      invalid,
      invalidText,
      helperText,
      active,
      value,
      onFocus,
      onBlur,
      onDragStart,
      onDrop,
      ...other
    } = this.props;

    const { controlledValue, focused } = this.state;
    const SingleDatePicker = datePicker;

    const labelClasses = classNames(`${prefix}--label`, {
      [`${prefix}--visually-hidden`]: hideLabel,
    });

    const label = labelText ? (
      <label htmlFor={id} className={labelClasses}>
        {labelText}
      </label>
    ) : null;

    const errorMessage = invalid ? (
      <div className={`${prefix}--form-requirement invalid`}>{invalidText}</div>
    ) : null;

    const helper = helperText ? (
      <div className={`${prefix}--form__helper-text`}>{helperText}</div>
    ) : null;

    return (
      <div className={className}>
        {label}
        {helper}
        <SingleDatePicker
          id={id}
          date={onChange && value ? value : controlledValue}
          focused={focused}
          hideKeyboardShortcutsPanel
          onDateChange={value => {
            if (onChange) {
              onChange({ value });
            }
            this.setState({ controlledValue: value });
          }}
          onFocusChange={({ focused }) => {
            this.setState({ focused });
            focused ? onFocus(true) : onBlur(true);
          }}
          {...other}
        />
        {errorMessage}
      </div>
    );
  }
}

SingleDatePickerInput.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},

  className: "wfp--form-item"
};

SingleDatePickerInput.propTypes = {
  /**
   * Provide the SingleDatePicker as a component
   */
  datePicker: PropTypes.func.isRequired,
  /**
   * Provide a custom className that is applied directly to the underlying
   * <textarea> node
   */
  className: PropTypes.string,
  /**
   * Specify whether the control is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide a unique identifier for the control
   */
  id: PropTypes.string,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Optionally provide an `onChange` handler that is called whenever <textarea>
   * is updated
   */
  onChange: PropTypes.func,

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * <textarea> is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the placeholder attribute for the <textarea>
   */
  placeholder: PropTypes.string,

  /**
   * Specify the rows attribute for the <textarea>
   */
  rows: PropTypes.number,

  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.string,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel: PropTypes.bool,
};

export default SingleDatePickerInput;
