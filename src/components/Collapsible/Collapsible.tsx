import {
  FC,
  HTMLProps,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import findElementNode from '../../utils/findElementNode.ts';

interface CollapsibleProps extends HTMLProps<HTMLDivElement> {
  expanded?: boolean;
}

const Collapsible: FC<CollapsibleProps> = ({
  expanded,
  className,
  children,
  ...rest
}) => {
  const [autoTimeout, setAutoTimeout] = useState<number | undefined>(undefined);

  const collapseNode: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    collapseNode.current = findElementNode(collapseNode) as HTMLDivElement;

    if (expanded) {
      collapseNode.current.style.height = 'auto';
    } else {
      collapseNode.current.style.height = '0';
    }
  }, []);

  useEffect(() => {
    if (expanded) {
      expandContainer();
    } else {
      collapseContainer();
    }
  }, [expanded]);

  const expandContainer = () => {
    collapseNode.current!.style.height = 'auto';
    collapseNode.current!.style.overflow = 'hidden';

    const height = collapseNode.current!.getBoundingClientRect().height;

    collapseNode.current!.style.height = '0';

    requestAnimationFrame(() => {
      collapseNode.current!.style.height = `${height}px`;
    });

    setAutoTimeout(
      setTimeout(() => {
        collapseNode.current!.style.height = 'auto';
        collapseNode.current!.style.overflow = 'unset';
      }, 700),
    );
  };

  const collapseContainer = () => {
    clearTimeout(autoTimeout);

    collapseNode.current!.style.height = `${collapseNode.current!.getBoundingClientRect().height}px`;
    collapseNode.current!.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      collapseNode.current!.style.height = '0';
    });
  };

  return (
    <div
      {...rest}
      className={classnames(
        'eui-collapsible',
        expanded ? 'eui-visible-panel' : '',
        className,
      )}
      ref={collapseNode}
    >
      {children}
    </div>
  );
};

export default Collapsible;
