import type { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonProps } from './Button.tsx';
import { CSSProperties } from 'react';
import { Icon, Panel } from '../../index.ts';

const meta: Meta<typeof Button> = {
  component: Button,
};

type StoryProps = {
  label?: string;
} & ButtonProps;

export default meta;
type Story = StoryObj<StoryProps>;

const styles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  padding: '20px',
};

export const Default: Story = {
  render: ({
    size,
    color,
    disabled,
    shape,
    loading,
    progress,
    keepStyles,
    label,
  }) => (
    <div style={styles}>
      <Button
        size={size}
        color={color}
        disabled={disabled}
        shape={shape}
        loading={loading}
        progress={progress}
        keepStyles={keepStyles}
      >
        {label}
      </Button>
    </div>
  ),
  argTypes: {
    shape: {
      control: {
        type: 'select',
      },
    },
    size: {
      control: {
        type: 'select',
      },
    },
    progress: {
      control: {
        type: 'range',
      },
    },
    keepStyles: {
      table: {
        disable: true,
      },
    },
    displayName: {
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
    label: 'Label',
    loading: false,
  },
};

export const Styles: Story = {
  render: () => (
    <div style={styles}>
      <Panel>
        <Panel.Body>
          <div className="btn-toolbar" style={{ marginBottom: '20px' }}>
            <Button style={{ margin: '5px' }}>Default</Button>
            <Button style={{ margin: '5px' }} color="danger">
              Danger
            </Button>
            <Button style={{ margin: '5px' }} color="warning">
              Warning
            </Button>
            <Button style={{ margin: '5px' }} color="info">
              Info
            </Button>
            <Button style={{ margin: '5px' }} color="success">
              Success
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '20px',
            }}
          >
            <Button style={{ margin: '5px' }}>
              <Icon name="print" aria-hidden="true" />
              <span>Print</span>
            </Button>
            <Button style={{ margin: '5px' }}>
              <span>Print</span>
              <Icon name="print" aria-hidden="true" />
            </Button>
            <Button aria-label="More options" style={{ margin: '5px' }}>
              <Icon name="more_horiz" aria-hidden="true" />
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button style={{ margin: '5px' }}>
              Default <span className="caret" />
            </Button>
            <Button color="info" shape="outline" style={{ margin: '5px' }}>
              Outline <span className="caret" />
            </Button>
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
