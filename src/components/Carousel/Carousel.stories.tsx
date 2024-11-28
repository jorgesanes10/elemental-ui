import { FC, Fragment, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Carousel, Button, Panel } from '../../index.ts';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const styles = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
};

export const Default: Story = {
  render: ({ slidingInterval, previousButtonProps, nextButtonProps }) => (
    <div style={styles}>
      <Carousel
        innerMargin={25}
        slidingInterval={slidingInterval}
        previousButtonProps={previousButtonProps}
        nextButtonProps={nextButtonProps}
      >
        <Panel style={{ width: '40vw' }} id="great">
          <Panel.Body>
            <h1>This thing is great</h1>
            <p>This is the review body, or the testimonial text.</p>
          </Panel.Body>
        </Panel>
        <Panel style={{ width: '40vw' }} id="best">
          <Panel.Body>
            <h1>The best thing I have ever seen</h1>
            <p>
              After searching for an easy and complete tool, this is the
              greatest one I have found. Totally recommend it.
            </p>
          </Panel.Body>
        </Panel>
        <Panel style={{ width: '40vw' }} id="not">
          <Panel.Body>
            <h1>Not so good</h1>
            <p>
              I do not know what this is but since I do not understand it, I do
              not like it.
            </p>
          </Panel.Body>
        </Panel>
        <Panel style={{ width: '40vw' }} id="rocks">
          <Panel.Body>
            <h1>Wow, this rocks!</h1>
            <p>Take a look at this review. This is the greatest thing ever!!</p>
          </Panel.Body>
        </Panel>
        <Panel style={{ width: '40vw' }} id="what">
          <Panel.Body>
            <h1>What are you talking about?</h1>
            <p>Hey, calm down. This is just a Carousel.</p>
          </Panel.Body>
        </Panel>
      </Carousel>
    </div>
  ),
  argTypes: {
    innerMargin: {
      table: {
        disable: true,
      },
    },
    noFadingSides: {
      table: {
        disable: true,
      },
    },
    onSlide: {
      table: {
        disable: true,
      },
    },
    theme: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    slidingInterval: 0,
    previousButtonProps: {},
    nextButtonProps: {},
  },
};

export const ModernTheme: Story = {
  render: () => (
    // <Container style={{ marginTop: '200px' }}>
    <div style={{ marginTop: '200px' }}>
      <Carousel theme="modern">
        <Panel>
          <figure>
            <img
              src="https://picsum.photos/id/1033/640/480"
              alt="img-station"
            />
          </figure>
          <Panel.Body>
            <h1>The best thing I have ever seen</h1>
            <p>
              After searching for an easy and complete tool, this is the
              greatest one I have found. Totally recommend it.
            </p>
          </Panel.Body>
        </Panel>
        <Panel>
          <figure>
            <img src="https://picsum.photos/id/1040/640/480" alt="img-castle" />
          </figure>
          <Panel.Body>
            <h1>Not so good</h1>
            <p>
              I do not know what this is but since I do not understand it, I do
              not like it.
            </p>
          </Panel.Body>
        </Panel>
        <Panel>
          <figure>
            <img src="https://picsum.photos/id/1067/640/480" alt="img-city" />
          </figure>
          <Panel.Body>
            <h1>Wow, this rocks!</h1>
            <p>Take a look at this review. This is the greatest thing ever!!</p>
          </Panel.Body>
        </Panel>
      </Carousel>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const StylesForMobile: Story = {
  render: () => (
    <div style={styles}>
      <Carousel innerMargin={10}>
        <Panel style={{ width: '70vw' }}>
          <Panel.Body>
            <h1>This thing is great</h1>
            <p>This is the review body, or the testimonial text.</p>
          </Panel.Body>
        </Panel>
        <Panel style={{ width: '70vw' }}>
          <Panel.Body>
            <h1>The best thing I have ever seen</h1>
            <p>
              After searching for an easy and complete tool, this is the
              greatest one I have found. Totally recommend it.
            </p>
          </Panel.Body>
        </Panel>
        <Panel style={{ width: '70vw' }}>
          <Panel.Body>
            <h1>Not so good</h1>
            <p>
              I do not know what this is but since I do not understand it, I do
              not like it.
            </p>
          </Panel.Body>
        </Panel>
        <Panel style={{ width: '70vw' }}>
          <Panel.Body>
            <h1>Wow, this rocks!</h1>
            <p>Take a look at this review. This is the greatest thing ever!!</p>
          </Panel.Body>
        </Panel>
        <Panel style={{ width: '70vw' }}>
          <Panel.Body>
            <h1>What are you talking about?</h1>
            <p>Hey, calm down. This is just a Carousel.</p>
          </Panel.Body>
        </Panel>
      </Carousel>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
    type: 'centered',
  },
};

export const WiderSlides: Story = {
  render: () => (
    <div style={styles}>
      <Carousel innerMargin={25}>
        <Panel style={{ width: '60vw' }}>
          <Panel.Body>
            <h1>This thing is great</h1>
            <p>This is the review body, or the testimonial text.</p>
          </Panel.Body>
        </Panel>
        <Panel style={{ width: '60vw' }}>
          <Panel.Body>
            <h1>The best thing I have ever seen</h1>
            <p>
              After searching for an easy and complete tool, this is the
              greatest one I have found. Totally recommend it.
            </p>
          </Panel.Body>
        </Panel>
        <Panel style={{ width: '60vw' }}>
          <Panel.Body>
            <h1>Not so good</h1>
            <p>
              I do not know what this is but since I do not understand it, I do
              not like it.
            </p>
          </Panel.Body>
        </Panel>
        <Panel style={{ width: '60vw' }}>
          <Panel.Body>
            <h1>Wow, this rocks!</h1>
            <p>Take a look at this review. This is the greatest thing ever!!</p>
          </Panel.Body>
        </Panel>
        <Panel style={{ width: '60vw' }}>
          <Panel.Body>
            <h1>What are you talking about?</h1>
            <p>Hey, calm down. This is just a Carousel.</p>
          </Panel.Body>
        </Panel>
      </Carousel>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const WithMaximumWidth: Story = {
  render: () => (
    <div style={styles}>
      <Carousel innerMargin={25} style={{ maxWidth: '1200px' }}>
        <Panel style={{ width: '40vw' }}>
          <Panel.Body>
            <h1>This thing is great</h1>
            <p>This is the review body, or the testimonial text.</p>
          </Panel.Body>
        </Panel>
        <Panel style={{ width: '40vw' }}>
          <Panel.Body>
            <h1>The best thing I have ever seen</h1>
            <p>
              After searching for an easy and complete tool, this is the
              greatest one I have found. Totally recommend it.
            </p>
          </Panel.Body>
        </Panel>
        <Panel style={{ width: '40vw' }}>
          <Panel.Body>
            <h1>Not so good</h1>
            <p>
              I do not know what this is but since I do not understand it, I do
              not like it.
            </p>
          </Panel.Body>
        </Panel>
        <Panel style={{ width: '40vw' }}>
          <Panel.Body>
            <h1>Wow, this rocks!</h1>
            <p>Take a look at this review. This is the greatest thing ever!!</p>
          </Panel.Body>
        </Panel>
        <Panel style={{ width: '40vw' }}>
          <Panel.Body>
            <h1>What are you talking about?</h1>
            <p>Hey, calm down. This is just a Carousel.</p>
          </Panel.Body>
        </Panel>
      </Carousel>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const SingleSlide: Story = {
  render: () => (
    <div style={styles}>
      <Carousel innerMargin={25} style={{ maxWidth: '1200px' }}>
        <Panel style={{ width: '40vw' }}>
          <Panel.Body>
            <h1>This thing is great</h1>
            <p>This is the review body, or the testimonial text.</p>
          </Panel.Body>
        </Panel>
      </Carousel>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

const DynamicCarousel: FC = () => {
  const [slides, setSlides] = useState([
    <Panel key="slide-0" style={{ width: '40vw' }} id="first">
      <Panel.Body>
        <h1>This is the first slide</h1>
      </Panel.Body>
    </Panel>,
    <Panel key="slide-1" style={{ width: '40vw' }} id="second">
      <Panel.Body>
        <h1>This is the second slide</h1>
      </Panel.Body>
    </Panel>,
    <Panel key="slide-2" style={{ width: '40vw' }} id="third">
      <Panel.Body>
        <h1>This is the third slide</h1>
      </Panel.Body>
    </Panel>,
  ]);

  const handleClick = () => {
    setSlides([
      <Panel key="slide-0" style={{ width: '40vw' }} id="first">
        <Panel.Body>
          <h1>This is the first slide</h1>
        </Panel.Body>
      </Panel>,
      <Panel key="slide-1" style={{ width: '40vw' }} id="second">
        <Panel.Body>
          <h1>This is the second slide</h1>
        </Panel.Body>
      </Panel>,
      <Panel key="slide-2" style={{ width: '40vw' }} id="third">
        <Panel.Body>
          <h1>This is the third slide</h1>
        </Panel.Body>
      </Panel>,
      <Panel key="slide-3" style={{ width: '40vw' }} id="fourth">
        <Panel.Body>
          <h1>This is the fourth slide</h1>
        </Panel.Body>
      </Panel>,
      <Panel key="slide-4" style={{ width: '40vw' }} id="fifth">
        <Panel.Body>
          <h1>This is the fifth slide</h1>
        </Panel.Body>
      </Panel>,
    ]);
  };

  return (
    <Fragment>
      <Carousel innerMargin={25}>{slides}</Carousel>
      <Button
        onClick={handleClick}
        style={{ display: 'block', margin: '30px auto 0' }}
      >
        Add more slides
      </Button>
    </Fragment>
  );
};

export const DynamicSlides: Story = {
  render: () => (
    <div style={{ display: 'block', marginTop: '40vh' }}>
      <DynamicCarousel />
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};
