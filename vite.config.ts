import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// Copy generated stickers from brain folder to public assets on dev start/reload
const srcDir = 'C:\\Users\\vasal\\.gemini\\antigravity-ide\\brain\\02d3a27c-9863-4072-a7e5-e936caad3983';
const destDir = path.join(__dirname, 'public', 'assets', 'stickers');

if (fs.existsSync(srcDir)) {
  const fileMappings = [
    { src: 'meeting_sticker_1784002406683.png', dest: path.join(destDir, 'meeting_sticker.png') },
    { src: 'chemistry_sticker_1784002427239.png', dest: path.join(destDir, 'chemistry_sticker.png') },
    { src: 'sports_sticker_1784002444221.png', dest: path.join(destDir, 'sports_sticker.png') },
    { src: 'art_sticker_1784002460325.png', dest: path.join(destDir, 'art_sticker.png') },
    { src: 'calendar_badge_1784002477283.png', dest: path.join(destDir, 'calendar_badge.png') },
    { src: 'attendance_left_sticker_1784002960312.png', dest: path.join(destDir, 'attendance_badge_sticker.png') },
    { src: 'media__1784003201030.png', dest: path.join(__dirname, 'public', 'attendance_checkmark_3d.png') },
    { src: 'media__1784003201012.png', dest: path.join(destDir, 'books_stack_sticker.png') },
    { src: 'media__1784003201048.png', dest: path.join(__dirname, 'public', 'teacher_overview_backpack.png') },
    { src: 'media__1784007434692.png', dest: path.join(destDir, 'total_students_sticker.png') },
    { src: 'media__1784007456173.png', dest: path.join(destDir, 'present_sticker.png') },
    { src: 'media__1784007513366.png', dest: path.join(destDir, 'absent_sticker.png') },
    { src: 'media__1784007493042.png', dest: path.join(destDir, 'late_sticker.png') }
  ];

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fileMappings.forEach(mapping => {
    const srcPath = path.join(srcDir, mapping.src);
    const destPath = mapping.dest;
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`[Stickers Sync] Copied ${mapping.src} to ${destPath}`);
    } else {
      console.error(`[Stickers Sync] Source not found: ${srcPath}`);
    }
  });
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

