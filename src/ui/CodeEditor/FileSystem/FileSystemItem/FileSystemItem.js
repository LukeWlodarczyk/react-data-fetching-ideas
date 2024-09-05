import { useState } from 'react';

import cn from 'classnames';

import styles from './FileSystemItem.module.css';

import Icon from '@/ui/Icon';

const FileSystemItem = ({ node, onSelect, activeNodePath }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isFile = Object.hasOwn(node, 'content');
  const isDir = Boolean(node.nodes);
  const hasSubNodes = isDir && node.nodes.length > 0;

  return (
    <li key={node.name}>
      <div
        className={cn(styles.node, {
          [styles.active]: activeNodePath === node.path,
        })}
      >
        {isDir && (
          <button
            disabled={!hasSubNodes}
            onClick={() => setIsOpen(!isOpen)}
            className={styles.button}
          >
            <div className={styles.dirIcon}>
              {hasSubNodes && (
                <Icon
                  name="pyramid"
                  size="xx-small"
                  className={cn(styles.pyramid, { [styles.open]: isOpen })}
                />
              )}
              <Icon name="square" size="x-small" />
            </div>

            <span className={styles.name}>{node.name}</span>
          </button>
        )}

        {isFile && (
          <button onClick={() => onSelect(node)} className={styles.button}>
            <Icon name="shield" size="x-small" />
            <span className={styles.name}>{node.name}</span>
          </button>
        )}
      </div>

      {isOpen && (
        <ul className={styles.nestedList}>
          {node.nodes.map((node) => (
            <FileSystemItem
              node={node}
              key={node.name}
              onSelect={onSelect}
              activeNodePath={activeNodePath}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default FileSystemItem;
