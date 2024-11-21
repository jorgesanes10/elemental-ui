import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';
import { Panel } from '../../index.ts';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
};

export const Default: Story = {
  render: ({ size, title, ariaHidden }) => (
    <div style={styles}>
      <Panel>
        <Panel.Body>
          <Avatar size={size} title={title} ariaHidden={ariaHidden} />
        </Panel.Body>
      </Panel>
    </div>
  ),
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
    },
    ariaHidden: {
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
    title: 'User Name',
  },
};

export const Styles: Story = {
  render: () => (
    <div style={styles}>
      <Panel>
        <Panel.Body>
          <div style={{ display: 'flex' }}>
            <Avatar title="a" />
            <Avatar title="b" />
            <Avatar title="c" />
            <Avatar title="d" />
            <Avatar title="e" />
            <Avatar title="f" />
            <Avatar title="g" />
            <Avatar title="h" />
            <Avatar title="i" />
            <Avatar title="j" />
          </div>
          <div style={{ display: 'flex' }}>
            <Avatar size="sm" title="a" />
            <Avatar size="sm" title="b" />
            <Avatar size="sm" title="c" />
            <Avatar size="sm" title="d" />
            <Avatar size="sm" title="e" />
            <Avatar size="sm" title="f" />
            <Avatar size="sm" title="g" />
            <Avatar size="sm" title="h" />
            <Avatar size="sm" title="i" />
            <Avatar size="sm" title="j" />
          </div>
          <div style={{ display: 'flex' }}>
            <Avatar size="md" title="a" />
            <Avatar size="md" title="b" />
            <Avatar size="md" title="c" />
            <Avatar size="md" title="d" />
            <Avatar size="md" title="e" />
            <Avatar size="md" title="f" />
            <Avatar size="md" title="g" />
            <Avatar size="md" title="h" />
            <Avatar size="md" title="i" />
            <Avatar size="md" title="j" />
          </div>
          <div style={{ display: 'flex' }}>
            <Avatar size="lg" title="a" />
            <Avatar size="lg" title="b" />
            <Avatar size="lg" title="c" />
            <Avatar size="lg" title="d" />
            <Avatar size="lg" title="e" />
            <Avatar size="lg" title="f" />
            <Avatar size="lg" title="g" />
            <Avatar size="lg" title="h" />
            <Avatar size="lg" title="i" />
            <Avatar size="lg" title="j" />
          </div>
        </Panel.Body>
      </Panel>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};
