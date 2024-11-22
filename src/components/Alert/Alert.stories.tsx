import type { Meta, StoryObj } from '@storybook/react';
import Alert, { AlertProps } from './Alert.tsx';
import { Button, Panel } from '../../index.ts';
import { Wrapper } from '../../../.storybook/components/Wrapper.tsx';

const meta: Meta<typeof Alert> = {
  component: Alert,
};

type StoryProps = {
  passOnDismiss: boolean;
} & AlertProps;

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
  render: ({ color, passOnDismiss }: StoryProps) => (
    <Wrapper>
      <Panel>
        <Panel.Body>
          <Alert color={color} onDismiss={passOnDismiss ? () => {} : undefined}>
            This is an alert
          </Alert>
        </Panel.Body>
      </Panel>
    </Wrapper>
  ),
  argTypes: {
    onDismiss: {
      table: {
        disable: true,
      },
    },
    passOnDismiss: {
      control: 'boolean',
    },
    color: {
      control: {
        type: 'select',
      },
    },
  },
  args: {
    passOnDismiss: false,
  },
};

export const Multiline: Story = {
  render: () => (
    <Wrapper>
      <Panel>
        <Panel.Body>
          <Alert>
            <div>
              <div>
                <p className="eui-alert-title">Title</p>
                <p className="eui-alert-description">This is an info message</p>
              </div>
            </div>
          </Alert>
          <Alert color="success">
            <div>
              <div>
                <p className="eui-alert-title">Title</p>
                <p className="eui-alert-description">
                  This is a success message
                </p>
              </div>
            </div>
          </Alert>
          <Alert color="danger">
            <div>
              <div>
                <p className="eui-alert-title">Title</p>
                <p className="eui-alert-description">
                  This is a danger message
                </p>
              </div>
            </div>
          </Alert>
          <Alert color="warning">
            <div>
              <div>
                <p className="eui-alert-title">Title</p>
                <p className="eui-alert-description">
                  This is a warning message
                </p>
              </div>
            </div>
          </Alert>
          <Alert color="inactive">
            <div>
              <div>
                <p className="eui-alert-title">Title</p>
                <p className="eui-alert-description">
                  This is an inactive message
                </p>
              </div>
            </div>
          </Alert>
        </Panel.Body>
      </Panel>
    </Wrapper>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const CustomActions: Story = {
  render: () => (
    <Wrapper>
      <Panel>
        <Panel.Body>
          <Alert>
            <div>This is an info message</div>
            <div className="btn-toolbar">
              <Button color="info">Some action</Button>
            </div>
          </Alert>
          <Alert color="success">
            <div>This is a success message</div>
            <Button color="success">Some action</Button>
          </Alert>
          <Alert color="danger">
            <div>This is a danger message</div>
            <Button color="danger">Some action</Button>
          </Alert>
          <Alert color="warning">
            <div>This is a warning message</div>
            <div className="btn-toolbar">
              <Button color="warning">Some action</Button>
            </div>
          </Alert>
          <Alert color="inactive">
            <div>This is an inactive message</div>
            <div className="btn-toolbar">
              <Button>Some action</Button>
            </div>
          </Alert>
        </Panel.Body>
      </Panel>
    </Wrapper>
  ),
};
