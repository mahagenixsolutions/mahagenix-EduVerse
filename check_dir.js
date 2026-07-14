import fs from 'fs';
import path from 'path';

const dir = 'C:\\Users\\vasal\\.gemini\\antigravity-ide\\brain\\81c97eb4-aaff-495c-9540-a73389494e69';
if (fs.existsSync(dir)) {
  const files = fs.readdirSync(dir);
  console.log('Files in 81c97eb4-aaff-495c-9540-a73389494e69:');
  console.log(files);
  
  // Also check nested folders
  files.forEach(f => {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      console.log(`Directory ${f}:`, fs.readdirSync(fullPath));
    }
  });
} else {
  console.log('Directory does not exist');
}
