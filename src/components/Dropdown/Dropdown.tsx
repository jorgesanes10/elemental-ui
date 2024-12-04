import {
  Children,
  cloneElement,
  FC,
  HTMLProps,
  KeyboardEvent,
  MutableRefObject,
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import findElementNode from '../../utils/findElementNode.ts';
import DropdownMenu from '../DropdownMenu';
import DropdownItem from '../DropdownItem';
import Button from '../Button';
import IconButton from '../IconButton';
import FloatingActionButton from '../FloatingActionButton';

interface DropdownProps extends Omit<HTMLProps<HTMLDivElement>, 'onSelect'> {
  toggleOnHover?: boolean;
  fromRight?: boolean;
  onSelect?: () => void;
  onToggle?: (event: KeyboardEvent) => void;
  tabIndex?: number;
}

const Dropdown: FC<DropdownProps> = (props) => {
  const [fromRight, setFromRight] = useState<boolean | null>(null);
  const [menuWidth, setMenuWidth] = useState(0);
  const [show, setShow] = useState(false);
  const [eventType, setEventType] = useState('');

  const dropdownNode: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const dropdownMenuNode: MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const toggleNode: MutableRefObject<HTMLElement | null> = useRef(null);

  useLayoutEffect(() => {
    toggleNode.current = findElementNode(toggleNode) as HTMLElement;
    dropdownNode.current = findElementNode(dropdownNode) as HTMLDivElement;
    dropdownMenuNode.current = findElementNode(
      dropdownMenuNode,
    ) as HTMLDivElement;

    flipMenu();
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleOuterClick, true);
    window.addEventListener('resize', flipMenu);

    return () => {
      window.removeEventListener('click', handleOuterClick, true);
      window.removeEventListener('resize', flipMenu);
    };
  }, []);

  useEffect(() => {
    if (show) {
      focusMenu();

      if (eventType === 'keydown' || eventType === 'focus') {
        focusFirstItem();
      }
    } else {
      focusToggle();
    }
  }, [show]);

  const flipMenu = () => {
    if (window.innerWidth > 576) {
      const toggleDimensions =
        findElementNode(toggleNode)!.getBoundingClientRect();
      const menuDimensions =
        findElementNode(dropdownMenuNode)!.getBoundingClientRect();
      const width = menuDimensions.width || menuWidth;

      setMenuWidth(width);

      const menuWithoutOverlap = width - toggleDimensions.width;

      const hasSpaceToTheRight =
        window.innerWidth - toggleDimensions.right > menuWithoutOverlap;

      const hasSpaceToTheLeft = toggleDimensions.left > menuWithoutOverlap;

      if (!hasSpaceToTheRight) {
        return setFromRight(true);
      }

      if (!hasSpaceToTheLeft) {
        return setFromRight(false);
      }

      return setFromRight(null);
    }
  };

  const focusFirstItem = () => {
    const firstItem = findElementNode(dropdownMenuNode)!.querySelector(
      'a.eui-dropdown-item, button.eui-dropdown-item',
    ) as HTMLButtonElement | HTMLAnchorElement;

    const activeItem = [...findElementNode(dropdownMenuNode)!.children].find(
      (child) => child.className.includes('active'),
    ) as HTMLButtonElement | HTMLAnchorElement;

    if (activeItem) {
      activeItem.focus();
    } else {
      firstItem.focus();
    }
  };

  const focusMenu = () => {
    dropdownMenuNode.current!.focus();
  };

  const focusToggle = () => {
    toggleNode.current!.focus();
  };

  const handleHide = (
    _: (event: KeyboardEvent | MouseEvent, eventType: string) => void,
    eventType: 'keyDown' | 'click',
  ) => {
    if (show) {
      setShow(false);

      if (eventType === 'keyDown') {
        focusToggle();
      }
    }
  };

  const handleOuterClick = (event: MouseEvent) => {
    const outerClick =
      !findElementNode(toggleNode)!.contains(event.target as Node) &&
      !findElementNode(dropdownNode)!.contains(event.target as Node);

    if (outerClick) {
      setShow(false);
    }
  };

  const handleToggle = (
    onClick: (event: KeyboardEvent) => void,
    event: KeyboardEvent,
  ) => {
    event.persist();

    const { onToggle } = props;

    if (event.key === 'Enter') {
      event.preventDefault();
    }

    if (
      (event.key === 'Enter' ||
        event.key === 'Escape' ||
        event.type !== 'keydown') &&
      !(event.key === 'Escape' && !show) &&
      !(event.type === 'mouseenter' && show)
    ) {
      if (onToggle) {
        onToggle(event);
      }

      if (onClick) {
        onClick(event);
      }

      const newEventType =
        (event.target as HTMLElement).tagName === 'BUTTON'
          ? 'keydown'
          : 'click';

      setEventType(newEventType);
      setShow((prevShow) => !prevShow);
    }
  };

  const handleMouseEnter = () => {
    if (props.toggleOnHover) {
      setShow(true);
    }
  };

  const handleMouseLeave = () => {
    if (props.toggleOnHover) {
      setShow(false);
    }
  };

  const renderChildrenWithProps = () => {
    const { children, disabled, onSelect, tabIndex } = props;

    return Children.map(children as ReactElement[], (child) => {
      if (!child) {
        return child;
      }

      if (
        child.type === Button ||
        child.type === IconButton ||
        child.type === FloatingActionButton
      ) {
        return cloneElement(child, {
          'aria-expanded': show,
          'aria-disabled': !!disabled,
          'aria-haspopup': true,
          disabled,
          onClick: handleToggle.bind(null, child.props.onClick),
          onKeyDown: handleToggle.bind(null, child.props.onClick),
          ref: toggleNode,
          tabIndex,
        });
      } else if (
        child.type === DropdownMenu
        // || child.props.displayName === 'FloatingActionMenu'
      ) {
        return cloneElement(child, {
          fromRight: fromRight !== null ? fromRight : props.fromRight,
          onSelect,
          show: show,
          onHide: handleHide,
          ref: dropdownMenuNode,
        });
      }

      console.error(
        'Dropdown only accepts Button, FloatingActionButton, IconButton, FloatingActionMenu ' +
          'or Dropdown.Menu as children. All other elements are discarded.',
      );
    });
  };

  const { className, ...rest } = props;

  delete rest.disabled;
  delete rest.fromRight;
  delete rest.onSelect;
  delete rest.onToggle;
  delete rest.tabIndex;
  delete rest.toggleOnHover;

  return (
    <div
      {...rest}
      className={classnames('eui-dropdown', className, {
        show,
      })}
      ref={dropdownNode}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderChildrenWithProps()}
    </div>
  );
};

export default Object.assign(Dropdown, {
  Menu: DropdownMenu,
  Item: DropdownItem,
});
