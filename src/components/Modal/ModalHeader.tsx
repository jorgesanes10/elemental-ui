import classnames from 'classnames';
import { FC, HTMLAttributes } from 'react';
import IconButton from '../IconButton';

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  closeButton?: boolean;
  onHide?: () => void;
  closeButtonProps?: object;
}

const ModalHeader: FC<ModalHeaderProps> = ({
  children,
  className,
  closeButton,
  onHide,
  closeButtonProps,
  ...rest
}) => {
  return (
    <div className={classnames('eui-modal-header', className)} {...rest}>
      {closeButton && (
        <IconButton
          {...closeButtonProps}
          tabIndex={0}
          className="close"
          icon="close"
          onClick={onHide}
        />
      )}
      {children}
    </div>
  );
};

export default ModalHeader;
