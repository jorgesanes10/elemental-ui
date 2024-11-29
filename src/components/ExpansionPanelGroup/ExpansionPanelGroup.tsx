import React, {
  useState,
  useEffect,
  useRef,
  HTMLProps,
  FC,
  ReactElement,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import classNames from 'classnames';
import ExpansionPanel from '../ExpansionPanel';

export interface ExpansionPanelGroupProps extends HTMLProps<HTMLDivElement> {
  isAccordion?: boolean;
  arePanelsUnified?: boolean;
  onPanelToggle?: (event: MouseEvent, id: string, customId: string) => void;
  initialZIndex?: number;
}

type State = {
  [key: string]: boolean;
};

type PanelNode = {
  id: string;
  node: HTMLElement;
};

const ExpansionPanelGroup: FC<ExpansionPanelGroupProps> = (props) => {
  const [state, setState] = useState<State>({});
  const panelNodes = useRef<PanelNode[]>([]);

  useEffect(() => {
    const { children, id } = props;

    React.Children.forEach(children as ReactElement[], (child, index) => {
      setState({
        ...state,
        [`${id}-ecPanel-${index}-expanded`]: !!child.props.expanded,
      });
    });
  }, []);

  function handleToggle(event: MouseEvent, id: string, customId: string) {
    const { onPanelToggle, isAccordion } = props;

    const isExpanded = state[id];

    if (isAccordion) {
      const collapsedState = getStateAllCollapsed();
      setState({ ...collapsedState, [id]: !isExpanded });
    } else {
      setState({ ...state, [id]: !isExpanded });
    }

    if (onPanelToggle) {
      onPanelToggle(event, id, customId);
    }
  }

  function getStateAllCollapsed() {
    const newState: State = {};

    for (const panel in state) {
      newState[panel] = false;
    }

    return newState;
  }

  function handleArrowKeys(e: KeyboardEvent<HTMLButtonElement>) {
    const activeElementId = (e.target as HTMLElement).id;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      getPreviousPanel(activeElementId);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      getNextPanel(activeElementId);
    }
  }

  function getPanelNodeIndexFromId(id: string) {
    return panelNodes.current.findIndex((node) => {
      return node.id === id;
    });
  }

  function getNextPanel(activeElementId: string) {
    const index = getPanelNodeIndexFromId(activeElementId);

    if (index + 1 < panelNodes.current.length) {
      panelNodes.current[index + 1].node.focus();
    } else {
      panelNodes.current[0].node.focus();
    }
  }

  function getPreviousPanel(activeElementId: string) {
    const index = getPanelNodeIndexFromId(activeElementId);

    if (index - 1 >= 0) {
      panelNodes.current[index - 1].node.focus();
    } else {
      panelNodes.current[panelNodes.current.length - 1].node.focus();
    }
  }

  function getChildrenWithProps() {
    const { children, id, initialZIndex = 10 } = props;

    return React.Children.map(children as ReactElement[], (child, index) => {
      if (!child) {
        return child;
      }

      const { expanded } = child.props;

      const childId = `${id}-ecPanel-${index}-expanded`;

      return React.cloneElement(child, {
        onToggle: (event: MouseEvent, id: string, customId: string) => {
          handleToggle(event, id, customId);

          const { onToggle } = child.props;

          if (onToggle) {
            onToggle(event, id, customId);
          }
        },
        eventKey: childId,
        expanded:
          expanded !== null && expanded !== undefined
            ? expanded
            : state[childId] || false,
        onKeyDown: handleArrowKeys,
        ref: (node: HTMLElement) => {
          const exists = panelNodes.current.find((panel) => {
            return panel.id === childId;
          });

          if (!exists) {
            panelNodes.current.push({ id: childId, node });
          }
        },
        style: { zIndex: initialZIndex - index },
      });
    });
  }

  const { className, arePanelsUnified, ...rest } = props;

  delete rest.isAccordion;
  delete rest.onPanelToggle;
  delete rest.children;
  delete rest.id;
  delete rest.initialZIndex;

  return (
    <div
      {...rest}
      className={classNames('eui-expansion-panel-group', className, {
        'unify-panels': arePanelsUnified,
      })}
    >
      {getChildrenWithProps()}
    </div>
  );
};

export default Object.assign(ExpansionPanelGroup, { Panel: ExpansionPanel });
