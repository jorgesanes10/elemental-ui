import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  MutableRefObject,
  ComponentPropsWithoutRef,
} from 'react';
import classnames from 'classnames';
import Spinner from '../Spinner';
import findElementNode from '../../utils/findElementNode.ts';

interface ButtonRef {
  node: MutableRefObject<HTMLButtonElement | null>;
}

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  color?: 'success' | 'warning' | 'danger' | 'info' | 'default' | 'brand';
  shape?: 'classic' | 'flat' | 'outline';
  size?: 'xs' | 'large' | 'lg' | 'small' | 'sm';
  keepStyles?: boolean;
  loading?: boolean;
  progress?: number;
  ariaLabel?: string;
  displayName?: string;
}

const Button = React.forwardRef<ButtonRef, ButtonProps>((props, ref) => {
  const buttonNode: MutableRefObject<HTMLButtonElement | null> = useRef(null);

  useImperativeHandle(ref, () => ({
    focus,
    node: buttonNode,
  }));

  useEffect(() => {
    buttonNode.current = findElementNode(buttonNode) as HTMLButtonElement;
  }, []);

  function focus() {
    buttonNode.current!.focus();
  }

  const {
    ariaLabel,
    children,
    className,
    color = 'default',
    loading,
    shape = 'classic',
    size = 'xs',
    progress,
    keepStyles,
    ...rest
  } = props;

  const btnClass = classnames(
    'eui-btn',
    {
      loading: loading || progress === 0,
      [`eui-btn-${color}`]: color,
      [`eui-btn-${shape}`]: shape,
      [`eui-btn-${size}`]: size,
      'has-progress': progress && progress > 0 && progress < 100,
      'keep-styles': keepStyles,
    },
    className,
  );

  return (
    <button
      aria-busy={loading}
      aria-label={ariaLabel}
      className={btnClass}
      ref={buttonNode}
      {...rest}
    >
      <div className="eui-btn-styles">
        <div
          className="progress"
          style={{ width: `${progress && 100 - progress}%` }}
        />
        <div className="eui-btn-content">
          {loading || progress === 0 ? (
            <Spinner size="sm" aria-label="Loading" />
          ) : null}
          <span className={classnames('caption')}>{children}</span>
        </div>
      </div>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
