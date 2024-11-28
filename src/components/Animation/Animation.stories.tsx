import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Animation, Button, Panel } from '../../index.ts';

const meta: Meta<typeof Animation> = {
  component: Animation,
};

export default meta;
type Story = StoryObj<typeof Animation>;

export const Default: Story = {
  render: ({ effect, timeout }) => {
    const [unmount, setUnmount] = useState(false);
    const [remove, setRemove] = useState(false);

    function toggleVisibility() {
      setUnmount(!unmount);

      if (!unmount) {
        setTimeout(() => {
          setRemove(true);
        }, timeout);
      } else {
        setRemove(false);
      }
    }

    return (
      <Panel
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px',
          width: '50%',
          margin: '20px',
        }}
      >
        <Panel.Body>
          {!remove ? (
            <Animation effect={effect} unmount={unmount} timeout={timeout}>
              {/*<Chip>Hello</Chip>*/}
              <p>Hello</p>
            </Animation>
          ) : null}
          <Button
            onClick={toggleVisibility}
            color="info"
            style={{ marginTop: '40px' }}
          >{`${!unmount ? 'Remove from' : 'Add to'} DOM`}</Button>
        </Panel.Body>
      </Panel>
    );
  },
  argTypes: {
    unmount: {
      table: {
        disable: true,
      },
    },
    effect: {
      control: {
        type: 'select',
      },
    },
  },
  args: {
    timeout: 300,
  },
};
