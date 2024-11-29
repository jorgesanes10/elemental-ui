import type { Meta, StoryObj } from '@storybook/react';
import {
  FC,
  useEffect,
  useState,
  MouseEvent,
  forwardRef,
  KeyboardEvent,
} from 'react';
import {
  Avatar,
  Button,
  ExpansionPanelGroup,
  IconButton,
} from '../../index.ts';
import { ExpansionPanelGroupProps } from './ExpansionPanelGroup.tsx';

const meta: Meta<typeof ExpansionPanelGroup> = {
  component: ExpansionPanelGroup,
};

export default meta;
type Story = StoryObj<typeof ExpansionPanelGroup>;

function event(event: MouseEvent) {
  event.stopPropagation();
  event.preventDefault();
}

const styles = {
  padding: '20px',
  margin: '0 auto',
  height: '100vh',
  width: '100vw',
  maxWidth: '900px',
};

const UnifiedPanels: FC<ExpansionPanelGroupProps> = (props) => {
  const [mobileView, setMobileView] = useState(true);

  useEffect(() => {
    setView();

    window.addEventListener('resize', setView);

    return () => {
      window.removeEventListener('resize', setView);
    };
  }, []);

  const setView = () => {
    setMobileView(window.innerWidth <= 560);
  };

  const { isAccordion, arePanelsUnified } = props;

  const desktopButtons = (
    <>
      <IconButton onClick={event} icon="settings" ariaLabel="Settings" />
      <IconButton onClick={event} icon="delete" ariaLabel="Delete" />
      <IconButton onClick={event} icon="done" ariaLabel="Done" />
    </>
  );

  const buttonsToolbar = (
    <>
      {mobileView ? null : desktopButtons}
      <IconButton onClick={event} icon="more_vert" ariaLabel="More options" />
    </>
  );

  return (
    <div style={styles}>
      <ExpansionPanelGroup
        id="g1"
        isAccordion={isAccordion}
        arePanelsUnified={arePanelsUnified}
      >
        <ExpansionPanelGroup.Panel toggleAriaLabel="Brunch this weekend? Ali Connors">
          <ExpansionPanelGroup.Panel.Summary>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar size={mobileView ? 'sm' : 'lg'} title="JS" />
              <div
                style={{
                  marginLeft: '35px',
                  flexGrow: 1,
                }}
              >
                <h3 style={{ marginTop: 0, marginBottom: '3px' }}>
                  <strong>Brunch this weekend?</strong>
                </h3>
                <p style={{ margin: 0 }}>
                  Ali Connors{' '}
                  {mobileView ? null : (
                    <span className="text-muted">
                      I will be in your neighbourhood doing errands this weekend
                    </span>
                  )}
                </p>
              </div>
            </div>
          </ExpansionPanelGroup.Panel.Summary>
          <ExpansionPanelGroup.Panel.AlternativeSummary>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h1 style={{ margin: 0 }}>Brunch this weekend?</h1>
              <div
                className="btn-toolbar"
                style={{ marginTop: '5px', marginRight: '20px' }}
              >
                {buttonsToolbar}
              </div>
            </div>
          </ExpansionPanelGroup.Panel.AlternativeSummary>
          <ExpansionPanelGroup.Panel.Content>
            <Avatar size="lg" title="JS" style={{ marginTop: '20px' }} />
            <h2>This is the panel content</h2>
          </ExpansionPanelGroup.Panel.Content>
        </ExpansionPanelGroup.Panel>
        <ExpansionPanelGroup.Panel toggleAriaLabel="Summer BBQ, To Alex, Scott, Jennifer">
          <ExpansionPanelGroup.Panel.Summary>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar size={mobileView ? 'sm' : 'lg'} title="AB" />
              <div
                style={{
                  marginLeft: '35px',
                  flexGrow: 1,
                }}
              >
                <h3 style={{ marginTop: 0, marginBottom: '3px' }}>
                  <strong>Summer BBQ</strong>
                </h3>
                <p style={{ margin: 0 }}>
                  To Alex, Scott, Jennifer{' '}
                  {mobileView ? null : (
                    <span className="text-muted">
                      Wish I could come, but I am out of town this weekend.
                    </span>
                  )}
                </p>
              </div>
            </div>
          </ExpansionPanelGroup.Panel.Summary>
          <ExpansionPanelGroup.Panel.AlternativeSummary>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h1 style={{ margin: 0 }}>Summer BBQ</h1>
              <div
                className="btn-toolbar"
                style={{ marginTop: '5px', marginRight: '20px' }}
              >
                {buttonsToolbar}
              </div>
            </div>
          </ExpansionPanelGroup.Panel.AlternativeSummary>
          <ExpansionPanelGroup.Panel.Content>
            <Avatar size="lg" title="AB" style={{ marginTop: '20px' }} />
            <h2>This is the panel content</h2>
          </ExpansionPanelGroup.Panel.Content>
        </ExpansionPanelGroup.Panel>
        <ExpansionPanelGroup.Panel toggleAriaLabel="Oui Oui, Ali Connors">
          <ExpansionPanelGroup.Panel.Summary>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar size={mobileView ? 'sm' : 'lg'} title="YZ" />
              <div
                style={{
                  marginLeft: '35px',
                  flexGrow: 1,
                }}
              >
                <h3 style={{ marginTop: 0, marginBottom: '3px' }}>
                  <strong>Oui Oui</strong>
                </h3>
                <p style={{ margin: 0 }}>
                  Ali Connors{' '}
                  {mobileView ? null : (
                    <span className="text-muted">
                      I will be in your neighbourhood
                    </span>
                  )}
                </p>
              </div>
            </div>
          </ExpansionPanelGroup.Panel.Summary>
          <ExpansionPanelGroup.Panel.AlternativeSummary>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h1 style={{ margin: 0 }}>Oui Oui</h1>
              <div
                className="btn-toolbar"
                style={{ marginTop: '5px', marginRight: '20px' }}
              >
                {buttonsToolbar}
              </div>
            </div>
          </ExpansionPanelGroup.Panel.AlternativeSummary>
          <ExpansionPanelGroup.Panel.Content>
            <Avatar size="lg" title="YZ" style={{ marginTop: '20px' }} />
            <h2>This is the panel content</h2>
          </ExpansionPanelGroup.Panel.Content>
        </ExpansionPanelGroup.Panel>
      </ExpansionPanelGroup>
    </div>
  );
};

export const Default: Story = {
  render: ({ isAccordion, arePanelsUnified }) => (
    <UnifiedPanels
      isAccordion={isAccordion}
      arePanelsUnified={arePanelsUnified}
    />
  ),
  argTypes: {
    onPanelToggle: {
      table: {
        disable: true,
      },
    },
    initialZIndex: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    isAccordion: false,
    arePanelsUnified: false,
  },
};

const ComponentWithRef = forwardRef<HTMLButtonElement>((props, ref) => (
  <ExpansionPanelGroup.Panel {...props} ref={ref}>
    <ExpansionPanelGroup.Panel.Summary>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '3fr 1fr',
          marginRight: '30px',
        }}
      >
        <p style={{ margin: 0 }}>Status report summary total prior to upload</p>
        <p style={{ margin: 0, marginLeft: '20px' }}>
          <span className="text-muted">Employees: </span>12
        </p>
      </div>
    </ExpansionPanelGroup.Panel.Summary>
    <ExpansionPanelGroup.Panel.Content>
      <h1>This is a heading</h1>
      <p>This is a paragraph</p>
      <Button color="info">Don‘t click me!!</Button>
    </ExpansionPanelGroup.Panel.Content>
  </ExpansionPanelGroup.Panel>
));

ComponentWithRef.displayName = 'ComponentWithRef';

export const WithWrapperComponentsUsingForwardRef: Story = {
  render: () => (
    <div style={styles}>
      <ExpansionPanelGroup isAccordion id="g1">
        <ComponentWithRef />
        <ComponentWithRef />
        <ComponentWithRef />
      </ExpansionPanelGroup>
    </div>
  ),
};

const Controlled: FC = () => {
  const [panels, setPanels] = useState<{ id: number; text: string }[]>([]);
  const [idExpanded, setIdExpanded] = useState<string | null>(null);

  useEffect(() => {
    const initialData = [
      {
        id: 1,
        text: 'Foo',
      },
      {
        id: 2,
        text: 'Bar',
      },
      {
        id: 3,
        text: 'Tar',
      },
    ];

    setPanels(initialData);
  }, []);

  function handleToggle(
    _: KeyboardEvent | MouseEvent,
    __?: string,
    customId?: string,
  ) {
    setIdExpanded(customId!);
  }

  function collapseAll() {
    setIdExpanded(null);
  }

  function renderChildren() {
    return panels.map(({ id, text }) => {
      return (
        <ExpansionPanelGroup.Panel
          customId={`panel-${id}`}
          key={id}
          onToggle={handleToggle}
          expanded={idExpanded === `panel-${id}`}
        >
          <ExpansionPanelGroup.Panel.Summary>
            <p>I am {text}</p>
          </ExpansionPanelGroup.Panel.Summary>
          <ExpansionPanelGroup.Panel.Content>
            <p>I am the content of {text}</p>
          </ExpansionPanelGroup.Panel.Content>
        </ExpansionPanelGroup.Panel>
      );
    });
  }

  return (
    <>
      <ExpansionPanelGroup id="first-panel">
        {renderChildren()}
      </ExpansionPanelGroup>
      <Button style={{ marginTop: '40px' }} onClick={collapseAll}>
        Collapse all
      </Button>
    </>
  );
};

export const ControlledChildren: Story = {
  render: () => (
    <div style={styles}>
      <Controlled />
    </div>
  ),
};
