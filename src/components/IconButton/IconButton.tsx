import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  MutableRefObject,
  ComponentPropsWithoutRef,
} from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
import findElementNode from '../../utils/findElementNode.ts';

interface IconButtonRef {
  node: MutableRefObject<HTMLButtonElement | null>;
}

interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  icon: string;
  color?: 'success' | 'warning' | 'danger' | 'info' | 'default' | 'brand';
  ariaLabel?: string;
  displayName?: string;
}

const IconButton = React.forwardRef<IconButtonRef, IconButtonProps>(
  (props, ref) => {
    const iconButtonNode: MutableRefObject<HTMLButtonElement | null> =
      useRef(null);

    useImperativeHandle(ref, () => ({
      focus: () => iconButtonNode.current!.focus(),
      node: iconButtonNode,
    }));

    useEffect(() => {
      iconButtonNode.current = findElementNode(
        iconButtonNode,
      ) as HTMLButtonElement;
    }, []);

    const {
      ariaLabel,
      className,
      disabled = false,
      icon,
      title,
      color = 'default',
      ...rest
    } = props;

    delete rest.displayName;

    return (
      <button
        {...rest}
        aria-label={ariaLabel}
        className={classnames(
          'eui-icon-button',
          className,
          `eui-icon-button-${color}`,
        )}
        disabled={disabled}
        ref={iconButtonNode}
        title={title}
      >
        <Icon name={icon} />
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;
