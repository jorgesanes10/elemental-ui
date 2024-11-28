import { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FloatingActionButton } from '../../index.ts';

const meta: Meta<typeof FloatingActionButton> = {
  component: FloatingActionButton,
};

const styles: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  alignItems: 'center',
  height: '100vh',
  maxWidth: '400px',
  margin: '0 auto',
};

export default meta;
type Story = StoryObj<typeof FloatingActionButton>;

export const Default: Story = {
  render: ({ color, disabled, icon }) => (
    <div style={styles}>
      <FloatingActionButton
        ariaLabel="Add item"
        color={color}
        disabled={disabled}
        icon={icon}
      />
    </div>
  ),
  argTypes: {
    color: {
      control: {
        type: 'select',
      },
    },
    icon: {
      control: {
        type: 'text',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    ariaLabel: {
      table: {
        disable: true,
      },
    },
    displayName: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    icon: 'add',
    disabled: false,
  },
};

export const Styles: Story = {
  render: () => (
    <div style={styles}>
      <FloatingActionButton ariaLabel="Add item" color="info" />
      <FloatingActionButton ariaLabel="Add item" color="default" />
      <FloatingActionButton ariaLabel="Add item" color="brand" />
      <FloatingActionButton ariaLabel="Add item" color="info" disabled />
      <FloatingActionButton ariaLabel="Add item" color="default" disabled />
      <FloatingActionButton ariaLabel="Add item" color="brand" disabled />
      <FloatingActionButton ariaLabel="Edit" icon="create" title="Edit" />
      <FloatingActionButton
        ariaLabel="location"
        icon={
          <i className="material-icons" aria-hidden>
            gps_fixed
          </i>
        }
        title="Current position"
      />
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};
