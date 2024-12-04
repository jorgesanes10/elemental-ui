import React, {
  FC,
  HTMLProps,
  MutableRefObject,
  ReactElement,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import ReactDom from 'react-dom';
import classnames from 'classnames';
import findElementNode from '../../utils/findElementNode';
import Popover from '../Popover';

interface OverlayTriggerProps extends HTMLProps<HTMLDivElement> {
  overlay: string | ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  triggerType?: 'click' | 'hover';
  delay?: number;
  defaultShow?: boolean;
  show?: boolean;
  hideOnOutsideClick?: boolean;
  onToggle?: (visible: boolean) => void;
  children: ReactElement;
}

type XPosition = {
  overlayDimensions: DOMRect;
  overlayWidth: number;
  triggerDimensions: DOMRect;
};

type YPosition = {
  overlayDimensions: DOMRect;
  overlayHeight: number;
  triggerDimensions: DOMRect;
};

const OverlayTrigger: FC<OverlayTriggerProps> = (props) => {
  const { hideOnOutsideClick = true } = props;
  const [placement, setPlacement] = useState(props.placement || 'right');
  const [show, setShow] = useState(false);
  const [timeout, setTimeoutState] = useState<number | undefined>(undefined);
  const [defaultShowTimeout, setDefaultShowTimeout] = useState<
    number | undefined
  >(undefined);

  const overlayNode: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const triggerNode: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useLayoutEffect(() => {
    overlayNode.current = findElementNode(overlayNode) as HTMLDivElement;
    triggerNode.current = findElementNode(triggerNode) as HTMLDivElement;
  }, []);

  useEffect(() => {
    if (props.defaultShow || props.show) {
      setDefaultShowTimeout(
        setTimeout(() => {
          setShow(true);
        }, props.delay || 100),
      );
    }

    if (hideOnOutsideClick) {
      document.addEventListener('click', hideOverlay, true);
    }

    window.addEventListener('resize', positionOverlay);

    return () => {
      window.removeEventListener('resize', positionOverlay);
      clearTimeout(defaultShowTimeout);

      if (hideOnOutsideClick) {
        document.removeEventListener('click', hideOverlay, true);
      }
    };
  }, []);

  useEffect(() => {
    if (show) {
      positionOverlay();
      setOverlayStyles();
    }
  }, [show]);

  useEffect(() => {
    setOverlayStyles();
  }, [placement]);

  useEffect(() => {
    setShow(!!props.show);
  }, [props.show]);

  useEffect(() => {
    if (show) {
      setShow(false);

      setTimeout(() => {
        setPlacement(props.placement || 'right');
        setShow(true);
      }, 200);
    } else {
      setPlacement(props.placement || 'right');
    }
  }, [props.placement]);

  const hideOverlay = (event: MouseEvent) => {
    let isCalendar = false;

    const outerClick =
      !findElementNode(triggerNode)!.contains(event.target as Node) &&
      !findElementNode(overlayNode)!.contains(event.target as Node);

    if (
      event.target instanceof HTMLElement &&
      event.target.className.includes('react-datepicker')
    ) {
      isCalendar = true;
    }

    if (outerClick && !isCalendar) {
      setShow(false);

      const { onToggle } = props;

      if (onToggle) {
        onToggle(false);
      }
    }
  };

  const hideOverlayMouseLeave = () => {
    setShow(false);

    const { onToggle } = props;

    if (onToggle) {
      onToggle(false);
    }
  };

  const showOverlay = () => {
    setShow(true);
  };

  const hasSpaceAtTop = (triggerTop: number, overlayHeight: number) => {
    return triggerTop - overlayHeight - 22 > 0;
  };

  const hasSpaceAtBottom = (
    triggerHeight: number,
    triggerTop: number,
    overlayHeight: number,
  ) => {
    return overlayHeight + triggerHeight + triggerTop + 22 < window.innerHeight;
  };

  const hasSpaceAtLeft = (triggerLeft: number, overlayWidth: number) => {
    return triggerLeft - overlayWidth - 22 > 0;
  };

  const hasSpaceAtRight = (
    triggerLeft: number,
    triggerWidth: number,
    overlayWidth: number,
  ) => {
    return overlayWidth + triggerLeft + triggerWidth + 22 < window.innerWidth;
  };

  const positionOverlay = () => {
    const { placement = 'right' } = props;

    const triggerDimensions =
      findElementNode(triggerNode)!.getBoundingClientRect();
    const overlayWidth = overlayNode.current!.offsetWidth;
    const overlayHeight = overlayNode.current!.offsetHeight;

    const hasSpaceTop = hasSpaceAtTop(triggerDimensions.top, overlayHeight);
    const hasSpaceBottom = hasSpaceAtBottom(
      triggerDimensions.height,
      triggerDimensions.top,
      overlayHeight,
    );
    const hasSpaceLeft = hasSpaceAtLeft(triggerDimensions.left, overlayWidth);
    const hasSpaceRight = hasSpaceAtRight(
      triggerDimensions.left,
      triggerDimensions.width,
      overlayWidth,
    );

    const availableSpace = {
      top: hasSpaceTop,
      bottom: hasSpaceBottom,
      left: hasSpaceLeft,
      right: hasSpaceRight,
    };

    let newPlacement = placement;

    const preferredOrder: Array<'top' | 'bottom' | 'left' | 'right'> = [
      'top',
      'right',
      'bottom',
      'left',
    ];

    if (!availableSpace[placement]) {
      for (const position of preferredOrder) {
        if (availableSpace[position]) {
          newPlacement = position;
          break;
        }
      }
    }

    setPlacement(newPlacement);
  };

  const getXPositions = ({
    overlayDimensions,
    overlayWidth,
    triggerDimensions,
  }: XPosition) => {
    let overlayXPosition;
    let arrowXPosition;

    const triggerWidth = triggerDimensions.width;
    const scrollX = window.scrollX;

    if (
      // The overlay peeks out the right side of the window
      triggerDimensions.left + overlayDimensions.left >
      window.innerWidth
    ) {
      overlayXPosition = 276 - overlayWidth + triggerWidth;
      arrowXPosition = overlayWidth / 2 - triggerWidth / 2;
    } else if (
      // The overlay peeks out the left side of the window
      triggerDimensions.left - (overlayWidth - triggerWidth) / 2 <
      0
    ) {
      overlayXPosition = 276 + scrollX;
      arrowXPosition = -1 * (overlayWidth / 2) + triggerWidth / 2;
    } else {
      // The overlay does not peek out the window
      overlayXPosition =
        276 - overlayWidth / 2 + triggerDimensions.width / 2 + scrollX;
      arrowXPosition = 0;
    }

    if (arrowXPosition >= triggerWidth - 5) {
      arrowXPosition -= 5;
      overlayXPosition += 5;
    } else if (arrowXPosition < 0 && arrowXPosition <= triggerWidth / 2 - 5) {
      arrowXPosition += 5;
      overlayXPosition -= 5;
    }

    return { overlayXPosition, arrowXPosition };
  };

  const getYPositions = ({
    overlayDimensions,
    overlayHeight,
    triggerDimensions,
  }: YPosition) => {
    let overlayYPosition;
    let arrowYPosition;

    const scrollY = window.scrollY;

    const triggerHeight = triggerDimensions.height;

    const basicPosition =
      triggerDimensions.top -
      overlayHeight / 2 +
      triggerDimensions.height / 2 +
      scrollY;

    if (
      // The overlay peeks out the bottom of the window
      triggerHeight + triggerDimensions.top + overlayDimensions.top - 20 >
      window.innerHeight
    ) {
      overlayYPosition =
        triggerDimensions.top - overlayHeight + triggerHeight + scrollY;
      arrowYPosition = overlayHeight / 2 - triggerHeight / 2;
    } else if (
      // The overlay peeks out the top of the window
      triggerDimensions.top - (overlayHeight - triggerHeight) / 2 <
      0
    ) {
      overlayYPosition = triggerDimensions.top + scrollY;
      arrowYPosition = -1 * (overlayHeight / 2) + triggerHeight / 2;
    } else {
      // The overlay does not peek out the window
      overlayYPosition = basicPosition;
      arrowYPosition = 0;
    }

    if (arrowYPosition >= triggerHeight - 5) {
      arrowYPosition -= 5;
      overlayYPosition += 5;
    } else if (arrowYPosition < 0 && arrowYPosition <= triggerHeight / 2 - 5) {
      arrowYPosition += 5;
      overlayYPosition -= 5;
    }

    return { overlayYPosition, arrowYPosition };
  };

  const setOverlayStyles = () => {
    const triggerDimensions =
      findElementNode(triggerNode)!.getBoundingClientRect();
    const overlayDimensions =
      findElementNode(overlayNode)!.getBoundingClientRect();
    const overlayWidth = overlayDimensions.width;
    const overlayHeight = overlayDimensions.height;

    const { overlayXPosition, arrowXPosition } = getXPositions({
      overlayDimensions,
      overlayWidth,
      triggerDimensions,
    });

    const { overlayYPosition, arrowYPosition } = getYPositions({
      overlayDimensions,
      overlayHeight,
      triggerDimensions,
    });

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const verticalPosition = overlayYPosition;
    const horizontalPosition = triggerDimensions.left + overlayXPosition;

    if (placement === 'bottom') {
      overlayNode.current!.style.transform = `translate(${horizontalPosition}px, ${
        triggerDimensions.top + triggerDimensions.height + scrollY
      }px)`;
      (
        overlayNode.current!.querySelector('.arrow') as HTMLDivElement
      ).style.transform = `translateX(${arrowXPosition}px)`;
    } else if (placement === 'top') {
      overlayNode.current!.style.transform = `translate(${horizontalPosition}px, ${
        triggerDimensions.top - overlayHeight - 11 + scrollY
      }px)`;
      (
        overlayNode.current!.querySelector('.arrow') as HTMLDivElement
      ).style.transform = `translateX(${arrowXPosition}px)`;
    } else if (placement === 'left') {
      overlayNode.current!.style.transform = `translate(${
        triggerDimensions.left + 276 - overlayWidth - 11 + scrollX
      }px, ${verticalPosition}px)`;
      (
        overlayNode.current!.querySelector('.arrow') as HTMLDivElement
      ).style.transform = `translateY(${arrowYPosition}px)`;
    } else {
      overlayNode.current!.style.transform = `translate(${
        triggerDimensions.left + 276 + triggerDimensions.width + scrollX
      }px, ${verticalPosition}px)`;
      (
        overlayNode.current!.querySelector('.arrow') as HTMLDivElement
      ).style.transform = `translateY(${arrowYPosition}px)`;
    }
  };

  const handleClick = (
    onClick: (event: React.MouseEvent) => void,
    event: React.MouseEvent,
  ) => {
    preventClickThrough(event);
    const { onToggle, show } = props;

    if (show === undefined) {
      setShow((prevShow) => !prevShow);
    } else {
      positionOverlay();
    }

    if (onClick) {
      onClick(event);
    }

    if (onToggle) {
      onToggle(!show);
    }
  };

  const handleMouseEnter = (
    onMouseEnter: (event: React.MouseEvent) => void,
    event: React.MouseEvent,
  ) => {
    const { delay } = props;

    if (delay) {
      setTimeoutState(
        setTimeout(() => {
          showOverlay();
        }, delay),
      );
    } else {
      showOverlay();
    }

    if (onMouseEnter) {
      onMouseEnter(event);
    }
  };

  const handleMouseLeave = (
    onMouseLeave: (event: React.MouseEvent) => void,
    event: React.MouseEvent,
  ) => {
    clearTimeout(timeout);
    hideOverlayMouseLeave();

    if (onMouseLeave) {
      onMouseLeave(event);
    }
  };

  const renderChildrenWithProps = () => {
    const { triggerType = 'click', children } = props;

    if (!children || !children.props) {
      return;
    }

    // if (children.props) {
    let childProps;

    if (triggerType === 'click') {
      childProps = {
        onClick: handleClick.bind(null, children.props.onClick),
      };
    } else {
      childProps = {
        onMouseEnter: handleMouseEnter.bind(null, children.props.onMouseEnter),
        onFocus: handleMouseEnter.bind(null, children.props.onMouseEnter),
        onMouseLeave: handleMouseLeave.bind(null, children.props.onMouseLeave),
        onBlur: handleMouseLeave.bind(null, children.props.onMouseLeave),
      };
    }

    return React.cloneElement(children, {
      className: classnames(
        'eui-overlay-trigger-trigger',
        children.props.className,
      ),
      ref: triggerNode,
      ...childProps,
    });
    // }

    // return children;
  };

  const renderOverlayWithProps = () => {
    const { overlay } = props;

    if (!overlay) {
      return;
    }

    if (!(overlay as ReactElement).props) {
      return;
    }

    if ((overlay as ReactElement).type === Popover) {
      return React.cloneElement(overlay as ReactElement, { placement });
    }

    return overlay;
  };

  const preventClickThrough = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  const { className, ...rest } = props;

  delete rest.defaultShow;
  delete rest.delay;
  delete rest.hideOnOutsideClick;
  delete rest.overlay;
  delete rest.placement;
  delete rest.show;
  delete rest.triggerType;

  return (
    <div
      {...rest}
      className={classnames('eui-overlay-trigger', className)}
      role="presentation"
    >
      {renderChildrenWithProps()}
      {ReactDom.createPortal(
        <div
          className={classnames('eui-overlay', {
            show,
            [`eui-overlay-${placement}`]: placement,
          })}
          ref={overlayNode}
        >
          {renderOverlayWithProps()}
        </div>,
        document.body,
      )}
    </div>
  );
};

export default OverlayTrigger;
