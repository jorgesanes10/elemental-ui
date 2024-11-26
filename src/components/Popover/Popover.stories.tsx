import type { Meta, StoryObj } from '@storybook/react';
import Popover from './Popover';

const meta: Meta<typeof Popover> = {
  component: Popover,
};

export default meta;
type Story = StoryObj<typeof Popover>;

const styles = {
  display: 'grid',
  gridGap: '50px',
  gridTemplateColumns: 'repeat(auto-fill, minmax(274px, 1fr))',
  padding: '50px 20px',
};

export const Default: Story = {
  render: ({ placement, title, spread }) => (
    <div style={styles}>
      <Popover
        placement={placement}
        title={title}
        spread={spread}
        style={{ position: 'relative', justifySelf: 'end' }}
      >
        Sed posuere consectetur est at lobortis. Aenean eu leo quam.
        Pellentesque ornare sem lacinia quam venenatis vestibulum.
      </Popover>
    </div>
  ),
  argTypes: {
    placement: {
      control: {
        type: 'select',
      },
    },
  },
  args: {
    title: '',
    placement: 'right',
    spread: false,
  },
};
