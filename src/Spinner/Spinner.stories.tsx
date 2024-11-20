import type { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';

const meta: Meta<typeof Spinner> = {
  component: Spinner,
};

export default meta;
type Story = StoryObj<typeof Spinner>;

const styles = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
};

export const Default: Story = {
  render: ({ size, color }) => (
    <div style={styles}>
      <Spinner size={size} color={color} />
    </div>
  ),
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
    },
  },
};
