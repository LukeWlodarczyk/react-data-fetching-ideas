const fs = require('fs');
const path = require('path');

const buildObjectFromDirectory = (directories) => {
  const result = {};

  directories.forEach((directory) => {
    const directoryName = path.basename(directory);
    result[directoryName] = processDirectory(directory);
  });

  return result;
};

const processDirectory = (directory) => {
  const result = {};
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Rekurencyjne przeszukiwanie podfolderów
      result[file] = processDirectory(filePath);
    } else {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const fileNameWithoutExt = path.basename(file, path.extname(file));
      result[fileNameWithoutExt] = fileContent;
    }
  });

  return result;
};

const generateImplementation = (folders) => {
  const implementationObject = buildObjectFromDirectory(folders);
  const implementationContent = `export default ${JSON.stringify(implementationObject, null, 2)};`;

  fs.writeFileSync(
    './src/modules-implementation.js',
    implementationContent,
    'utf8'
  );
  console.log('modules-implementation.js generated!');
};

generateImplementation(['./src/api', './src/books', './src/hooks']);
