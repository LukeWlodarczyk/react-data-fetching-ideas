const fs = require('fs');
const path = require('path');

const createNodesTree = (dirPaths) =>
  dirPaths.map((dirPath) => ({
    name: path.basename(dirPath),
    nodes: processPath(dirPath),
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
        });
      else
        result.push({
          name: path.basename(item),
          content: fs.readFileSync(itemPath, 'utf8'),
        });
    });
  } catch (error) {
    console.error(`Error processing directory path: ${dirPath}`, error);
  }

  return result;
};

const generateImplementation = (paths) => {
  const nodesTree = createNodesTree(paths);
  const implementationFile = `export default ${JSON.stringify(nodesTree, null, 2)};`;

  try {
    fs.writeFileSync('./src/implementation.js', implementationFile, 'utf8');
    console.log('implementation.js generated successfully!');
  } catch (error) {
    console.error('Error writing implementation file:', error);
  }
};

generateImplementation(['./src/api', './src/books', './src/hooks']);
