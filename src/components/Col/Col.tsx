import classnames from 'classnames';
import { FC, HTMLProps } from 'react';

type Size = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface ColProps extends HTMLProps<HTMLDivElement> {
  xs?: Size;
  sm?: Size;
  md?: Size;
  lg?: Size;
}

const Col: FC<ColProps> = ({
  className,
  children,
  xs,
  sm,
  md,
  lg,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={classnames('eui-col', className, {
        [`eui-col-xs-${xs}`]: xs,
        [`eui-col-sm-${sm}`]: sm,
        [`eui-col-md-${md}`]: md,
        [`eui-col-lg-${lg}`]: lg,
      })}
    >
      {children}
    </div>
  );
};

export default Col;
