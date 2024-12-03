import type { Meta, StoryObj } from '@storybook/react';
import { CSSProperties } from 'react';
import { Badge } from '../../index.ts';

const meta: Meta<typeof Badge> = {
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

const styles: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100vw',
  height: '100vh',
};

const labelStyle = { margin: '5px' };

export const Default: Story = {
  render: ({ color, label }) => (
    <div style={styles}>
      <Badge color={color}>{label}</Badge>
    </div>
  ),
  argTypes: {
    color: {
      control: {
        type: 'select',
      },
    },
  },
  args: { label: 'Label', color: 'default' },
};

export const Styles: Story = {
  render: () => (
    <div style={styles}>
      <Badge style={labelStyle} color="info">
        Open
      </Badge>
      <Badge style={labelStyle} color="warning">
        Pending
      </Badge>
      <Badge style={labelStyle}>Resolved</Badge>
      <Badge style={labelStyle} color="danger">
        Danger
      </Badge>
      <Badge style={labelStyle} color="success">
        Success
      </Badge>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};
