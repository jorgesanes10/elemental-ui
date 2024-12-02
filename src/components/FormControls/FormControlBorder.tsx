import classnames from 'classnames';
import { FC, HTMLAttributes } from 'react';

interface FormControlBorderProps extends HTMLAttributes<HTMLLabelElement> {
  label?: string;
  id?: string;
  focused?: boolean;
  hasError?: boolean;
}

const FormControlBorder: FC<FormControlBorderProps> = ({
  label,
  id,
  focused,
  hasError,
  ...rest
}) => {
  return (
    <div
      className={classnames('eui-form-control-border', {
        focused,
        error: hasError,
      })}
    >
      <div className="eui-form-control-border-part" />
      <div className="eui-form-control-border-part">
        {label ? (
          <label {...rest} htmlFor={id}>
            {label}
          </label>
        ) : null}
      </div>
      <div className="eui-form-control-border-part" />
    </div>
  );
};

export default FormControlBorder;
