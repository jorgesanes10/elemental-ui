/* eslint no-undefined: "off" */

import React, {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  MouseEvent,
  KeyboardEvent,
  ReactElement,
  Children,
  ReactNode,
  HTMLAttributes,
} from 'react';
import classnames from 'classnames';
import Collapsible from '../Collapsible';
import simpleComponentFactory from '../../utils/simpleComponentFactory';
import { usePrevious } from '../../utils/customHooks';
import findElementNode from '../../utils/findElementNode';
import Panel, { PanelProps } from '../Panel/Panel';
import IconButton, { IconButtonRef } from '../IconButton/IconButton';

interface ExpansionPanelProps extends PanelProps {
  defaultExpanded?: boolean;
  expanded?: boolean;
  onToggle?: (
    event: KeyboardEvent | MouseEvent,
    eventKey?: string,
    customId?: string,
  ) => void;
  growHorizontally?: boolean;
  buttonProps?: HTMLAttributes<HTMLButtonElement>;
  noCaret?: boolean;
  hideToggleOnExpanded?: boolean;
  eventKey?: string;
  customId?: string;
  toggleAriaLabel?: string;
}

type PanelChild = {
  summary?: ReactNode;
  alternativeSummary?: ReactNode;
  content?: ReactNode;
  summaryIndex?: number;
  contentIndex?: number;
};

const ExpansionPanel = React.forwardRef<HTMLButtonElement, ExpansionPanelProps>(
  (props, ref) => {
    const toggleNode: MutableRefObject<HTMLButtonElement | null> = useRef(null);
    const btnCollapseNode: MutableRefObject<IconButtonRef | null> =
      useRef(null);
    const [expanded, setExpanded] = useState(props.defaultExpanded);

    let prevDefaultExpanded = usePrevious<boolean>(!!props.defaultExpanded);
    let prevExpanded = usePrevious<boolean>(!!props.expanded);

    useEffect(() => {
      prevDefaultExpanded = props.defaultExpanded;
      prevExpanded = props.expanded;
    }, []);

    useEffect(() => {
      if (prevDefaultExpanded !== props.defaultExpanded) {
        setExpanded(props.defaultExpanded);
      }

      if (prevExpanded === undefined && props.expanded) {
        console.error(
          'ExpansionPanel is changing from uncontrolled to be controlled. ' +
            'ExpansionPanel elements should not switch from uncontrolled to controlled' +
            '(or vice versa). Decide between using a controlled or uncontrolled' +
            'ExpansionPanel element for the lifetime of the component.',
        );
      }

      if (prevExpanded !== undefined && props.defaultExpanded !== undefined) {
        console.error(
          'ExpansionPanel is changing from controlled to be uncontrolled. ' +
            'ExpansionPanel elements should not switch from controlled to uncontrolled' +
            '(or vice versa). Decide between using a controlled or uncontrolled' +
            'ExpansionPanel element for the lifetime of the component.',
        );
      }
    }, [props.expanded, props.defaultExpanded]);

    function handleToggle(
      event: KeyboardEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>,
    ) {
      event.preventDefault();

      const { onToggle, eventKey, customId, hideToggleOnExpanded } = props;

      setExpanded(!expanded);

      if (
        hideToggleOnExpanded &&
        event.type === 'keydown' &&
        (event as KeyboardEvent).key === ' '
      ) {
        if (!expanded) {
          findElementNode(
            btnCollapseNode as unknown as MutableRefObject<HTMLButtonElement>,
          )!.focus();
        } else {
          findElementNode(
            toggleNode as MutableRefObject<HTMLButtonElement>,
          )!.focus();
        }
      }

      if (onToggle) {
        onToggle(event, eventKey, customId);
      }
    }

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
      handleToggle(event);

      const { onClick } = props;

      if (onClick) {
        onClick(event);
      }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
      if (event.key === ' ') {
        handleToggle(event);
      }

      const { onKeyDown } = props;

      if (onKeyDown) {
        onKeyDown(event);
      }
    }

    function getPanelChildren() {
      const { children } = props;

      const panelChildren: PanelChild = {};

      Children.map(children as ReactElement[], (child, index) => {
        if (!child) {
          return child;
        }

        const childName = (child.type as unknown as { displayName: string })
          .displayName;

        if (childName === 'ExpansionPanelSummary') {
          panelChildren.summary = child.props.children;
          panelChildren.summaryIndex = index;
        } else if (childName === 'ExpansionPanelAlternativeSummary') {
          panelChildren.alternativeSummary = child.props.children;
        } else if (childName === 'ExpansionPanelContent') {
          panelChildren.content = child.props.children;
          panelChildren.contentIndex = index;
        } else {
          console.error(
            'ExpansionPanel only accepts ExpansionPanel.Summary, ' +
              'ExpansionPanel.AlternativeSummary and ' +
              'ExpansionPanel.Content as children. All other elements are discarded.',
          );
        }
      });

      return panelChildren;
    }

    const {
      className,
      eventKey,
      noCaret,
      growHorizontally = true,
      toggleAriaLabel,
      hideToggleOnExpanded,
      buttonProps,
      ...rest
    } = props;

    delete rest.onToggle;
    delete rest.defaultExpanded;
    delete rest.onKeyDown;
    delete rest.customId;
    delete rest.children;
    delete rest.expanded;
    delete rest.color;

    const { summary, alternativeSummary, content, summaryIndex, contentIndex } =
      getPanelChildren();

    const summaryBeforeContent = summaryIndex! < contentIndex!;

    const isExpanded = props.expanded !== undefined ? props.expanded : expanded;

    const toggleElement = (
      <button
        {...buttonProps}
        aria-label={toggleAriaLabel}
        aria-expanded={!!expanded || !!props.expanded}
        className={classnames('eui-expansion-panel-toggle', {
          'no-caret': noCaret,
          'hide-on-expand': hideToggleOnExpanded,
          reversed: !summaryBeforeContent,
        })}
        tabIndex={expanded && hideToggleOnExpanded ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        id={eventKey}
        ref={ref || toggleNode}
      >
        {alternativeSummary
          ? isExpanded
            ? alternativeSummary
            : summary
          : summary || 'Toggle'}
      </button>
    );

    const contentElement = (
      <Collapsible expanded={isExpanded}>
        <Panel>
          <Panel.Body>
            {hideToggleOnExpanded ? (
              <IconButton
                icon="expand_less"
                className="btn-collapse"
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                ref={btnCollapseNode}
                ariaLabel="Collapse panel"
              />
            ) : null}
            {content}
          </Panel.Body>
        </Panel>
      </Collapsible>
    );

    let firstChildElement;
    let secondChildElement;

    if (summaryBeforeContent) {
      firstChildElement = toggleElement;
      secondChildElement = contentElement;
    } else {
      firstChildElement = contentElement;
      secondChildElement = toggleElement;
    }

    return (
      <Panel
        {...rest}
        className={classnames('eui-expansion-panel', className, {
          expanded: isExpanded,
          'grow-horizontally': growHorizontally,
        })}
      >
        <Panel.Body>
          {firstChildElement}
          {secondChildElement}
        </Panel.Body>
      </Panel>
    );
  },
);

ExpansionPanel.displayName = 'ExpansionPanel';

const Summary = simpleComponentFactory('div', 'ExpansionPanelSummary');
const AlternativeSummary = simpleComponentFactory(
  'div',
  'ExpansionPanelAlternativeSummary',
);
const Content = simpleComponentFactory('div', 'ExpansionPanelContent');

export default Object.assign(ExpansionPanel, {
  Summary,
  AlternativeSummary,
  Content,
});
