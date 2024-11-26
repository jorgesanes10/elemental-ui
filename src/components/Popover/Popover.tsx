import classnames from 'classnames';
import { FC, HTMLProps } from 'react';

interface PopoverProps extends HTMLProps<HTMLDivElement> {
  title?: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  spread?: boolean;
}

const Popover: FC<PopoverProps> = ({
  children,
  className,
  placement = 'right',
  spread = false,
  title,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={classnames(
        'eui-popover',
        placement,
        {
          'eui-popover-spread': spread,
        },
        className,
      )}
    >
      <div className="arrow" />
      {title && <h3 className="eui-popover-title">{title}</h3>}
      <div className="eui-popover-content">{children}</div>
    </div>
  );
};

export default Popover;
