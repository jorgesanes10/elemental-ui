import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '../../index.ts';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
};

export default meta;
type Story = StoryObj<typeof IconButton>;

const styles = {
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  width: '100vw',
  height: '50vh',
  padding: '0 38vw',
};

export const Default: Story = {
  render: ({ icon, title, disabled, color, ariaLabel }) => (
    <div style={styles}>
      <IconButton
        ariaLabel={ariaLabel}
        icon={icon}
        title={title}
        disabled={disabled}
        color={color}
      />
    </div>
  ),
  argTypes: {
    displayName: {
      table: {
        disable: true,
      },
    },
    color: {
      control: {
        type: 'select',
      },
    },
  },
  args: {
    icon: 'delete',
    title: 'delete',
    ariaLabel: 'Delete',
  },
};

export const Colors: Story = {
  render: () => (
    <div>
      <div style={styles}>
        <IconButton
          color="default"
          ariaLabel="Default"
          icon="info_outline"
          title="This is a tooltip text with default color"
        />
        <IconButton
          color="warning"
          ariaLabel="Info"
          icon="info_outline"
          title="This is a tooltip text with warning color"
        />
        <IconButton
          color="success"
          ariaLabel="Info"
          icon="info_outline"
          title="This is a tooltip text with success color"
        />
        <IconButton
          color="info"
          ariaLabel="Info"
          icon="info_outline"
          title="This is a tooltip text with info color"
        />
        <IconButton
          color="danger"
          ariaLabel="Info"
          icon="info_outline"
          title="This is a tooltip text with danger color"
        />
        <IconButton
          color="brand"
          ariaLabel="Info"
          icon="info_outline"
          title="This is a tooltip text with brand color"
        />
      </div>
      <div style={styles}>
        <IconButton
          disabled
          color="default"
          ariaLabel="Default"
          icon="info_outline"
          title="This is a tooltip text with default color"
        />
        <IconButton
          disabled
          color="warning"
          ariaLabel="Info"
          icon="info_outline"
          title="This is a tooltip text with warning color"
        />
        <IconButton
          disabled
          color="success"
          ariaLabel="Info"
          icon="info_outline"
          title="This is a tooltip text with success color"
        />
        <IconButton
          disabled
          color="info"
          ariaLabel="Info"
          icon="info_outline"
          title="This is a tooltip text with info color"
        />{' '}
        <IconButton
          disabled
          color="danger"
          ariaLabel="Info"
          icon="info_outline"
          title="This is a tooltip text with danger color"
        />
        <IconButton
          disabled
          color="brand"
          ariaLabel="Info"
          icon="info_outline"
          title="This is a tooltip text with brand color"
        />
      </div>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};
