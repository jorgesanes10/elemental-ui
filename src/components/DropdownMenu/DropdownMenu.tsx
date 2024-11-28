import {
  HTMLProps,
  MutableRefObject,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
  Children,
  cloneElement,
  ReactElement,
  forwardRef,
  ComponentPropsWithoutRef,
  useImperativeHandle,
} from 'react';
import findElementNode from '../../utils/findElementNode.ts';
import classnames from 'classnames';

interface DropdownMenuRef {
  node: MutableRefObject<HTMLDivElement | null>;
}

interface DropdownMenuProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  fromRight?: boolean;
  onHide?: (event: KeyboardEvent | MouseEvent, eventType: string) => void;
  onSelect?: (
    eventKey: string,
    event: MouseEvent,
    detail: 'keyDown' | 'click',
  ) => void;
  show?: boolean;
  tabIndex?: number;
}

const DropdownMenu = forwardRef<DropdownMenuRef, DropdownMenuProps>(
  (props, ref) => {
    const [noHeight, setNoHeight] = useState(true);

    const dropdownMenuNode: MutableRefObject<HTMLDivElement | null> =
      useRef(null);

    useImperativeHandle(ref, () => ({
      focus,
      node: dropdownMenuNode,
    }));

    useEffect(() => {
      dropdownMenuNode.current = findElementNode(
        dropdownMenuNode,
      ) as HTMLDivElement;
    }, []);

    useEffect(() => {
      positionDropdown();
    }, [props.show]);

    const positionDropdown = () => {
      const { top, height } = dropdownMenuNode.current!.getBoundingClientRect();

      const offset = top + height - window.innerHeight;

      if (offset > 0) {
        dropdownMenuNode.current!.style.top = `-${offset - 20}px`;
      } else {
        dropdownMenuNode.current!.style.top = `auto`;
      }

      if (!props.show) {
        setNoHeight(false);
      }
    };

    const focus = () => {
      dropdownMenuNode.current!.focus();
    };

    const getNodesAndActiveNodeIndex = () => {
      const nodes = [
        ...dropdownMenuNode.current!.querySelectorAll(
          'a[tabindex="0"], button[tabindex="0"]',
        ),
      ] as unknown as (HTMLButtonElement | HTMLAnchorElement)[];

      const activeNodeIndex = nodes.indexOf(
        document.activeElement as HTMLButtonElement | HTMLAnchorElement,
      );

      return { nodes, activeNodeIndex };
    };

    const focusNextChild = () => {
      const { nodes, activeNodeIndex } = getNodesAndActiveNodeIndex();

      const nextNodeIndex =
        activeNodeIndex === nodes.length - 1 ? 0 : activeNodeIndex + 1;

      nodes[nextNodeIndex].focus();
    };

    const focusPreviousChild = () => {
      const { nodes, activeNodeIndex } = getNodesAndActiveNodeIndex();

      const previousNodeIndex =
        activeNodeIndex <= 0 ? nodes.length - 1 : activeNodeIndex - 1;

      nodes[previousNodeIndex].focus();
    };

    const handleClick = (
      onClick: (event: MouseEvent) => void,
      event: MouseEvent,
    ) => {
      if (onClick) {
        onClick(event);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const { onHide, show } = props;

      console.log(event.key);

      if (show) {
        switch (event.key) {
          case event.shiftKey && 'Tab':
          case 'ArrowUp':
            focusPreviousChild();
            event.preventDefault();
            break;
          case 'ArrowDown':
          case 'Tab':
            focusNextChild();
            event.preventDefault();
            break;
          case 'Escape':
            if (onHide) {
              onHide(event, 'keyDown');
            }
            break;
          default:
            break;
        }
      }
    };

    const handleSelect = (
      eventKey: string,
      event: MouseEvent,
      eventType: 'keyDown' | 'click',
    ) => {
      const { onSelect, onHide } = props;

      if (onSelect) {
        onSelect(eventKey, event, eventType);
      }

      if (onHide) {
        onHide(event, eventType);
      }

      // if (childOnSelect) {
      //   childOnSelect(eventKey, event);
      // }
    };

    const renderChildren = () => {
      const { children, show } = props;

      return Children.map(children, (child) => {
        if (!child) {
          return child;
        }

        return cloneElement(child as ReactElement, {
          'aria-hidden': !show,
          onClick: handleClick.bind(
            null,
            (child as ReactElement).props.onClick,
          ),
          onSelect: handleSelect.bind(
            null,
            (child as ReactElement).props.onSelect,
          ),
          tabIndex: show ? 0 : -1,
        });
      });
    };

    const { className, fromRight, show, tabIndex, ...rest } = props;

    delete rest.onHide;

    return (
      <div
        {...(rest as HTMLProps<HTMLDivElement>)}
        aria-hidden={!show}
        className={classnames('eui-dropdown-menu', className, {
          'eui-dropdown-menu-right': fromRight,
          show,
          'no-height': noHeight,
        })}
        onKeyDown={handleKeyDown}
        ref={dropdownMenuNode}
        role="menu"
        tabIndex={show ? tabIndex : -1}
      >
        {renderChildren()}
      </div>
    );
  },
);

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
