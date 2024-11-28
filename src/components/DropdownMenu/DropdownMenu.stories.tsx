import { HTMLProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu, DropdownItem, Icon } from '../../index.ts';

const meta: Meta<typeof DropdownMenu> = {
  component: DropdownMenu,
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

const Wrapper = (props: HTMLProps<HTMLDivElement>) => {
  return (
    <div style={{ padding: '30px', width: '50vw', height: '50vh' }}>
      <div style={{ position: 'relative' }}>{props.children}</div>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <Wrapper>
      <DropdownMenu show>
        <DropdownItem>Action</DropdownItem>
        <DropdownItem color="danger">Danger action</DropdownItem>
      </DropdownMenu>
    </Wrapper>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const DisabledAction: Story = {
  render: () => (
    <Wrapper>
      <DropdownMenu show>
        <DropdownItem>Action 1</DropdownItem>
        <DropdownItem>Action 2</DropdownItem>
        <DropdownItem tooltip="This is the reason for being disabled" disabled>
          Disabled action
        </DropdownItem>
      </DropdownMenu>
    </Wrapper>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const Separator: Story = {
  render: () => (
    <Wrapper>
      <DropdownMenu show>
        <DropdownItem>Action</DropdownItem>
        <DropdownItem>Other action</DropdownItem>
        <DropdownItem isSeparator />
        <DropdownItem>Some other action</DropdownItem>
      </DropdownMenu>
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
    <Wrapper>
      <DropdownMenu show>
        <DropdownItem>Default</DropdownItem>
        <DropdownItem color="success">Success</DropdownItem>
        <DropdownItem color="info">Info</DropdownItem>
        <DropdownItem color="warning">Warning</DropdownItem>
        <DropdownItem color="danger">Danger</DropdownItem>
      </DropdownMenu>
    </Wrapper>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <Wrapper>
      <DropdownMenu show className="eui-dropdown-menu-icons">
        <DropdownItem icon="file_upload">Bulk upload</DropdownItem>
        <DropdownItem>Show only my text</DropdownItem>
      </DropdownMenu>
    </Wrapper>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const WithIconsToTheRight: Story = {
  render: () => (
    <Wrapper>
      <DropdownMenu show>
        <DropdownItem>
          Bulk upload{' '}
          <Icon aria-hidden name="file_upload" className="pull-right" />
        </DropdownItem>
        <DropdownItem>Show only my text</DropdownItem>
      </DropdownMenu>
    </Wrapper>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const WithIconsAndColors: Story = {
  render: () => (
    <Wrapper>
      <DropdownMenu show className="eui-dropdown-menu-icons">
        <DropdownItem>Default</DropdownItem>
        <DropdownItem color="success" icon="favorite_border">
          Success
        </DropdownItem>
        <DropdownItem color="info" icon="fingerprint">
          Info
        </DropdownItem>
        <DropdownItem color="warning" icon="alarm">
          Warning
        </DropdownItem>
        <DropdownItem color="danger" icon="delete">
          Danger
        </DropdownItem>
      </DropdownMenu>
    </Wrapper>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const WithActiveAction: Story = {
  render: () => (
    <Wrapper>
      <DropdownMenu show>
        <DropdownItem>Action</DropdownItem>
        <DropdownItem active>Other action</DropdownItem>
        <DropdownItem isSeparator />
        <DropdownItem>Some other action</DropdownItem>
      </DropdownMenu>
    </Wrapper>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const WithHeaders: Story = {
  render: () => (
    <Wrapper>
      <DropdownMenu show>
        <DropdownItem isHeader>Header</DropdownItem>
        <DropdownItem>Action</DropdownItem>
        <DropdownItem>Other action</DropdownItem>
        <DropdownItem isSeparator />
        <DropdownItem isHeader>Another header</DropdownItem>
        <DropdownItem>Some other action</DropdownItem>
      </DropdownMenu>
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
    <Wrapper>
      <DropdownMenu show>
        <DropdownItem isHeader>Header</DropdownItem>
        <DropdownItem active>Action</DropdownItem>
        <DropdownItem>Other action</DropdownItem>
        <DropdownItem isSeparator />
        <DropdownItem isHeader>Another header</DropdownItem>
        <DropdownItem>Some other action</DropdownItem>
        <DropdownItem color="success" icon="favorite_border">
          Success
        </DropdownItem>
        <DropdownItem color="info" icon="fingerprint">
          Info
        </DropdownItem>
        <DropdownItem color="warning" icon="alarm">
          Warning
        </DropdownItem>
        <DropdownItem color="danger" icon="delete">
          Danger
        </DropdownItem>
        <DropdownItem icon="file_upload">Bulk upload</DropdownItem>
        <DropdownItem>
          Bulk upload{' '}
          <Icon aria-hidden name="file_upload" className="pull-right" />
        </DropdownItem>
        <DropdownItem tooltip="This is a tooltip" disabled>
          Disabled action
        </DropdownItem>
      </DropdownMenu>
    </Wrapper>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};
