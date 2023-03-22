const fs = require('fs');
const path = require('path');

module.exports = (dir) => {
  const pages = fs
    .readdirSync(path.join(__dirname, '../', dir))
    .filter((file) => {
      return file.indexOf('.') !== 0 && file.slice(-4) === '.tsx' && file !== 'index.tsx';
    })
    .map((file) => file.split('.tsx')[0]);

  pages.unshift('');

  return pages;
};
