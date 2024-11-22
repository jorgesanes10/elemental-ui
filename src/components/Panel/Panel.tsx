import React, { HTMLProps } from 'react';
import classnames from 'classnames';
import simpleComponentFactory from '../../utils/simpleComponentFactory.tsx';

export type PanelProps = HTMLProps<HTMLElement> & {
  color?: 'default' | 'success' | 'warning' | 'danger';
};

const Panel = React.forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { children, className, color = 'default', ...rest } = props;

  return (
    <div
      {...rest}
      className={classnames('eui-panel', className, `eui-panel-${color}`)}
      ref={ref}
    >
      {children}
    </div>
  );
});

Panel.displayName = 'Panel';

const Body = simpleComponentFactory('div', 'PanelBody', 'eui-panel-body');
const Footer = simpleComponentFactory('div', 'PanelFooter', 'eui-panel-footer');
const Heading = simpleComponentFactory(
  'div',
  'PanelHeading',
  'eui-panel-heading',
);

export default Object.assign(Panel, { Body, Footer, Heading });
