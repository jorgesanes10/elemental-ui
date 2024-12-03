import classnames from 'classnames';
import { FC, HTMLProps } from 'react';

interface BadgeProps extends HTMLProps<HTMLSpanElement> {
  color?: 'default' | 'warning' | 'success' | 'danger' | 'info';
}

const Badge: FC<BadgeProps> = ({
  children,
  className,
  color = 'default',
  ...rest
}) => {
  return (
    <span
      {...rest}
      className={classnames('eui-badge', `eui-badge-${color}`, className)}
    >
      {children}
    </span>
  );
};

export default Badge;
