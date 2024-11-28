import { FC, HTMLProps } from 'react';
import classnames from 'classnames';
import IconButton from '../IconButton';
import Icon from '../Icon';

export type Color = 'success' | 'warning' | 'danger' | 'info' | 'inactive';

export interface AlertProps extends HTMLProps<HTMLDivElement> {
  onDismiss?: () => void;
  color?: Color;
}

const Alert: FC<AlertProps> = ({
  className,
  children,
  color = 'info',
  onDismiss,
  ...rest
}) => {
  function getIconFromColor(color: Color) {
    const icons = {
      info: 'info_outline',
      success: 'check',
      danger: 'report',
      warning: 'warning',
      inactive: 'error_outline',
    };

    return icons[color];
  }

  const classes = classnames('eui-alert', className, `eui-alert-${color}`);

  return (
    <div {...rest} className={classes} role="alert">
      <Icon
        name={getIconFromColor(color)}
        className="eui-alert-default-icon"
        style={{ fontSize: '20px' }}
      />
      {children}
      {onDismiss ? <IconButton icon="cancel" onClick={onDismiss} /> : null}
    </div>
  );
};

export default Alert;
