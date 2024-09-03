import { useState } from 'react';
import { PanelResizeHandle } from 'react-resizable-panels';

import styles from './ResizeHandle.module.css';

import Icon from '@/ui/Icon';

const ResizeHandle = () => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <PanelResizeHandle className={styles.handle} onDragging={setIsDragging}>
      <div className={styles.handleInner} data-is-dragging={isDragging}>
        <Icon name="stuck" size="x-small" className={styles.icon} />
      </div>
    </PanelResizeHandle>
  );
};

export default ResizeHandle;
