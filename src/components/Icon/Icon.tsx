import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  ComponentPropsWithoutRef,
  MutableRefObject,
} from 'react';
import classnames from 'classnames';
import findElementNode from '../../utils/findElementNode.ts';

interface IconRef {
  node: MutableRefObject<HTMLElement | null>;
}

interface IconProps extends ComponentPropsWithoutRef<'i'> {
  name: string;
  iconStyle?: 'filled' | 'outlined' | 'round' | 'sharp' | 'twoTone';
  displayName?: string;
}

const Icon = React.forwardRef<IconRef, IconProps>((props, ref) => {
  const iconNode: MutableRefObject<HTMLElement | null> = useRef(null);

  useImperativeHandle(ref, () => ({
    node: iconNode,
  }));

  useEffect(() => {
    iconNode.current = findElementNode(iconNode);
  }, []);

  const { name = 'Icon', className, iconStyle = 'filled', ...rest } = props;

  delete rest.displayName;

  const iconClass = {
    filled: '',
    outlined: '-outlined',
    round: '-round',
    sharp: '-sharp',
    twoTone: '-two-tone',
  };

  const classes = classnames(
    'eui-icon',
    `material-icons${iconClass[iconStyle] || ''}`,
    className,
  );

  return (
    <i className={classes} ref={iconNode} {...rest}>
      {name}
    </i>
  );
});

Icon.displayName = 'Icon';

export default Icon;
