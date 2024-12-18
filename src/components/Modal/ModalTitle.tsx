import { useRef, useEffect, FC, MutableRefObject, HTMLAttributes } from 'react';
import classnames from 'classnames';
import findElementNode from '../../utils/findElementNode';

const ModalTitle: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  const titleNode: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    titleNode.current = findElementNode(titleNode) as HTMLDivElement;
    titleNode.current.focus();
  }, []);

  return (
    <div
      {...rest}
      tabIndex={-1}
      className={classnames('eui-modal-title h4', className)}
      ref={titleNode}
    >
      {children}
    </div>
  );
};

export default ModalTitle;
