const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'public', 'images', 'shop');
const dirs = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());

const mapping = {};

dirs.forEach(dir => {
  const files = fs.readdirSync(path.join(baseDir, dir));
  mapping[dir] = files.map(f => `/images/shop/${dir}/${f}`);
});

console.log(JSON.stringify(mapping, null, 2));
