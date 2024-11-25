import classnames from 'classnames';
import { FC, HTMLProps } from 'react';

interface ContainerProps extends HTMLProps<HTMLDivElement> {
  narrow?: boolean;
  fluid?: boolean;
}

const Container: FC<ContainerProps> = ({
  className,
  children,
  narrow,
  fluid,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={classnames('eui-container', className, {
        'eui-container-narrow': narrow,
        'eui-container-fluid': fluid,
      })}
    >
      {children}
    </div>
  );
};

export default Container;
