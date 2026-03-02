const fs = require('fs');

const files = [
  'src/components/CustomCursor.tsx',
  'src/components/Hero.tsx',
  'src/components/AboutGrid.tsx',
  'src/components/PalletGrid.tsx',
  'src/components/Calculator.tsx',
  'src/components/Loader.tsx',
  'src/components/MapSection.tsx'
];

for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');
  // Handle multiline arrays as targets e.g. targets: [title1Ref..., title2Ref...],
  code = code.replace(/animate\(\{\s*targets:\s*(\[.*?\]|[^,]+),/gs, 'animate($1, {');
  code = code.replace(/tl\.add\(\{\s*targets:\s*(\[.*?\]|[^,]+),/gs, 'tl.add($1, {');
  fs.writeFileSync(file, code);
}
console.log('done');
