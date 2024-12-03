import type { Meta, StoryObj } from '@storybook/react';
import { FC, useState } from 'react';
import { Button, Col, Container, InfoPanel, Row } from '../../index.ts';

const meta: Meta<typeof InfoPanel> = {
  component: InfoPanel,
};

export default meta;
type Story = StoryObj<typeof InfoPanel>;

const primaryView = (
  <InfoPanel.PrimaryView>
    <Container>
      <Row>
        <Col sm={3}>
          <p>
            <strong>Summary</strong>
          </p>
          <p>This is the summary of the section and what it does</p>
        </Col>
        <Col sm={4}>
          <p>
            <strong>Field 1</strong>
          </p>
          <p style={{ marginBottom: '40px' }}>Value for Field 1</p>
          <p>
            <strong>Field 2</strong>
          </p>
          <p style={{ marginBottom: '40px' }}>Value for Field 2</p>
        </Col>
        <Col sm={5}>
          <p>
            <strong>Field 3</strong>
          </p>
          <p style={{ marginBottom: '40px' }}>Value for Field 3</p>
          <p>
            <strong>Field 4</strong>
          </p>
          <p style={{ marginBottom: '40px' }}>Value for Field 4</p>
          <p>
            <strong>Field 5</strong>
          </p>
          <p style={{ marginBottom: '40px' }}>Value for Field 5</p>
        </Col>
      </Row>
    </Container>
  </InfoPanel.PrimaryView>
);

export const Default: Story = {
  render: ({ buttonIcon, buttonProps }) => (
    <Container style={{ marginTop: '100px' }}>
      <InfoPanel buttonIcon={buttonIcon} buttonProps={buttonProps}>
        {primaryView}
        <InfoPanel.SecondaryView>
          <Container>
            <Row>
              <Col sm={3}>
                <p>
                  <strong>Summary</strong>
                </p>
                <p>This is the summary of the section and what it does</p>
              </Col>
              <Col sm={6}>
                {/*TODO: Uncomment when the TextField component is ready*/}
                <p>Text field here</p>
                <p>Text field here</p>
                {/*<TextField label="Field 1" defaultValue="Value for Field 1" />*/}
                {/*<TextField label="Field 2" defaultValue="Value for Field 2" />*/}
              </Col>
              <Col sm={3} />
            </Row>
          </Container>
        </InfoPanel.SecondaryView>
      </InfoPanel>
    </Container>
  ),
  argTypes: {
    color: {
      table: {
        disable: true,
      },
    },
    showPrimaryView: {
      table: {
        disable: true,
      },
    },
    toggleView: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    buttonIcon: 'edit',
    buttonProps: {},
  },
};

const ControlledInfoPanel: FC = () => {
  const [showPrimaryView, setShowPrimaryView] = useState(true);

  function handleClick() {
    setShowPrimaryView(true);
  }

  function toggleView(currentView: boolean) {
    setShowPrimaryView(!currentView);
  }

  return (
    <Container style={{ marginTop: '100px' }}>
      <InfoPanel showPrimaryView={showPrimaryView} toggleView={toggleView}>
        {primaryView}
        <InfoPanel.SecondaryView>
          <Container>
            <Row>
              <Col sm={3}>
                <p>
                  <strong>Summary</strong>
                </p>
                <p>This is the summary of the section and what it does</p>
              </Col>
              <Col sm={6}>
                {/*TODO: Uncomment when the TextField component is ready*/}
                <p>Text field here</p>
                <p>Text field here</p>
                {/*<TextField label="Field 1" defaultValue="Value for Field 1" />*/}
                {/*<TextField label="Field 2" defaultValue="Value for Field 2" />*/}
                <Button color="info" onClick={handleClick}>
                  Save
                </Button>
              </Col>
              <Col sm={3} />
            </Row>
          </Container>
        </InfoPanel.SecondaryView>
      </InfoPanel>
    </Container>
  );
};

export const Controlled: Story = {
  render: () => <ControlledInfoPanel />,
  parameters: {
    controls: {
      disable: true,
    },
  },
};
