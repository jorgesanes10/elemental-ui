import { Children, FC, HTMLProps, ReactElement, useState } from 'react';
import classnames from 'classnames';
import IconButton from '../IconButton';
import Panel from '../Panel';
import simpleComponentFactory from '../../utils/simpleComponentFactory';
import { ButtonProps } from '../Button/Button.tsx';
import { PanelProps } from '../Panel/Panel.tsx';

interface InfoPanelProps extends PanelProps {
  buttonIcon?: string;
  buttonProps?: ButtonProps;
  showPrimaryView?: boolean;
  toggleView?: (showPrimaryView: boolean) => void;
}

type PanelChild = {
  primary?: ReactElement;
  secondary?: ReactElement;
};

const InfoPanel: FC<InfoPanelProps> = (props) => {
  const [hasPrimaryView, setHasPrimaryView] = useState(true);

  function handleToggleView() {
    const { toggleView, showPrimaryView } = props;

    if (showPrimaryView === undefined) {
      setHasPrimaryView(!hasPrimaryView);
    } else {
      if (toggleView) {
        toggleView(showPrimaryView);
      }
    }
  }

  function renderChildren() {
    const { children } = props;

    const panelChildren: PanelChild = {};

    Children.map(children as ReactElement[], (child) => {
      if (!child) {
        return child;
      }

      const childName = (child.type as unknown as { displayName: string })
        .displayName;

      if (childName === 'InfoPanelPrimaryView') {
        panelChildren.primary = child.props.children;
      } else if (childName === 'InfoPanelSecondaryView') {
        panelChildren.secondary = child.props.children;
      } else {
        console.error(
          'InfoPanel only accepts InfoPanel.PrimaryView and ' +
            'InfoPanel.SecondaryView as children. ' +
            'All other elements are discarded.',
        );
      }
    });

    return panelChildren;
  }

  const { primary, secondary } = renderChildren();

  const {
    buttonIcon = 'edit',
    className,
    showPrimaryView,
    toggleView,
    buttonProps,
    ...rest
  } = props;

  if (showPrimaryView !== undefined && !toggleView) {
    console.error(
      'You made the component controlled by passing `showPrimaryView`, thus you must provide `toggleView`',
    );
  }

  let currentView = hasPrimaryView ? primary : secondary;

  if (showPrimaryView !== undefined) {
    currentView = showPrimaryView ? primary : secondary;
  }

  return (
    <Panel
      {...(rest as Omit<HTMLProps<HTMLDivElement>, 'color'>)}
      className={classnames('eui-info-panel', className)}
    >
      <Panel.Body>
        <IconButton
          {...buttonProps}
          className="eui-info-panel-toggle-button"
          onClick={handleToggleView}
          icon={currentView === primary ? buttonIcon : 'close'}
        />
        {currentView}
      </Panel.Body>
    </Panel>
  );
};

const PrimaryView = simpleComponentFactory(
  'div',
  'InfoPanelPrimaryView',
  'eui-info-panel-primary-view',
);
const SecondaryView = simpleComponentFactory(
  'div',
  'InfoPanelSecondaryView',
  'eui-info-panel-secondary-view',
);

export default Object.assign(InfoPanel, { PrimaryView, SecondaryView });
