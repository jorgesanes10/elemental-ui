import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon.tsx';
import { Wrapper } from '../../../.storybook/components/Wrapper.tsx';
import { CSSProperties } from 'react';

const meta: Meta<typeof Icon> = {
  component: Icon,
};

export default meta;
type Story = StoryObj<typeof Icon>;

const styles: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  flexWrap: 'wrap',
};

export const Default: Story = {
  render: ({ name, iconStyle }) => (
    <Wrapper style={styles}>
      <Icon name={name} iconStyle={iconStyle} />
    </Wrapper>
  ),
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
    <Wrapper style={styles}>
      <Icon name="face" style={{ fontSize: '280px' }} />
      <Icon name="face" style={{ fontSize: '168px' }} />
      <Icon name="face" style={{ fontSize: '98px' }} />
      <Icon name="face" style={{ fontSize: '56px' }} />
      <Icon name="face" style={{ fontSize: '28px' }} />
      <Icon name="face" style={{ fontSize: '14px' }} />
    </Wrapper>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const Colors: Story = {
  render: () => (
    <Wrapper style={{ ...styles, fontSize: '56px' }}>
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
    </Wrapper>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const Styles: Story = {
  render: () => (
    <Wrapper style={{ ...styles, fontSize: '56px' }}>
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
    </Wrapper>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};
