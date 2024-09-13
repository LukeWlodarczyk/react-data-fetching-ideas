import React, { useState } from 'react';

import Window from './Window';
import TopBar from './TopBar';
import Code from './Code';
import FileSystem from './FileSystem';

import useActiveModuleName from './useActiveModuleName';

import {
  minLinesNumber,
  createCodeEditorTitle,
} from './utils';

//Exacute `npm run generate-code-editor-nodes` to create up to date nodes
import nodes from './script/result';

const CodeEditor = () => {
  const activeModuleName = useActiveModuleName();

  const [activeNode, setActiveNode] = useState({
    name: '',
    content: '',
    path: '',
  });

  if (!activeModuleName) return null;

  const title = createCodeEditorTitle(activeNode.name);

  return (
    <Window
      header={<TopBar title={title} />}
      sidePanel={
        <FileSystem
          nodes={nodes}
          onSelect={setActiveNode}
          activeNodePath={activeNode.path}
        />
      }
      main={<Code value={minLinesNumber(activeNode.content, 28)} />}
    />
  );
};

export default CodeEditor;
