import { ElementType, FC, HTMLProps } from 'react';
import classnames from 'classnames';

interface ComponentProps extends HTMLProps<HTMLElement> {
  displayName?: string;
}

export default (
  Component: ElementType,
  name: string,
  componentClass?: string,
  warning?: string,
) => {
  const SimpleComponent: FC<ComponentProps> = ({
    className,
    children,
    ...rest
  }) => {
    if (warning) {
      console.error(warning);
    }

    return (
      <Component
        {...rest}
        name={name}
        className={classnames(componentClass, className)}
      >
        {children}
      </Component>
    );
  };

  SimpleComponent.displayName = name;

  return SimpleComponent;
};
