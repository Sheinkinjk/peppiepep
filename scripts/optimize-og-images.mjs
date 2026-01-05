import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const images = [
  'public/og-image.png',
  'public/og-linkedin-business.png',
  'public/og-linkedin-creator.png',
  'public/og-linkedin-influencer.png'
];

async function optimizeImage(filePath) {
  const fullPath = path.join(projectRoot, filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Skipping ${filePath} - file not found`);
    return;
  }

  const outputPath = fullPath.replace('.png', '-optimized.png');

  try {
    await sharp(fullPath)
      .resize(1200, 630, { fit: 'inside', withoutEnlargement: true })
      .png({ quality: 85, compressionLevel: 9, effort: 10 })
      .toFile(outputPath);

    const originalSize = fs.statSync(fullPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

    console.log(`✅ ${path.basename(filePath)}`);
    console.log(`   Original: ${(originalSize / 1024).toFixed(0)}KB`);
    console.log(`   Optimized: ${(optimizedSize / 1024).toFixed(0)}KB`);
    console.log(`   Savings: ${savings}%\n`);

    // Replace original with optimized
    fs.unlinkSync(fullPath);
    fs.renameSync(outputPath, fullPath);
  } catch (error) {
    console.error(`❌ Error optimizing ${filePath}:`, error.message);
  }
}

console.log('🖼️  Optimizing Open Graph images...\n');

for (const imagePath of images) {
  await optimizeImage(imagePath);
}

console.log('🎉 All images optimized!');
console.log('\n📋 Next steps:');
console.log('1. Check image quality at public/og-*.png');
console.log('2. Test OG tags: https://www.opengraph.xyz/');
console.log('3. Commit optimized images');
console.log('4. Deploy to production');
