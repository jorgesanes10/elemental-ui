import type { Meta, StoryObj } from '@storybook/react';
import { FC, useEffect, useState } from 'react';
import { ExpansionPanel, Button, Panel } from '../../index.ts';

const meta: Meta<typeof ExpansionPanel> = {
  component: ExpansionPanel,
};

export default meta;
type Story = StoryObj<typeof ExpansionPanel>;

const styles = {
  padding: '60px',
  height: '100vh',
  width: '100vw',
};

export const Defaut: Story = {
  render: ({
    eventKey,
    customId,
    noCaret,
    growHorizontally,
    defaultExpanded,
    hideToggleOnExpanded,
    buttonProps,
  }) => (
    <div style={styles}>
      <ExpansionPanel
        eventKey={eventKey}
        customId={customId}
        noCaret={noCaret}
        growHorizontally={growHorizontally}
        defaultExpanded={defaultExpanded}
        hideToggleOnExpanded={hideToggleOnExpanded}
        buttonProps={buttonProps}
      >
        <ExpansionPanel.Summary>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '3fr 1fr',
              marginRight: '30px',
            }}
          >
            <p style={{ margin: 0 }}>Workgroup description code not found</p>
            <p style={{ margin: 0, marginLeft: '20px' }}>
              <span className="text-muted">Employees: </span>12
            </p>
          </div>
        </ExpansionPanel.Summary>
        <ExpansionPanel.Content>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h1 style={{ margin: 0 }}>This is a heading</h1>
            <p style={{ margin: 0 }}>This is a paragraph</p>
            <Button>Button</Button>
          </div>
        </ExpansionPanel.Content>
      </ExpansionPanel>
    </div>
  ),
  argTypes: {
    color: {
      table: {
        disable: true,
      },
    },
    expanded: {
      table: {
        disable: true,
      },
    },
    onToggle: {
      table: {
        disable: true,
      },
    },
    toggleAriaLabel: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    eventKey: '',
    customId: '',
    noCaret: false,
    defaultExpanded: false,
    growHorizontally: true,
    buttonProps: {},
    hideToggleOnExpanded: false,
  },
};

//TODO: Uncomment when TextField and InfoPanel are created
// export const WithInfoPanel: Story = {
//   render: () => (
//     <Container style={{ marginTop: '40px' }}>
//       <ExpansionPanel hideToggleOnExpanded growHorizontally={false}>
//         <ExpansionPanel.Summary>
//           <div
//             style={{
//               display: 'grid',
//               gridTemplateColumns: '3fr 1fr',
//               marginRight: '30px',
//             }}
//           >
//             <p style={{ margin: 0 }}>Workgroup description code not found</p>
//             <p style={{ margin: 0, marginLeft: '20px' }}>
//               <span className="text-muted">Employees: </span>12
//             </p>
//           </div>
//         </ExpansionPanel.Summary>
//         <ExpansionPanel.Content>
//           <InfoPanel>
//             <InfoPanel.PrimaryView>
//               <Container>
//                 <Row>
//                   <Col sm={3}>
//                     <p>
//                       <strong>Summary</strong>
//                     </p>
//                     <p>This is the summary of the section and what it does</p>
//                   </Col>
//                   <Col sm={4}>
//                     <p>
//                       <strong>Field 1</strong>
//                     </p>
//                     <p style={{ marginBottom: '40px' }}>Value for Field 1</p>
//                     <p>
//                       <strong>Field 2</strong>
//                     </p>
//                     <p style={{ marginBottom: '40px' }}>Value for Field 2</p>
//                   </Col>
//                   <Col sm={5}>
//                     <p>
//                       <strong>Field 3</strong>
//                     </p>
//                     <p style={{ marginBottom: '40px' }}>Value for Field 3</p>
//                     <p>
//                       <strong>Field 4</strong>
//                     </p>
//                     <p style={{ marginBottom: '40px' }}>Value for Field 4</p>
//                     <p>
//                       <strong>Field 5</strong>
//                     </p>
//                     <p style={{ marginBottom: '40px' }}>Value for Field 5</p>
//                   </Col>
//                 </Row>
//               </Container>
//             </InfoPanel.PrimaryView>
//             <InfoPanel.SecondaryView>
//               <Container>
//                 <Row>
//                   <Col sm={3}>
//                     <p>
//                       <strong>Summary</strong>
//                     </p>
//                     <p>This is the summary of the section and what it does</p>
//                   </Col>
//                   <Col sm={6}>
//                     <TextField label="Field 1" defaultValue="Value for Field 1" />
//                     <TextField label="Field 2" defaultValue="Value for Field 2" />
//                   </Col>
//                   <Col sm={3} />
//                 </Row>
//               </Container>
//             </InfoPanel.SecondaryView>
//           </InfoPanel>
//         </ExpansionPanel.Content>
//       </ExpansionPanel>
//     </Container>
//   )
// }

export const ChangingToggleContent: Story = {
  render: () => (
    <div style={styles}>
      <ExpansionPanel>
        <ExpansionPanel.Summary>
          <p style={{ margin: 0, textAlign: 'center' }}>Show more</p>
        </ExpansionPanel.Summary>
        <ExpansionPanel.AlternativeSummary>
          <p style={{ margin: 0, textAlign: 'center' }}>Show less</p>
        </ExpansionPanel.AlternativeSummary>
        <ExpansionPanel.Content>
          <h1>This is a heading</h1>
          <p>This is a paragraph</p>
          <Button color="info">Do not click me!!</Button>
        </ExpansionPanel.Content>
      </ExpansionPanel>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const Reversed: Story = {
  render: () => (
    <div style={styles}>
      <ExpansionPanel>
        <ExpansionPanel.Content>
          <h1>This is a heading</h1>
          <p>This is a paragraph</p>
          <Button color="info">Do not click me!!</Button>
        </ExpansionPanel.Content>
        <ExpansionPanel.Summary>
          <p style={{ margin: 0, textAlign: 'center' }}>Show more</p>
        </ExpansionPanel.Summary>
        <ExpansionPanel.AlternativeSummary>
          <p style={{ margin: 0, textAlign: 'center' }}>Show less</p>
        </ExpansionPanel.AlternativeSummary>
      </ExpansionPanel>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

const InsidePanelStory: FC = () => {
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    adjustView();

    window.addEventListener('resize', adjustView);

    return () => {
      window.removeEventListener('resize', adjustView);
    };
  }, []);

  const adjustView = () => {
    setMobileView(window.innerWidth <= 550);
  };

  return (
    <div style={styles}>
      <Panel className="no-padding eui-panel-warning-inverse" color="warning">
        <Panel.Heading>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ whiteSpace: 'nowrap' }}>
              <strong>Panel title</strong>
            </span>
            {/*TODO: Uncomment when Progressbar is created */}
            {/*<Progressbar progress={50} color="warning" theme="white" style={{ margin: '0 28px' }} />*/}
          </div>
        </Panel.Heading>
        <Panel.Body className="standard-border-bottom">
          <Panel>
            <Panel.Body>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: mobileView ? 'center' : 'flex-start',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    flexDirection: mobileView ? 'row' : 'column',
                    justifyContent: mobileView ? 'center' : 'flex-start',
                  }}
                >
                  <h3 style={{ textAlign: 'center' }}>This is a heading 3</h3>
                  <Button color="info">Report CE</Button>
                </div>
              </div>
            </Panel.Body>
          </Panel>
        </Panel.Body>
        <ExpansionPanel noCaret growHorizontally={false}>
          <ExpansionPanel.Content>
            <h1>This is a heading</h1>
            <p>This is a paragraph</p>
            <Button color="info">Do not click me!!</Button>
          </ExpansionPanel.Content>
          <ExpansionPanel.Summary>
            <p style={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
              <span style={{ marginRight: '6px' }}>Show details</span>
              <span className="material-icons">keyboard_arrow_down</span>
            </p>
          </ExpansionPanel.Summary>
          <ExpansionPanel.AlternativeSummary>
            <p style={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
              <span style={{ marginRight: '6px' }}>Hide details</span>
              <span className="material-icons">keyboard_arrow_up</span>
            </p>
          </ExpansionPanel.AlternativeSummary>
        </ExpansionPanel>
      </Panel>
    </div>
  );
};

export const InsidePanel: Story = {
  render: () => <InsidePanelStory />,
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const UncontrolledDefaultExpanded: Story = {
  render: () => (
    <div style={styles}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanel.Summary>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '3fr 1fr',
              marginRight: '30px',
            }}
          >
            <p style={{ margin: 0 }}>Workgroup description code not found</p>
            <p style={{ margin: 0, marginLeft: '20px' }}>
              <span className="text-muted">Employees: </span>12
            </p>
          </div>
        </ExpansionPanel.Summary>
        <ExpansionPanel.Content>
          <h1>This is a heading</h1>
          <p>This is a paragraph</p>
          <Button color="info">Do not click me!!</Button>
        </ExpansionPanel.Content>
      </ExpansionPanel>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

const ControlledPanel: FC = () => {
  const [expanded, setExpanded] = useState(true);

  const handleToggle = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div style={styles}>
      <ExpansionPanel expanded={expanded} onToggle={handleToggle}>
        <ExpansionPanel.Summary>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '3fr 1fr',
              marginRight: '30px',
            }}
          >
            <p style={{ margin: 0 }}>Workgroup description code not found</p>
            <p style={{ margin: 0, marginLeft: '20px' }}>
              <span className="text-muted">Employees: </span>12
            </p>
          </div>
        </ExpansionPanel.Summary>
        <ExpansionPanel.Content>
          <h1>This is a heading</h1>
          <p>This is a paragraph</p>
          <Button color="info">Do not click me!!</Button>
        </ExpansionPanel.Content>
      </ExpansionPanel>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledPanel />,
  parameters: {
    controls: {
      disable: true,
    },
  },
};

// TODO: Uncomment when Table is created
// export const WithTable: Story = {
//   render: () => {
//     const head = (
//       <tr>
//         <th>Date</th>
//         <th>Description</th>
//         <th>Transaction</th>
//         <th>Status</th>
//         <th>Type</th>
//       </tr>
//     );
//
//     const row = [
//       <tr key={Math.random() * 10}>
//         <td>12-07-2017</td>
//         <td>Monthly Charge Invoice</td>
//         <td>98-00998878</td>
//         <td>Paid</td>
//         <td>Check</td>
//       </tr>,
//     ];
//
//     const body = Array(6).fill(row);
//
//     return (
//       <div style={styles}>
//         <ExpansionPanel className="no-padding">
//           <ExpansionPanel.Summary>
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: '3fr 1fr',
//                 marginRight: '30px',
//               }}
//             >
//               <p style={{ margin: 0 }}>Status report summary total prior to upload</p>
//               <p style={{ margin: 0, marginLeft: '20px' }}>
//                 <span className="text-muted">Employees: </span>12
//               </p>
//             </div>
//           </ExpansionPanel.Summary>
//           <ExpansionPanel.Content>
//             <Table>
//               <thead>{head}</thead>
//               <tbody>{body}</tbody>
//             </Table>
//           </ExpansionPanel.Content>
//         </ExpansionPanel>
//       </div>
//     );
//   }
// }

export const SeveralTogether: Story = {
  render: () => (
    <div style={styles}>
      <ExpansionPanel
        defaultExpanded
        toggleAriaLabel="Introduction to the grid layout."
      >
        <ExpansionPanel.Summary>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '4fr 2fr 1fr',
              alignItems: 'center',
              marginRight: '30px',
            }}
          >
            <div>
              <p style={{ margin: 0, display: 'inline-block' }}>
                Introduction to the grid layout
              </p>
            </div>
            <p style={{ margin: 0, marginLeft: '20px' }} className="pull-right">
              Begins Jan 13, 2017
            </p>
            <p style={{ margin: 0, marginLeft: '20px' }} className="pull-right">
              3.0 hours
            </p>
          </div>
        </ExpansionPanel.Summary>
        <ExpansionPanel.Content>
          <h1>This is a heading</h1>
          <p>This is a paragraph</p>
          <Button color="info">Do not click me!!</Button>
        </ExpansionPanel.Content>
      </ExpansionPanel>
      <ExpansionPanel toggleAriaLabel="Introduction to the grid layout">
        <ExpansionPanel.Summary>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '4fr 2fr 1fr',
              alignItems: 'center',
              marginRight: '30px',
            }}
          >
            <div>
              <p style={{ margin: 0, display: 'inline-block' }}>
                Introduction to the grid layout
              </p>
            </div>
            <p style={{ margin: 0, marginLeft: '20px' }} className="pull-right">
              Begins Jan 13, 2017
            </p>
            <p style={{ margin: 0, marginLeft: '20px' }} className="pull-right">
              3.0 hours
            </p>
          </div>
        </ExpansionPanel.Summary>
        <ExpansionPanel.Content>
          <h1>This is a heading</h1>
          <p>This is a paragraph</p>
          <Button color="info">Do not click me!!</Button>
        </ExpansionPanel.Content>
      </ExpansionPanel>
      <ExpansionPanel toggleAriaLabel="Introduction to the grid layout.">
        <ExpansionPanel.Summary>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '4fr 2fr 1fr',
              alignItems: 'center',
              marginRight: '30px',
            }}
          >
            <div>
              <p style={{ margin: 0, display: 'inline-block' }}>
                Introduction to the grid layout
              </p>
            </div>
            <p style={{ margin: 0, marginLeft: '20px' }} className="pull-right">
              Begins Jan 13, 2017
            </p>
            <p style={{ margin: 0, marginLeft: '20px' }} className="pull-right">
              3.0 hours
            </p>
          </div>
        </ExpansionPanel.Summary>
        <ExpansionPanel.Content>
          <h1>This is a heading</h1>
          <p>This is a paragraph</p>
          <Button color="info">Do not click me!!</Button>
        </ExpansionPanel.Content>
      </ExpansionPanel>
    </div>
  ),
};
