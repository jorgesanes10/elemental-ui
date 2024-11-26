import type { Meta, StoryObj } from '@storybook/react';
import OverlayTrigger from './OverlayTrigger';
import { Button, IconButton, Panel, Popover } from '../../index.ts';
import { FC, useState } from 'react';

const meta: Meta<typeof OverlayTrigger> = {
  component: OverlayTrigger,
};

export default meta;
type Story = StoryObj<typeof OverlayTrigger>;

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
  padding: '30px',
};

export const Default: Story = {
  render: ({ delay, placement, triggerType }) => (
    <div style={styles}>
      <Panel>
        <Panel.Body>
          <OverlayTrigger
            delay={delay}
            overlay={
              <Popover>
                <h1 style={{ marginTop: 0 }}>This is a Popover</h1>
                <p>And it&apos;s acting as an overlay for the OverlayTrigger</p>
              </Popover>
            }
            placement={placement}
            triggerType={triggerType}
          >
            <Button shape="outline" color="info">
              Show overlay
            </Button>
          </OverlayTrigger>
        </Panel.Body>
      </Panel>
    </div>
  ),
  argTypes: {
    placement: {
      control: {
        type: 'select',
      },
    },
    triggerType: {
      control: {
        type: 'select',
      },
    },
    overlay: {
      table: {
        disable: true,
      },
    },
    defaultShow: {
      table: {
        disable: true,
      },
    },
    show: {
      table: {
        disable: true,
      },
    },
    hideOnOutsideClick: {
      table: {
        disable: true,
      },
    },
    onToggle: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    delay: 0,
    placement: 'right',
    triggerType: 'click',
  },
};

export const InCorners: Story = {
  render: ({ placement }) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
      }}
    >
      <Panel
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px',
        }}
      >
        <OverlayTrigger
          hideOnOutsideClick
          overlay={
            <Popover title="Top-left">
              <p>This is an overlay with its message</p>
            </Popover>
          }
          placement={placement}
        >
          <Button shape="outline" color="info">
            Show overlay
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          hideOnOutsideClick
          overlay={
            <Popover>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </Popover>
          }
          placement={placement}
        >
          <Button shape="outline" color="info">
            Show overlay
          </Button>
        </OverlayTrigger>
      </Panel>
      <Panel
        style={{
          padding: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          margin: 0,
        }}
      >
        <OverlayTrigger
          hideOnOutsideClick
          overlay={
            <Popover>
              This is an overlay with its message. Lorem ipsum dolor sit amet
              consectetur adipisicing elit.
            </Popover>
          }
          placement={placement}
        >
          <Button shape="outline" color="info">
            Show overlay
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          hideOnOutsideClick
          overlay={<Popover>This is an overlay with its message</Popover>}
          placement={placement}
        >
          <Button shape="outline" color="info">
            Show overlay
          </Button>
        </OverlayTrigger>
      </Panel>
    </div>
  ),
  argTypes: {
    placement: {
      control: {
        type: 'select',
      },
    },
    overlay: {
      table: {
        disable: true,
      },
    },
    triggerType: {
      table: {
        disable: true,
      },
    },
    delay: {
      table: {
        disable: true,
      },
    },
    defaultShow: {
      table: {
        disable: true,
      },
    },
    show: {
      table: {
        disable: true,
      },
    },
    hideOnOutsideClick: {
      table: {
        disable: true,
      },
    },
    onToggle: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
};

export const NotHideOnOutsideClick: Story = {
  render: () => (
    <div style={styles}>
      <OverlayTrigger
        hideOnOutsideClick={false}
        overlay={<Popover>Now click outside the trigger</Popover>}
      >
        <Button color="info">Click me!</Button>
      </OverlayTrigger>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const DefaultShow: Story = {
  render: () => (
    <div style={styles}>
      <OverlayTrigger
        defaultShow
        overlay={
          <Popover>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            hendrerit sodales vulputate.
          </Popover>
        }
      >
        <IconButton className="text-muted" icon="info_outline" />
      </OverlayTrigger>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

const ControlledStory: FC = () => {
  const [show, setShow] = useState(false);

  const handleToggle = (toggled: boolean) => {
    setShow(toggled);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleHide = () => {
    setShow(false);
  };

  return (
    <div style={{ ...styles, flexDirection: 'column' }}>
      <OverlayTrigger
        show={show}
        onToggle={handleToggle}
        hideOnOutsideClick={false}
        overlay={
          <Popover>
            This is some message
            <Button style={{ marginTop: '10px' }} onClick={handleHide}>
              Hide overlay
            </Button>
          </Popover>
        }
      >
        <Button color="info">Click me!</Button>
      </OverlayTrigger>
      <Button style={{ marginTop: '40px' }} onClick={handleShow}>
        Show overlay
      </Button>
      <Button style={{ marginTop: '10px', marginLeft: 0 }} onClick={handleHide}>
        Hide overlay
      </Button>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledStory />,
  parameters: {
    controls: {
      disable: true,
    },
  },
};
