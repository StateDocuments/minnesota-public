// In your build process, generate a components index
const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src/components');
const components = fs.readdirSync(componentsDir)
  .filter(file => file.endsWith('.jsx') || file.endsWith('.js'))
  .map(file => {
    const name = path.basename(file, path.extname(file));
    return { name, path: `./components/${name}` };
  });

fs.writeFileSync(
  path.join(__dirname, 'dist/components-index.json'),
  JSON.stringify({ components }, null, 2)
);