import React, {
  Children,
  cloneElement,
  FC,
  HTMLAttributes,
  MutableRefObject,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import simpleComponentFactory from '../../utils/simpleComponentFactory.tsx';
import ModalHeader from './ModalHeader.tsx';
import ModalTitle from './ModalTitle.tsx';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  centered?: boolean;
  hideOnOutsideClick?: boolean;
  isLeftDrawer?: boolean;
  isRightDrawer?: boolean;
  size?: 'sm' | 'md';
  backdrop?: boolean | 'static';
  onHide?: () => void;
  show?: boolean;
}

const Modal: FC<ModalProps> = (props) => {
  const [show, setShow] = useState(props.show);
  const [modalTitleState, setModalTitleState] = useState('');

  const modalContainer: MutableRefObject<HTMLDivElement> = useRef(
    document.createElement('div'),
  );

  const previousProps: MutableRefObject<ModalProps | undefined> = useRef();
  const previousShow: MutableRefObject<boolean | undefined> = useRef();
  const snapshotRef: MutableRefObject<
    { lastFocusedElement: Element | null } | undefined
  > = useRef();

  const lastFocusedElement: MutableRefObject<Element | null | undefined> =
    useRef();

  const firstElement: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const lastElement: MutableRefObject<HTMLInputElement | null> = useRef(null);

  useEffect(() => {
    previousProps.current = props;
    previousShow.current = show;

    if (props.show && !previousShow.current) {
      snapshotRef.current = { lastFocusedElement: document.activeElement };
    }
  });

  useEffect(() => {
    if (props.show && !previousShow.current) {
      setShow(props.show);

      lastFocusedElement.current = snapshotRef.current?.lastFocusedElement;
      document.body.classList.add('eui-modal-open');
      hideNodeAndChildren(document.body);

      document.addEventListener('keydown', handleKeyDown);
    } else if (!props.show && previousShow.current) {
      setTimeout(() => {
        setShow(props.show);
      }, 300);

      if (lastFocusedElement.current) {
        (lastFocusedElement.current as HTMLElement).focus();
      }

      document.body.classList.remove('eui-modal-open');
      unhideNodeAndChildren(document.body);

      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [props.show, previousShow]);

  useEffect(() => {
    document.body.appendChild(modalContainer.current);
    modalContainer.current.setAttribute('id', 'modal-container');

    if (props.show) {
      document.body.classList.add('eui-modal-open');
      hideNodeAndChildren(document.body);
    }

    document.addEventListener('keydown', handleKeyDown);
    setModalTitle();

    return () => {
      document.body.removeChild(modalContainer.current);
      document.body.classList.remove('eui-modal-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const setModalTitle = () => {
    const { children } = props;

    return Children.map(children as ReactElement[], (child) => {
      if (child && child.type === ModalHeader) {
        let modalTitle;

        if (child.props.children) {
          if (child.props.children.type === ModalTitle) {
            const directChild = child.props.children.props.children;

            if (directChild.props) {
              modalTitle = directChild.props['aria-label'];
            } else {
              modalTitle = directChild;
            }
          } else {
            const directChild = child.props.children;

            if (directChild.props) {
              modalTitle = directChild.props['aria-label'];
            } else {
              modalTitle = directChild;
            }
          }

          setModalTitleState(modalTitle);
        }
      }
    });
  };

  const hideNodeAndChildren = (node: Element) => {
    if (node.id === 'modal-container') {
      return null;
    }

    node.setAttribute('tabindex', '-1');

    if (node.children && node.children.length) {
      [...node.children].forEach((n) => {
        hideNodeAndChildren(n);
      });
    }
  };

  const unhideNodeAndChildren = (node: Element) => {
    if (node.id === 'modal-container') {
      return null;
    }

    node.removeAttribute('aria-hidden');
    node.removeAttribute('tabindex');

    if (node.children && node.children.length) {
      [...node.children].forEach((n) => {
        unhideNodeAndChildren(n);
      });
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const { onHide } = props;

    if (event.key === 'Escape' && onHide) {
      onHide();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { backdrop, hideOnOutsideClick = false, onHide } = props;
    const isOutsideClick = event.target === event.currentTarget;

    if (isOutsideClick && onHide && (hideOnOutsideClick || backdrop === true)) {
      onHide();
    }
  };

  const renderChildrenWithProps = () => {
    const { children, onHide } = props;

    return Children.map(children as ReactElement[], (child) => {
      if (child && child.type === ModalHeader) {
        return cloneElement(child, { ...child.props, onHide });
      }

      return child;
    });
  };

  const focusFirstElement = () => {
    (firstElement.current as HTMLElement).focus();
  };

  const focusLastElement = () => {
    (lastElement.current as HTMLElement).focus();
  };

  const handleFirstElementKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Tab' && event.shiftKey) {
      focusLastElement();
    }
  };

  const handleLastElementKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Tab') {
      focusFirstElement();
    }

    if (event.key === 'Tab' && event.shiftKey) {
      event.preventDefault();
    }
  };

  if (!show) {
    return null;
  }

  const {
    centered,
    className,
    show: propsShow,
    size,
    isLeftDrawer,
    isRightDrawer,
    ...rest
  } = props;

  delete rest.backdrop;
  delete rest.hideOnOutsideClick;
  delete rest.onHide;

  return createPortal(
    <div
      {...rest}
      className={classnames('eui-modal fade', className, {
        centered,
        in: propsShow,
        'left-drawer': isLeftDrawer,
        'right-drawer': isRightDrawer,
        'no-title': !modalTitleState,
      })}
      onClick={handleClick}
      role="presentation"
    >
      <div
        className={classnames('eui-modal-dialog', {
          [`eui-modal-${size}`]: size,
        })}
        role="dialog"
        aria-modal
        aria-label={modalTitleState}
        tabIndex={-1}
      >
        <input
          ref={firstElement}
          className="eui-modal-invisible-element first-element"
          onKeyDown={handleFirstElementKeyDown}
          readOnly
          aria-hidden="true"
        />
        {renderChildrenWithProps()}
        <input
          ref={lastElement}
          className="eui-modal-invisible-element last-element"
          onKeyDown={handleLastElementKeyDown}
          readOnly
          aria-hidden="true"
        />
      </div>
    </div>,
    modalContainer.current,
  );
};

const Body = simpleComponentFactory('div', 'ModalBody', 'eui-modal-body');
const Dialog = simpleComponentFactory(
  'div',
  'ModalDialog',
  '',
  'Warning: The usage of `<Modal.Dialog>` is deprecated. Simply remove it.',
);
const Footer = simpleComponentFactory('div', 'ModalFooter', 'eui-modal-footer');
const Header = ModalHeader;
const Title = ModalTitle;

export default Object.assign(Modal, { Body, Footer, Dialog, Header, Title });
