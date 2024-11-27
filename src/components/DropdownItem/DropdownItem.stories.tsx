import type { Meta, StoryObj } from '@storybook/react';
import DropdownItem from './DropdownItem';
import { CSSProperties } from 'react';

const meta: Meta<typeof DropdownItem> = {
  component: DropdownItem,
};

export default meta;
type Story = StoryObj<typeof DropdownItem>;

const styles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
};

export const Default: Story = {
  render: ({
    active,
    disabled,
    isSeparator,
    tooltip,
    isHeader,
    useButton,
    eventKey,
    color,
    icon,
  }) => (
    <div style={styles}>
      <DropdownItem
        active={active}
        disabled={disabled}
        isSeparator={isSeparator}
        tooltip={tooltip}
        isHeader={isHeader}
        useButton={useButton}
        eventKey={eventKey}
        color={color}
        icon={icon}
      >
        Default
      </DropdownItem>
    </div>
  ),
  argTypes: {
    color: {
      control: {
        type: 'select',
      },
    },
    href: {
      table: {
        disable: true,
      },
    },
    onSelect: {
      table: {
        disable: true,
      },
    },
    tabIndex: {
      table: {
        disable: true,
      },
    },
    ariaLabel: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    active: false,
    disabled: false,
    isHeader: false,
    isSeparator: false,
    useButton: false,
    eventKey: '',
    tooltip: '',
    icon: 'face',
  },
};

export const Styles: Story = {
  render: () => (
    <div style={styles}>
      <DropdownItem>Default</DropdownItem>
      <DropdownItem active>Active</DropdownItem>
      <DropdownItem disabled>Disabled</DropdownItem>
      <DropdownItem isSeparator />
      <DropdownItem isHeader>Header</DropdownItem>
      <DropdownItem useButton>Button</DropdownItem>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};
