import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function upscaleHero() {
  const srcPath = 'assets/originals/hero/home-original.jpg';
  const outPath = 'assets/originals/hero/home-4k.jpg';
  
  if (!fs.existsSync(srcPath)) {
    throw new Error(`Source not found: ${srcPath}`);
  }

  const meta = await sharp(srcPath).metadata();
  console.log(`Original image resolution: ${meta.width}x${meta.height}`);

  const targetWidth = 3840;
  const targetHeight = Math.round(targetWidth * (meta.height / meta.width));
  console.log(`Target upscale resolution: ${targetWidth}x${targetHeight}`);

  // Lanczos3 high-quality upscale + mild unsharp mask
  await sharp(srcPath)
    .resize(targetWidth, targetHeight, {
      kernel: sharp.kernel.lanczos3,
      fit: 'cover'
    })
    .sharpen({
      sigma: 1.2,
      m1: 1.0,
      m2: 2.0,
      x1: 2.0,
      y2: 10.0,
      y3: 20.0
    })
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
    .toFile(outPath);

  // Also replace home.jpg with this 4K version so image processing picks it up
  fs.copyFileSync(outPath, 'assets/originals/hero/home.jpg');
  console.log(`Saved 4K upscaled image to ${outPath} and updated home.jpg`);
}

upscaleHero().catch(console.error);
