import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon.tsx';

const meta: Meta<typeof Icon> = {
  component: Icon,
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  render: ({ name, iconStyle }) => <Icon name={name} iconStyle={iconStyle} />,
  argTypes: {
    displayName: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    name: 'face',
    iconStyle: 'filled',
  },
};

export const Sizes: Story = {
  render: () => (
    <div>
      <Icon name="face" style={{ fontSize: '280px' }} />
      <Icon name="face" style={{ fontSize: '168px' }} />
      <Icon name="face" style={{ fontSize: '98px' }} />
      <Icon name="face" style={{ fontSize: '56px' }} />
      <Icon name="face" style={{ fontSize: '28px' }} />
      <Icon name="face" style={{ fontSize: '14px' }} />
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ fontSize: '56px' }}>
      <Icon
        name="face"
        className="text-brand"
        style={{ fontSize: 'inherit' }}
      />
      <Icon
        name="face"
        className="text-danger"
        style={{ fontSize: 'inherit' }}
      />
      <Icon
        name="face"
        className="text-warning"
        style={{ fontSize: 'inherit' }}
      />
      <Icon
        name="face"
        className="text-success"
        style={{ fontSize: 'inherit' }}
      />
      <Icon name="face" className="text-info" style={{ fontSize: 'inherit' }} />
      <Icon
        name="face"
        className="text-muted"
        style={{ fontSize: 'inherit' }}
      />
      <Icon name="face" style={{ fontSize: 'inherit', color: '#f7df1e' }} />
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const Styles: Story = {
  render: () => (
    <div style={{ fontSize: '56px' }}>
      <Icon name="face" style={{ fontSize: '280px' }} />
      <Icon name="face" style={{ fontSize: '168px' }} />
      <Icon name="face" style={{ fontSize: '98px' }} />
      <Icon name="face" style={{ fontSize: '56px' }} />
      <Icon name="face" style={{ fontSize: '28px' }} />
      <Icon name="face" style={{ fontSize: '14px' }} />
      <Icon
        name="face"
        className="text-brand"
        style={{ fontSize: 'inherit' }}
      />
      <Icon
        name="face"
        className="text-danger"
        style={{ fontSize: 'inherit' }}
      />
      <Icon
        name="face"
        className="text-warning"
        style={{ fontSize: 'inherit' }}
      />
      <Icon
        name="face"
        className="text-success"
        style={{ fontSize: 'inherit' }}
      />
      <Icon name="face" className="text-info" style={{ fontSize: 'inherit' }} />
      <Icon
        name="face"
        className="text-muted"
        style={{ fontSize: 'inherit' }}
      />
      <Icon name="face" style={{ fontSize: 'inherit', color: '#f7df1e' }} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          gap: '10px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h3>filled</h3>
          <Icon
            name="announcement"
            iconStyle="filled"
            style={{ fontSize: 'inherit' }}
          />
        </div>
        <div>
          <h3>outline</h3>
          <Icon
            name="announcement"
            iconStyle="outlined"
            style={{ fontSize: 'inherit' }}
          />
        </div>
        <div>
          <h3>round</h3>
          <Icon
            name="announcement"
            iconStyle="round"
            style={{ fontSize: 'inherit' }}
          />
        </div>
        <div>
          <h3>sharp</h3>
          <Icon
            name="announcement"
            iconStyle="sharp"
            style={{ fontSize: 'inherit' }}
          />
        </div>
        <div>
          <h3>twoTone</h3>
          <Icon
            name="announcement"
            iconStyle="twoTone"
            style={{ fontSize: 'inherit' }}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};
