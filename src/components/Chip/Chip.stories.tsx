import type { Meta, StoryObj } from '@storybook/react';
import photoAvatar from '../../../.storybook/assets/photo-avatar.png';
import { Avatar, Chip, Icon } from '../../index.ts';
import { ChipProps } from './Chip.tsx';

const meta: Meta<typeof Chip> = {
  component: Chip,
};

type StoryProps = {
  passOnDismiss?: boolean;
} & ChipProps;

export default meta;
type Story = StoryObj<StoryProps>;

const styles = {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function doNothing() {}

export const Default: Story = {
  render: ({ disabled, size, passOnDismiss }) => (
    <div style={styles}>
      <Chip
        ariaLabel="Hello"
        onDismiss={passOnDismiss ? doNothing : undefined}
        disabled={disabled}
        size={size}
      >
        <span>Hello</span>
      </Chip>
    </div>
  ),
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
    },
    ariaLabel: {
      table: {
        disable: true,
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
    onDismiss: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    disabled: false,
    size: '',
    passOnDismiss: false,
  },
};

export const WithAvatar: Story = {
  render: () => (
    <div style={styles}>
      <Chip
        onDismiss={doNothing}
        style={{ marginRight: '20px' }}
        ariaLabel="Jorge Sanes"
      >
        <Avatar title="JS" />
        Jorge Sanes
      </Chip>
      <Chip
        onDismiss={doNothing}
        size="lg"
        ariaLabel="John Doe"
        style={{ marginRight: '20px' }}
      >
        <Avatar title="JD" />
        John Doe
      </Chip>
      <Chip ariaLabel="Jorge Sanes" style={{ marginRight: '20px' }}>
        <Avatar title="JS" />
        Jorge Sanes
      </Chip>
      <Chip size="lg" ariaLabel="John Doe">
        <Avatar title="JD" />
        John Doe
      </Chip>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const WithIcon: Story = {
  render: () => (
    <div style={styles}>
      <Chip
        onDismiss={doNothing}
        style={{ marginRight: '20px' }}
        ariaLabel="Manager"
      >
        <Icon name="face" />
        Manager
      </Chip>
      <Chip
        onDismiss={doNothing}
        size="lg"
        ariaLabel="Administrator"
        style={{ marginRight: '20px' }}
      >
        <Icon name="face" />
        Administrator
      </Chip>
      <Chip style={{ marginRight: '20px' }} ariaLabel="Manager">
        <Icon name="face" />
        Manager
      </Chip>
      <Chip size="lg" ariaLabel="Administrator">
        <Icon name="face" />
        Administrator
      </Chip>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const WithImage: Story = {
  render: () => (
    <div style={styles}>
      <Chip
        onDismiss={doNothing}
        style={{ marginRight: '20px' }}
        ariaLabel="Manager"
      >
        <img src={photoAvatar} alt="logo" />
        Manager
      </Chip>
      <Chip
        onDismiss={doNothing}
        size="lg"
        ariaLabel="Administrator"
        style={{ marginRight: '20px' }}
      >
        <img src={photoAvatar} alt="logo" />
        Administrator
      </Chip>
      <Chip style={{ marginRight: '20px' }} ariaLabel="Manager">
        <img src={photoAvatar} alt="logo" />
        Manager
      </Chip>
      <Chip size="lg" ariaLabel="Administrator">
        <img src={photoAvatar} alt="logo" />
        Administrator
      </Chip>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};
