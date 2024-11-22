import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  ComponentPropsWithoutRef,
  ReactElement,
  MutableRefObject,
} from 'react';
import classnames from 'classnames';
import findElementNode from '../../utils/findElementNode';

interface FloatingActionButtonRef {
  node: MutableRefObject<HTMLButtonElement | null>;
}

export interface FloatingActionButtonProps
  extends ComponentPropsWithoutRef<'button'> {
  color?: 'info' | 'brand' | 'default';
  ariaLabel?: string;
  icon?: string | ReactElement;
  displayName?: string;
}

const FloatingActionButton = React.forwardRef<
  FloatingActionButtonRef,
  FloatingActionButtonProps
>((props, ref) => {
  const floatingActionButtonNode: MutableRefObject<HTMLButtonElement | null> =
    useRef(null);

  useImperativeHandle(ref, () => ({
    focus,
    node: floatingActionButtonNode,
  }));

  useEffect(() => {
    floatingActionButtonNode.current = findElementNode(
      floatingActionButtonNode,
    ) as HTMLButtonElement;
  }, []);

  function focus() {
    (floatingActionButtonNode.current as HTMLButtonElement).focus();
  }

  const {
    ariaLabel,
    className,
    color = 'info',
    disabled,
    icon = 'add',
    ...rest
  } = props;

  delete rest.displayName;

  const classes = classnames('eui-floating-action-button', className, {
    [`eui-floating-action-button-${color}`]: color,
  });
  let iconNode;

  if (React.isValidElement(icon)) {
    iconNode = icon;
  } else {
    iconNode = <i className="material-icons">{icon}</i>;
  }

  return (
    <button
      {...rest}
      aria-label={ariaLabel}
      className={classes}
      ref={floatingActionButtonNode}
      disabled={disabled}
    >
      {iconNode}
    </button>
  );
});

FloatingActionButton.displayName = 'FloatingActionButton';

export default FloatingActionButton;
