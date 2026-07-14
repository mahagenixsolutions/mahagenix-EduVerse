import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = 'C:\\Users\\vasal\\.gemini\\antigravity-ide\\brain\\81c97eb4-aaff-495c-9540-a73389494e69';
const destDir = path.join(__dirname, 'public', 'assets', 'stickers');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log('Created directory: ' + destDir);
}

const files = [
  { src: 'fee_payment_1783950917732.png', dest: 'fee_payment.png' },
  { src: 'library_1783950932512.png', dest: 'library.png' },
  { src: 'transport_1783950946691.png', dest: 'transport.png' },
  { src: 'school_store_1783950965241.png', dest: 'school_store.png' },
  { src: 'leave_request_1783950978977.png', dest: 'leave_request.png' },
  { src: 'certificates_1783950995041.png', dest: 'certificates.png' },
  { src: 'id_card_1783951010705.png', dest: 'id_card.png' },
  { src: 'bonafide_cert_1783951026876.png', dest: 'bonafide_certificate.png' },
  { src: 'counselling_1783951040511.png', dest: 'counselling.png' },
  { src: 'medical_room_1783951053380.png', dest: 'medical_room.png' },
  { src: 'help_desk_1783951080651.png', dest: 'help_desk.png' },
  { src: 'downloads_1783951096625.png', dest: 'downloads.png' },
  { src: 'calendar_illustration_1783953047161.png', dest: 'calendar_illustration.png' },
  { src: 'profile_illustration_1783957793923.png', dest: 'profile_illustration.png' }
];

files.forEach(f => {
  const srcPath = path.join(srcDir, f.src);
  const destPath = path.join(destDir, f.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${f.src} to ${f.dest}`);
  } else {
    console.error(`Source file not found: ${srcPath}`);
  }
});
console.log('Finished copying stickers.');
