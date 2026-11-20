import fs from 'fs';
import path from 'path';
import https from 'https';

const fontsDir = path.resolve('public/fonts');
fs.mkdirSync(fontsDir, { recursive: true });

const cssUrl = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Jost:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap';

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
  });
}

function downloadBinary(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(dest)));
      res.on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    });
  });
}

async function main() {
  console.log('Fetching Google Fonts CSS for Cormorant Garamond & Jost...');
  const css = await fetchText(cssUrl);

  const blockRegex = /\/\*\s*([^*]+?)\s*\*\/\s*@font-face\s*\{([^}]+)\}/g;
  let match;
  let localCss = '';
  let count = 0;

  while ((match = blockRegex.exec(css)) !== null) {
    const subset = match[1].trim();
    const block = match[2];

    // Only keep latin and latin-ext as specified
    if (subset !== 'latin' && subset !== 'latin-ext') {
      continue;
    }

    const urlMatch = block.match(/url\((https:\/\/[^)]+\.woff2)\)/);
    const familyMatch = block.match(/font-family:\s*['"]?([^'";]+)['"]?/);
    const weightMatch = block.match(/font-weight:\s*([0-9]+)/);
    const styleMatch = block.match(/font-style:\s*([a-z]+)/);

    if (urlMatch && familyMatch) {
      count++;
      const fontUrl = urlMatch[1];
      const familySlug = familyMatch[1].toLowerCase().replace(/['"\s]+/g, '-');
      const weight = weightMatch ? weightMatch[1] : '400';
      const style = styleMatch ? styleMatch[1] : 'normal';
      const filename = `${familySlug}-${weight}-${style}-${subset}.woff2`;
      const fontDest = path.join(fontsDir, filename);

      await downloadBinary(fontUrl, fontDest);
      console.log(`✓ Downloaded font (${subset}): ${filename}`);

      let rewrittenBlock = block.replace(urlMatch[0], `url('/fonts/${filename}') format('woff2')`);
      if (!rewrittenBlock.includes('font-display')) {
        rewrittenBlock += ';\n  font-display: swap';
      }
      localCss += `/* ${subset} */\n@font-face {\n${rewrittenBlock}\n}\n\n`;
    }
  }

  fs.writeFileSync('public/fonts/fonts.css', localCss);
  console.log(`Done! ${count} font files saved to public/fonts/ and public/fonts/fonts.css generated.`);
}

main().catch(console.error);
