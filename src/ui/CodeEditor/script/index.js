const fs = require('fs');
const path = require('path');

const createNodesTree = (dirPaths) =>
  dirPaths.map((dirPath) => ({
    name: path.basename(dirPath),
    nodes: processPath(dirPath),
    path: path.basename(dirPath),
  }));

const processPath = (dirPath) => {
  const result = [];

  try {
    const items = fs.readdirSync(dirPath);

    items.forEach((item) => {
      const itemPath = path.join(dirPath, item);
      const stats = fs.statSync(itemPath);

      if (stats.isDirectory())
        result.push({
          name: item,
          nodes: processPath(itemPath),
          path: itemPath,
        });
      else
        result.push({
          name: path.basename(item),
          content: fs.readFileSync(itemPath, 'utf8'),
          path: itemPath,
        });
    });
  } catch (error) {
    console.error(`Error processing directory path: ${dirPath}`, error);
  }

  return result;
};

const generate = (paths) => {
  const nodesTree = createNodesTree(paths);
  const file = `export default ${JSON.stringify(nodesTree, null, 2)};`;

  try {
    fs.writeFileSync('./src/ui/CodeEditor/script/result.js', file, 'utf8');
    console.log('result.js generated successfully!');
  } catch (error) {
    console.error('Error writing result.js file:', error);
  }
};

generate(['./src/api', './src/modules', './src/hooks']);
