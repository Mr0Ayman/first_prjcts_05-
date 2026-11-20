import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const originalsDir = path.resolve('assets/originals');
const outputDir = path.resolve('public/img');

fs.mkdirSync(originalsDir, { recursive: true });
fs.mkdirSync(outputDir, { recursive: true });

// Collect all files from assets/originals recursively
function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

async function main() {
  console.log('Processing images with sharp...');
  const allOriginalFiles = getFilesRecursively(originalsDir);
  console.log(`Found ${allOriginalFiles.length} files in assets/originals.`);

  const manifest = [];
  const processedKeys = new Set();

  for (const filePath of allOriginalFiles) {
    const ext = path.extname(filePath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;

    const baseName = path.basename(filePath, ext);
    if (processedKeys.has(baseName)) continue;
    processedKeys.add(baseName);

    const isLogo = baseName.includes('logo');

    try {
      const metadata = await sharp(filePath).metadata();
      const origWidth = metadata.width || 1200;
      const origHeight = metadata.height || 800;

      if (isLogo) {
        // Logo handling
        await sharp(filePath)
          .webp({ quality: 85 })
          .toFile(path.join(outputDir, `${baseName}.webp`));
        fs.copyFileSync(filePath, path.join(outputDir, path.basename(filePath)));
        
        manifest.push({
          key: baseName,
          filename: path.basename(filePath),
          aspectRatio: origWidth / origHeight,
          width: origWidth,
          height: origHeight,
          src: `/img/${baseName}.webp`,
          srcset: `/img/${baseName}.webp 1x`
        });
        console.log(`✓ Processed logo: ${baseName}`);
      } else {
        // Hero images get extra large sizes for 4K / high-DPR screens
        const isHero = baseName === 'home' || baseName.startsWith('home-') || baseName === 'hero-bg';
        const targetWidths = isHero
          ? [480, 800, 1200, 1920, 2560, 3840].filter(w => w <= origWidth * 1.3)
          : [480, 800, 1200, 1920].filter(w => w <= origWidth * 1.25);
        if (targetWidths.length === 0) targetWidths.push(origWidth);

        const quality = isHero ? 78 : 78;
        const srcsetParts = [];
        for (const w of targetWidths) {
          const outName = `${baseName}-${w}w.webp`;
          const outPath = path.join(outputDir, outName);
          await sharp(filePath)
            .resize({ width: w, withoutEnlargement: true })
            .webp({ quality, effort: 4 })
            .toFile(outPath);
          srcsetParts.push(`/img/${outName} ${w}w`);
        }

        // Standard fallback WebP (1920 for hero, 1200 for others)
        const stdWidth = isHero ? Math.min(1920, origWidth) : Math.min(1200, origWidth);
        const stdName = `${baseName}.webp`;
        await sharp(filePath)
          .resize({ width: stdWidth, withoutEnlargement: true })
          .webp({ quality, effort: 4 })
          .toFile(path.join(outputDir, stdName));

        const sizesAttr = isHero ? '100vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1200px';

        manifest.push({
          key: baseName,
          filename: `${baseName}.webp`,
          aspectRatio: origWidth / origHeight,
          width: origWidth,
          height: origHeight,
          src: `/img/${stdName}`,
          srcset: srcsetParts.join(', '),
          sizes: sizesAttr
        });
        console.log(`✓ Processed ${isHero ? 'HERO' : 'responsive'} image: ${baseName} (${targetWidths.join(', ')}w)`);
      }
    } catch (err) {
      console.error(`Error processing ${filePath}:`, err.message);
    }
  }

  fs.writeFileSync(path.join(outputDir, 'images-manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`\nAll images processed! Manifest saved to public/img/images-manifest.json`);
}

main().catch(console.error);
