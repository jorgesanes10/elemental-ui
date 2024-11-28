import type { Meta, StoryObj } from '@storybook/react';
import { FC, useState } from 'react';
import { Collapsible, Button, Panel } from '../../index.ts';

const meta: Meta<typeof Collapsible> = {
  component: Collapsible,
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: ({ expanded }) => (
    <div style={{ padding: '20px' }}>
      <Collapsible expanded={expanded}>
        <Panel>
          <Panel.Body>
            <h1>This is a panel</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              repudiandae, cum voluptatem vero fugit esse nulla dolor! Quis
              voluptate rerum ipsum fugiat a? Quas, deleniti voluptate?
              Voluptatum facilis aperiam maiores? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Error ipsam obcaecati natus corporis
              vel ducimus possimus eligendi at rerum magnam! Optio officia alias
              laborum autem. Architecto neque minima sed eos?
            </p>
          </Panel.Body>
        </Panel>
      </Collapsible>
    </div>
  ),
  args: {
    expanded: false,
  },
};

const ControlledCollapsible: FC = () => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div>
      <Button onClick={handleClick}>Toggle expanded</Button>
      <Collapsible expanded={expanded}>
        <Panel>
          <Panel.Body>
            <h1>This is a panel</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              repudiandae, cum voluptatem vero fugit esse nulla dolor! Quis
              voluptate rerum ipsum fugiat a? Quas, deleniti voluptate?
              Voluptatum facilis aperiam maiores? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Error ipsam obcaecati natus corporis
              vel ducimus possimus eligendi at rerum magnam! Optio officia alias
              laborum autem. Architecto neque minima sed eos?
            </p>
          </Panel.Body>
        </Panel>
      </Collapsible>
    </div>
  );
};

export const Controlled: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <ControlledCollapsible />
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};
