import type { Meta, StoryObj } from '@storybook/react';
import { FC, useState } from 'react';
import { Avatar, Button, Modal } from '../../index.ts';
import { ModalProps } from './Modal.tsx';
import { ModalHeaderProps } from './ModalHeader.tsx';

const meta: Meta<typeof Modal> = {
  component: Modal,
};

type StoryProps = ModalHeaderProps & ModalProps;

export default meta;
type Story = StoryObj<StoryProps>;

const styles = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
};

const DefaultModal: FC<StoryProps> = (props) => {
  const [show, setShow] = useState(true);

  const open = () => {
    setShow(true);
  };

  const close = () => {
    setShow(false);
  };

  const {
    centered,
    closeButton,
    closeButtonProps,
    hideOnOutsideClick,
    size,
    isLeftDrawer,
    isRightDrawer,
  } = props;

  return (
    <div style={styles}>
      <Button onClick={open}>Show Modal</Button>
      <Modal
        centered={centered}
        hideOnOutsideClick={hideOnOutsideClick}
        onHide={close}
        show={show}
        size={size}
        isLeftDrawer={isLeftDrawer}
        isRightDrawer={isRightDrawer}
      >
        <Modal.Header
          closeButton={closeButton}
          closeButtonProps={closeButtonProps}
        >
          <Modal.Title>Edit profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar style={{ marginRight: '20px' }} title="JS" size="lg" />
            <Button>Change avatar</Button>
          </div>
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <p>text field here</p>
            <p>text field here</p>
            {/*TODO: Uncomment when the TextField is ready */}
            {/*<TextField style={{ width: '48%' }} label="First name" id="firstName" defaultValue="Adele" />*/}
            {/*<TextField style={{ width: '48%', marginTop: 0 }} label="Middle name" id="middleName" />*/}
          </div>
          <div>
            <p>text field here</p>
            <p>text field here</p>
            {/*TODO: Uncomment when the TextField is ready */}
            {/*<TextField*/}
            {/*  label="Last name"*/}
            {/*  id="lastName"*/}
            {/*  defaultValue="Adams"*/}
            {/*  style={{ marginTop: '10px' }}*/}
            {/*/>*/}
            {/*<TextField*/}
            {/*  className="error"*/}
            {/*  label="Email"*/}
            {/*  id="email"*/}
            {/*  value="something"*/}
            {/*  errorMessage="Oops! Please enter a valid email address"*/}
            {/*  style={{ marginBottom: 0 }}*/}
            {/*  readOnly*/}
            {/*/>*/}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <p>text field here</p>
              <p>text field here</p>
              {/*TODO: Uncomment when the components are ready */}
              {/*<SingleSelect*/}
              {/*  helpText="This is some help text"*/}
              {/*  id="foo-select"*/}
              {/*  style={{ width: '48%' }}*/}
              {/*>*/}
              {/*  <option value="foo">Foo</option>*/}
              {/*  <option value="bar">Bar</option>*/}
              {/*</SingleSelect>*/}
              {/*<DatePicker*/}
              {/*  helpText="This is some help text"*/}
              {/*  label="Initial day"*/}
              {/*  style={{ width: '48%' }}*/}
              {/*/>*/}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close} shape="flat" color="info">
            Cancel
          </Button>
          <Button color="info">Update profile</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const Default: Story = {
  render: ({
    centered,
    closeButton,
    hideOnOutsideClick,
    size,
    isLeftDrawer,
    isRightDrawer,
    closeButtonProps,
  }) => (
    <DefaultModal
      centered={centered}
      closeButton={closeButton}
      closeButtonProps={closeButtonProps}
      hideOnOutsideClick={hideOnOutsideClick}
      size={size}
      isLeftDrawer={isLeftDrawer}
      isRightDrawer={isRightDrawer}
    />
  ),
  argTypes: {
    closeButtonProps: {
      table: {
        disable: true,
      },
    },
    closeButton: {
      name: 'closeButton (for ModalHeader)',
    },
  },
  args: {
    centered: false,
    closeButton: false,
    closeButtonProps: {},
    hideOnOutsideClick: false,
    size: 'md',
    isLeftDrawer: false,
    isRightDrawer: false,
  },
};
