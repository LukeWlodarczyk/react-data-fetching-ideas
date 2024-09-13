export const minLinesNumber = (code, minNumberOfLines) => {
  const numberOfLines = code.split(/\r\n|\r|\n/).length;

  const isMinimum = numberOfLines >= minNumberOfLines;

  if (isMinimum) return code;
  else return code + '\n'.repeat(minNumberOfLines - numberOfLines);
};

const MODULES_DIRECTORY_NAME = 'modules';

export const filterInactiveModules = (nodes, activeModuleNodeName) => {
  return nodes.map((node) =>
    node.name === MODULES_DIRECTORY_NAME
      ? {
          ...node,
          nodes: node.nodes.filter(
            (subnode) => subnode.name === activeModuleNodeName
          ),
        }
      : node
  );
};

export const createCodeEditorTitle = (activeNodeName) =>
  `Code Editor${activeNodeName && ` - ${activeNodeName}`}`;
