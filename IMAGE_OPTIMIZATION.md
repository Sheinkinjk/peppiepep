# Image Optimization Guide

## Current Status

The following Open Graph images are significantly oversized and need optimization:

| File | Current Size | Target Size | Status |
|------|--------------|-------------|--------|
| `public/og-image.png` | 650KB | ~150KB | ⚠️ Needs optimization |
| `public/og-linkedin-business.png` | 644KB | ~150KB | ⚠️ Needs optimization |
| `public/og-linkedin-creator.png` | 638KB | ~150KB | ⚠️ Needs optimization |
| `public/og-linkedin-influencer.png` | 660KB | ~150KB | ⚠️ Needs optimization |

## Impact

- **Performance:** Large images slow down page loads, especially on mobile/slow connections
- **SEO:** Google considers page speed in rankings
- **Cost:** Higher bandwidth usage
- **User Experience:** Longer wait times for social media previews

## Recommended Optimization Methods

### Option 1: Online Tools (Easiest)
1. **TinyPNG** (https://tinypng.com/)
   - Upload each PNG file
   - Downloads optimized version automatically
   - Usually achieves 70-80% reduction with minimal quality loss

2. **Squoosh** (https://squoosh.app/)
   - Google's image optimization tool
   - Allows fine-tuning of compression settings
   - Can convert to WebP for even better compression

### Option 2: Command Line (Automated)

Install ImageMagick:
```bash
# macOS
brew install imagemagick

# Ubuntu/Debian
sudo apt-get install imagemagick
```

Optimize images:
```bash
# Navigate to public directory
cd public

# Optimize each image (targets ~150KB)
for file in og-*.png; do
  convert "$file" -strip -quality 85 -resize '1200x630>' "optimized-$file"
  mv "optimized-$file" "$file"
done
```

### Option 3: npm Package

Install sharp (already in package.json):
```bash
npm install sharp
```

Create optimization script:
```javascript
// scripts/optimize-images.mjs
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const images = [
  'public/og-image.png',
  'public/og-linkedin-business.png',
  'public/og-linkedin-creator.png',
  'public/og-linkedin-influencer.png'
];

async function optimizeImage(filePath) {
  const outputPath = filePath.replace('.png', '-optimized.png');

  await sharp(filePath)
    .resize(1200, 630, { fit: 'inside' })
    .png({ quality: 85, compressionLevel: 9 })
    .toFile(outputPath);

  const originalSize = fs.statSync(filePath).size;
  const optimizedSize = fs.statSync(outputPath).size;
  const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

  console.log(`✅ ${path.basename(filePath)}`);
  console.log(`   Original: ${(originalSize / 1024).toFixed(0)}KB`);
  console.log(`   Optimized: ${(optimizedSize / 1024).toFixed(0)}KB`);
  console.log(`   Savings: ${savings}%\n`);

  // Replace original with optimized
  fs.unlinkSync(filePath);
  fs.renameSync(outputPath, filePath);
}

for (const imagePath of images) {
  await optimizeImage(imagePath);
}

console.log('🎉 All images optimized!');
```

Run:
```bash
node scripts/optimize-images.mjs
```

## Post-Optimization Checklist

- [ ] Verify image quality is acceptable (check social media previews)
- [ ] Confirm file sizes are under 200KB
- [ ] Test Open Graph tags still work: https://www.opengraph.xyz/
- [ ] Run Lighthouse audit to verify improved performance
- [ ] Commit optimized images to git
- [ ] Deploy to production

## Alternative: Convert to WebP

For even better compression, consider converting to WebP format:

```javascript
await sharp(filePath)
  .resize(1200, 630, { fit: 'inside' })
  .webp({ quality: 85 })
  .toFile(outputPath.replace('.png', '.webp'));
```

**Note:** Ensure your meta tags support WebP:
```html
<meta property="og:image" content="/og-image.webp" />
```

Most social platforms support WebP, but verify compatibility for your specific use case.

## Automated CI/CD Integration

Add to `.github/workflows/optimize-images.yml`:

```yaml
name: Optimize Images

on:
  push:
    paths:
      - 'public/og-*.png'

jobs:
  optimize:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: node scripts/optimize-images.mjs
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: "chore: optimize OG images"
```

This will automatically optimize images when they're added/modified.
