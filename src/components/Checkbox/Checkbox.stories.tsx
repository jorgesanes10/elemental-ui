import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox.tsx';
import React, { CSSProperties, FC, useEffect, useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const styles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
};

function doNothing() {}

export const Default: Story = {
  render: ({ disabled, checked, label }) => (
    <div style={styles}>
      <Checkbox
        disabled={disabled}
        checked={checked}
        label={label}
        onChange={doNothing}
      />
    </div>
  ),
  argTypes: {
    defaultChecked: {
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
    disabled: false,
    checked: false,
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <div style={styles}>
      <Checkbox defaultChecked label="Label" />
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

const ControlledStory: FC = () => {
  const [disabled, setDisabled] = useState(true);
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    setDisabled(!checked);
  }, []);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setDisabled(!event.target.checked);
  };

  return (
    <div style={styles}>
      <Checkbox
        label="Controls enabled"
        checked={checked}
        onChange={handleOnChange}
      />
      <hr />
      <Checkbox label="Fender" id="fender" disabled={disabled} />
      <Checkbox label="Gibson" id="gibson" disabled={disabled} />
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledStory />,
};
