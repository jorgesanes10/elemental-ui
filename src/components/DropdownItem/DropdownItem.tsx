import {
  FC,
  HTMLAttributes,
  HTMLProps,
  MouseEvent,
  KeyboardEvent,
  FocusEvent,
} from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
import OverlayTrigger from '../OverlayTrigger';
import Popover from '../Popover';

type DropdownItemProps = Omit<HTMLAttributes<HTMLElement>, 'onSelect'> & {
  active?: boolean;
  disabled?: boolean;
  isHeader?: boolean;
  isSeparator?: boolean;
  useButton?: boolean;
  eventKey?: string;
  tooltip?: string;
  color?: 'primary' | 'success' | 'danger' | 'info' | 'warning';
  href?: string;
  icon?: string;
  onSelect?: (
    eventKey: string,
    event: MouseEvent,
    detail: 'keyDown' | 'click',
  ) => void;
  tabIndex?: number;
  ariaLabel?: string;
};

const DropdownItem: FC<DropdownItemProps> = (props) => {
  function handleClick(event: MouseEvent<HTMLElement>) {
    const { onClick, onSelect, eventKey, disabled, href } = props;

    if (href === '#' || disabled) {
      event.preventDefault();
    }

    if (onClick) {
      onClick(event);
    }

    if (onSelect) {
      onSelect(eventKey!, event, event.detail === 0 ? 'keyDown' : 'click');
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    const { onKeyDown } = props;

    if (onKeyDown) {
      onKeyDown(event);
    }
  }

  function handleMouseEnter(event: MouseEvent<HTMLElement>) {
    const { onMouseEnter } = props;

    if (onMouseEnter) {
      onMouseEnter(event);
    }
  }

  function handleFocus(
    event: FocusEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) {
    const { onMouseEnter } = props;

    if (onMouseEnter) {
      onMouseEnter(event as unknown as MouseEvent<HTMLElement>);
    }
  }

  function handleMouseLeave(event: MouseEvent<HTMLElement>) {
    const { onMouseLeave } = props;

    if (onMouseLeave) {
      onMouseLeave(event);
    }
  }

  function handleBlur(
    event: FocusEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) {
    const { onMouseLeave } = props;

    if (onMouseLeave) {
      onMouseLeave(event as unknown as MouseEvent<HTMLElement>);
    }
  }

  const {
    active,
    className,
    children,
    color,
    disabled,
    isHeader,
    href = '#',
    icon,
    isSeparator,
    tabIndex = 0,
    useButton,
    tooltip,
    ariaLabel,
    ...rest
  } = props;

  delete rest.eventKey;
  delete rest.onSelect;

  if (isSeparator) {
    return (
      <div
        {...(rest as HTMLProps<HTMLDivElement>)}
        className={classnames('eui-dropdown-item', 'separator', className)}
      />
    );
  }

  if (isHeader) {
    return (
      <div
        {...(rest as HTMLProps<HTMLDivElement>)}
        role="menuitem"
        className={classnames('eui-dropdown-item', 'header', className)}
      >
        {children}
      </div>
    );
  }

  const tagType = useButton ? 'button' : 'a';

  const propsList = {
    ...rest,
    className: classnames('eui-dropdown-item', className, {
      active,
      disabled,
      [`eui-dropdown-item-${color}`]: color,
    }),
    href,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onSelect: () => {},
    role: 'menuitem',
    tabIndex,
    'aria-label': `${ariaLabel || children}${tooltip ? `. ${tooltip}` : ''}`,
  };

  const content = (
    <>
      {icon ? <Icon aria-hidden name={icon} /> : null}
      {children}
    </>
  );

  let tag = <button {...propsList}>{content}</button>;

  if (tagType === 'a') {
    propsList.href = href;
    tag = <a {...propsList}>{content}</a>;
  }

  if (tooltip) {
    return (
      <OverlayTrigger
        placement="right"
        triggerType="hover"
        overlay={<Popover>{tooltip}</Popover>}
      >
        {tag}
      </OverlayTrigger>
    );
  }

  return tag;
};

export default DropdownItem;
