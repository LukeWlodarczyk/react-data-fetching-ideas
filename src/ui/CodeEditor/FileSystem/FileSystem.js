import FileSystemItem from './FileSystemItem';

import styles from './FileSystem.module.css';

const FileSystem = ({ nodes, onSelect, activeNodePath }) => (
  <ul className={styles.list}>
    {nodes.map((node) => (
      <FileSystemItem
        node={node}
        key={node.name}
        onSelect={onSelect}
        activeNodePath={activeNodePath}
      />
    ))}
  </ul>
);

export default FileSystem;
