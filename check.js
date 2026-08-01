const fs = require('fs');
const content = fs.readFileSync('./src/features/marketing/marketing.css', 'utf8');
const lines = content.split('\n');
let openBraces = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char === '{') {
      openBraces.push(i + 1);
    } else if (char === '}') {
      if (openBraces.length === 0) {
        console.log(`Extra closing brace found at line ${i + 1}`);
      } else {
        openBraces.pop();
      }
    }
  }
}

if (openBraces.length > 0) {
  console.log(`Unclosed braces found at lines: ${openBraces.join(', ')}`);
} else {
  console.log('All braces are properly closed.');
}
