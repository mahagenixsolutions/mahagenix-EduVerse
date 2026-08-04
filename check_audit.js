const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

const allFiles = getAllFiles(srcDir);

const fileStats = allFiles.map(filePath => {
  const relPath = path.relative(srcDir, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').length;
  const filename = path.basename(filePath);
  const ext = path.extname(filePath);
  return {
    fullPath: filePath,
    relPath,
    filename,
    ext,
    lines,
    sizeBytes: fs.statSync(filePath).size
  };
});

fileStats.sort((a, b) => b.lines - a.lines);

const output = [];

output.push(`TOTAL FILES IN SRC: ${fileStats.length}`);

output.push("\n--- TOP 35 LARGEST FILES BY LINE COUNT ---");
fileStats.slice(0, 35).forEach(f => {
  output.push(`${f.lines.toString().padStart(5)} lines | ${f.relPath}`);
});

output.push("\n--- FOLDER STRUCTURE BREAKDOWN ---");
const folderCounts = {};
fileStats.forEach(f => {
  const parts = f.relPath.split('/');
  const topFolder = parts.length > 1 ? parts[0] : 'root';
  folderCounts[topFolder] = (folderCounts[topFolder] || 0) + 1;
});
output.push(JSON.stringify(folderCounts, null, 2));

output.push("\n--- FEATURES BREAKDOWN ---");
const features = {};
fileStats.filter(f => f.relPath.startsWith('features/')).forEach(f => {
  const parts = f.relPath.split('/');
  const feat = parts[1];
  features[feat] = (features[feat] || 0) + 1;
});
output.push(JSON.stringify(features, null, 2));

output.push("\n--- FILE NAMING AUDIT ---");
const nonPascalComponents = [];
const nonUseHooks = [];
const camelCaseOrKebabFiles = [];

fileStats.forEach(f => {
  const isTsOrJs = ['.tsx', '.jsx', '.ts', '.js'].includes(f.ext);
  if (!isTsOrJs) return;

  // Components check
  if (f.relPath.includes('components/')) {
    const baseNameWithoutExt = path.basename(f.filename, f.ext);
    if (baseNameWithoutExt !== 'index' && !/^[A-Z]/.test(baseNameWithoutExt) && !f.relPath.endsWith('.d.ts')) {
      nonPascalComponents.push(f.relPath);
    }
  }

  // Hooks check
  if (f.relPath.includes('hooks/')) {
    const baseNameWithoutExt = path.basename(f.filename, f.ext);
    if (baseNameWithoutExt !== 'index' && !baseNameWithoutExt.startsWith('use')) {
      nonUseHooks.push(f.relPath);
    }
  }
});

output.push(`Non-PascalCase Components (${nonPascalComponents.length}):\n` + nonPascalComponents.join('\n'));
output.push(`Non-use Hooks (${nonUseHooks.length}):\n` + nonUseHooks.join('\n'));

fs.writeFileSync(path.join(__dirname, 'audit_results.txt'), output.join('\n'), 'utf-8');
console.log('Done auditing.');
