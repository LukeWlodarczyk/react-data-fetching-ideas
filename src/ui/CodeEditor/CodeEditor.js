import React, { useState } from 'react';

import Window from './Window';
import TopBar from './TopBar';
import Code from './Code';
import FileSystem from './FileSystem';

import { minLinesNumber } from './utils';

//Exacute `npm run generate-code-editor-nodes` to create up to date nodes
import nodes from './script/result';

const CodeEditor = () => {
  const [activeNode, setActiveNode] = useState({
    name: '',
    content: '',
    path: '',
  });

  const title = `Code Editor ${activeNode.name && `- ${activeNode.name}`}`;

  return (
    <Window
      header={<TopBar title={title} />}
      sidePanel={
        <FileSystem
          nodes={implementation}
          onSelect={setActiveNode}
          activeNodePath={activeNode.path}
        />
      }
      main={<Code value={minLinesNumber(activeNode.content, 28)} />}
    />
  );
};

export default CodeEditor;
