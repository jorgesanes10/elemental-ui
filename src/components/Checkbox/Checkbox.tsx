import React, { FC, HTMLProps, useState } from 'react';
import classNames from 'classnames';

interface CheckboxProps extends HTMLProps<HTMLInputElement> {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  ariaLabel?: string;
}

const Checkbox: FC<CheckboxProps> = (props) => {
  const [focused, setFocused] = useState(false);

  function stopClickThrough(event: React.MouseEvent) {
    event.stopPropagation();
  }

  function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    const { onFocus } = props;

    setFocused(true);

    if (onFocus) {
      onFocus(event);
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const { onBlur } = props;

    setFocused(false);

    if (onBlur) {
      onBlur(event);
    }
  }

  const { className, children, label, ariaLabel, ...rest } = props;

  return (
    <label
      className={classNames('eui-checkbox', className, {
        focused: focused,
        'eui-has-label': label,
      })}
    >
      <input
        {...rest}
        type="checkbox"
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="eui-checkbox-input"
        aria-label={ariaLabel}
      />
      <span
        className="material-icons eui-checkbox-check"
        role="presentation"
        onClick={stopClickThrough}
      >
        check_box_outline_blank
      </span>
      {label ? (
        <span
          className="eui-checkbox-label"
          onClick={stopClickThrough}
          role="presentation"
        >
          {label}
        </span>
      ) : null}
      {children}
    </label>
  );
};

export default Checkbox;
