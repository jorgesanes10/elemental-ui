import type { Meta, StoryObj } from '@storybook/react';
import { Col, Container, Row } from '../../index.ts';

type StoryProps = {
  narrow?: boolean;
  fluid?: boolean;
  center?: boolean;
};

const meta: Meta<StoryProps> = {
  title: 'Layout',
};

export default meta;
type Story = StoryObj<StoryProps>;

const squareStyles = {
  border: '2px solid #97D290',
  backgroundColor: '#EEFFEC',
  padding: '30px',
};

const paragraphStyles = {
  margin: '40px 0 20px 0',
};

export const Default: Story = {
  render: ({ narrow, fluid, center }) => (
    <Container narrow={narrow} fluid={fluid}>
      <p style={paragraphStyles}>
        For layout purposes you need to use the Container, Row and Col
        components. Refer to the docs for more information on how to use them.
      </p>
      <p style={paragraphStyles}>
        You can use Col components without specifying a width. They will occupy
        the available space.
      </p>
      <Row center={center}>
        <Col style={squareStyles}>No Col width specified</Col>
        <Col style={squareStyles}>No Col width specified</Col>
        <Col style={squareStyles}>No Col width specified</Col>
      </Row>
      <p style={paragraphStyles}>
        You can specify the width of certain components. The rest will occupy
        the remaining space.
      </p>
      <Row center={center}>
        <Col style={squareStyles}>No Col width specified</Col>
        <Col lg={6} md={6} sm={6} style={squareStyles}>
          Col 6
        </Col>
        <Col style={squareStyles}>No Col width specified</Col>
      </Row>
      <p style={paragraphStyles}>
        The Cols will wrap when there is no space to fit them horizontally.
      </p>
      <Row center={center}>
        <Col lg={12} md={12} sm={12} style={squareStyles}>
          Col 12
        </Col>
        <Col lg={6} md={6} sm={6} style={squareStyles}>
          Col 6
        </Col>
        <Col lg={6} md={6} sm={6} style={squareStyles}>
          Col 6
        </Col>
        <Col lg={4} md={4} sm={4} style={squareStyles}>
          Col 4
        </Col>
        <Col lg={4} md={4} sm={4} style={squareStyles}>
          Col 4
        </Col>
        <Col lg={4} md={4} sm={4} style={squareStyles}>
          Col 4
        </Col>
      </Row>
    </Container>
  ),
  argTypes: {
    narrow: {
      name: 'Container: narrow',
    },
    fluid: {
      name: 'Container: fluid',
    },
    center: {
      name: 'Row: center',
    },
  },
  args: {
    narrow: false,
    fluid: false,
    center: false,
  },
};
