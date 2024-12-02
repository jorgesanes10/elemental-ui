import classnames from 'classnames';
import { FC, HTMLProps } from 'react';

interface FormControlFooterProps extends HTMLProps<HTMLDivElement> {
  maxLength?: number;
  hideCounter?: boolean;
  value?: string;
  errorMessage?: string;
  helpText?: string;
  isInputFull?: boolean;
}

const FormControlFooter: FC<FormControlFooterProps> = ({
  id,
  maxLength,
  hideCounter,
  value,
  errorMessage,
  helpText,
  isInputFull,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={classnames('eui-form-control-footer', {
        error: errorMessage,
      })}
    >
      {maxLength && !hideCounter ? (
        <span
          className={classnames('eui-form-control-counter', {
            'input-full': isInputFull,
          })}
        >{`${(value || '').length}/${maxLength}`}</span>
      ) : null}
      <span
        id={`${id}ErrorMessage`}
        className={classnames(
          'eui-form-control-message eui-form-control-error-message',
          {
            'has-message': errorMessage,
          },
        )}
        role="alert"
      >
        {errorMessage}
      </span>
      <span
        className={classnames(
          'eui-form-control-message eui-form-control-help-text',
          {
            'has-message': helpText,
          },
        )}
      >
        {helpText}
      </span>
    </div>
  );
};

export default FormControlFooter;
