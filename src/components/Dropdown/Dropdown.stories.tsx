import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from './Dropdown';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  FloatingActionButton,
  Icon,
} from '../../index.ts';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
};

export const Default: Story = {
  render: ({ disabled, fromRight, toggleOnHover }) => (
    <div style={styles}>
      <Dropdown
        disabled={disabled}
        fromRight={fromRight}
        toggleOnHover={toggleOnHover}
      >
        <Button>
          Actions
          <span className="caret" />
        </Button>
        <DropdownMenu>
          <DropdownItem isHeader>Header</DropdownItem>
          <DropdownItem active>Action</DropdownItem>
          <DropdownItem>Other action</DropdownItem>
          <DropdownItem isSeparator />
          <DropdownItem isHeader>Other header</DropdownItem>
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
      </Dropdown>
    </div>
  ),
  argTypes: {
    onSelect: {
      table: {
        disable: true,
      },
    },
    onToggle: {
      table: {
        disable: true,
      },
    },
    tabIndex: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    disabled: false,
    fromRight: false,
    toggleOnHover: false,
  },
};

export const WithButtonsAsDropdownItems: Story = {
  render: ({ disabled, fromRight }) => (
    <div style={styles}>
      <Dropdown disabled={disabled} fromRight={fromRight}>
        <Button>
          Actions
          <span className="caret" />
        </Button>
        <Dropdown.Menu>
          <Dropdown.Item useButton>Action</Dropdown.Item>
          <Dropdown.Item useButton>Another action</Dropdown.Item>
          <Dropdown.Item isSeparator />
          <Dropdown.Item useButton color="danger">
            Dangerous action
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ),
  argTypes: {
    toggleOnHover: {
      table: {
        disable: true,
      },
    },
    onSelect: {
      table: {
        disable: true,
      },
    },
    onToggle: {
      table: {
        disable: true,
      },
    },
    tabIndex: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    disabled: false,
    fromRight: false,
  },
};

export const WithFloatingActionButtons: Story = {
  render: () => (
    <div style={styles}>
      <Dropdown>
        <FloatingActionButton icon="add" />
        <Dropdown.Menu
          style={{
            marginTop: '13px',
            transformOrigin: 'top center',
            left: '-52px',
          }}
        >
          <Dropdown.Item isHeader>Menu header</Dropdown.Item>
          <Dropdown.Item>Action 1</Dropdown.Item>
          <Dropdown.Item>Action 2</Dropdown.Item>
          <Dropdown.Item>Action 3</Dropdown.Item>
          <Dropdown.Item>Action 4</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};
