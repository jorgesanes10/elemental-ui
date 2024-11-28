import { FC, HTMLProps } from 'react';
import classnames from 'classnames';

interface RowProps extends HTMLProps<HTMLDivElement> {
  center?: boolean;
}

const Row: FC<RowProps> = ({ className, children, center, ...rest }) => {
  return (
    <div
      {...rest}
      className={classnames('eui-row', className, {
        'eui-row-center-cols': center,
      })}
    >
      {children}
    </div>
  );
};

export default Row;
