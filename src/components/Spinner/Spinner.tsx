import { ComponentPropsWithoutRef, FC } from 'react';
import classnames from 'classnames';

type Color = 'default' | 'info' | 'success' | 'danger' | 'warning' | 'brand';

interface SpinnerProps extends ComponentPropsWithoutRef<'svg'> {
  size?: 'sm' | 'md' | 'lg';
  color?: Color;
}

const Spinner: FC<SpinnerProps> = ({
  className,
  size = 'md',
  color = 'default',
  ...rest
}) => {
  const spinnerClass = classnames('eui-spinner', className, {
    [`eui-spinner-${size}`]: size,
    [`eui-spinner-${color}`]: color,
  });

  let sizeValue = 50;
  let strokeWidth = 4;

  if (size === 'sm') {
    sizeValue = 30;
    strokeWidth = 3;
  } else if (size === 'md') {
    sizeValue = 50;
  } else if (size === 'lg') {
    sizeValue = 70;
  }

  return (
    <svg
      {...rest}
      className={spinnerClass}
      height={sizeValue}
      width={sizeValue}
    >
      <circle
        className="eui-spinner-path"
        cx={sizeValue / 2}
        cy={sizeValue / 2}
        r={sizeValue / 2 - 5}
        fill="none"
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
      />
    </svg>
  );
};

export default Spinner;
