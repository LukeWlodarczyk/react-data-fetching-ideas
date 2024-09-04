import { PanelGroup, Panel } from 'react-resizable-panels';
import { Rnd } from 'react-rnd';
import styles from './Window.module.css';

import ResizeHandle from './ResizeHandle';

const AUTO_SAVE_ID = 'codeEditor';

const Window = ({ main, sidePanel, header }) => (
  <Rnd
    default={{
      x: 15,
      y: 235,
      width: 140,
      height: 32,
    }}
    minWidth={140}
    minHeight={32}
    dragHandleClassName={styles.header}
    className={styles.window}
  >
    <header className={styles.header}>{header}</header>
    <PanelGroup
      autoSaveId={AUTO_SAVE_ID}
      className={styles.content}
      direction="horizontal"
    >
      <Panel
        className={styles.sidepanel}
        defaultSize={30}
        minSize={10}
        collapsible
      >
        {sidePanel}
      </Panel>
      <ResizeHandle />
      <Panel className={styles.main} defaultSize={70} minSize={50}>
        {main}
      </Panel>
    </PanelGroup>
  </Rnd>
);

export default Window;
