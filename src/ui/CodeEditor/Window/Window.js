import { PanelGroup, Panel } from 'react-resizable-panels';
import styles from './Window.module.css';

import ResizeHandle from './ResizeHandle';

const Window = ({ main, sidePanel, header }) => (
  <article className={styles.window}>
    <header className={styles.header}>{header}</header>
    <PanelGroup className={styles.content} direction="horizontal">
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
  </article>
);

export default Window;
