import type { Meta, StoryObj } from '@storybook/react';
import { Panel } from '../../index.ts';

const meta: Meta<typeof Panel> = {
  component: Panel,
};

export default meta;
type Story = StoryObj<typeof Panel>;

const styles = {
  height: '100vh',
  width: '100vw',
  padding: '20px',
};

export const Default: Story = {
  render: () => (
    <div style={styles}>
      <Panel>
        <Panel.Body>
          <h1 style={{ marginTop: 0 }}>Panel</h1>
          <h2>These are the several text color classes in elemental-ui:</h2>
          <p className="text-darker">Text with the text-darker class</p>
          <p className="text-dark">Text with the text-dark class</p>
          <p className="text-color">Text with the text-color class</p>
          <p className="text-light">Text with the text-light class</p>
          <p className="text-lighter">Text with the text-lighter class</p>
          <p className="text-lightest">Text with the text-lightest class</p>
          <p className="text-off-white">Text with the text-off-white class</p>
          <p className="text-off-white-dark">
            Text with the text-off-white-dark class
          </p>
          <p className="text-off-white-darker">
            Text with the text-off-white-darker class
          </p>
          <p className="text-primary">Text with the text-primary class</p>
          <p className="text-brand">Text with the text-brand class</p>
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

function capitalizeWords(str: string) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const WithHeading: Story = {
  render: ({ color }) => (
    <div style={styles}>
      <Panel color={color}>
        <Panel.Heading>{capitalizeWords(color!)}</Panel.Heading>
        <Panel.Body>{capitalizeWords(color!)} panel body</Panel.Body>
      </Panel>
    </div>
  ),
  argTypes: {
    color: {
      control: {
        type: 'select',
      },
    },
  },
  args: {
    color: 'default',
  },
};
