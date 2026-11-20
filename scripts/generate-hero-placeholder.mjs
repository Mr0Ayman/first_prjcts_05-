import sharp from 'sharp';

const width = 3840;
const height = 2160;

const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1F332A" />
      <stop offset="35%" stop-color="#2B4538" />
      <stop offset="70%" stop-color="#345444" />
      <stop offset="100%" stop-color="#263D32" />
    </linearGradient>
    <linearGradient id="mountains" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1A2D24" stop-opacity="0.65" />
      <stop offset="100%" stop-color="#121F19" stop-opacity="0.95" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#sky)" />
  <!-- Silhouette of Atlas Mountains and Koutoubia minaret motif -->
  <polygon points="0,1600 600,1250 1100,1480 1800,1100 2400,1400 3100,1180 3840,1520 3840,2160 0,2160" fill="url(#mountains)" />
  <polygon points="0,1750 800,1450 1450,1650 2150,1350 2800,1600 3500,1380 3840,1680 3840,2160 0,2160" fill="#17261E" opacity="0.8" />
  <!-- Koutoubia silhouette offset on left-center -->
  <rect x="920" y="1100" width="120" height="550" fill="#121D17" />
  <polygon points="910,1100 980,950 1050,1100" fill="#121D17" />
  <rect x="975" y="910" width="10" height="40" fill="#121D17" />
  <circle cx="980" cy="905" r="8" fill="#899783" opacity="0.4" />
</svg>`;

async function run() {
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 90 })
    .toFile('assets/originals/hero/home.jpg');
  console.log('Successfully generated 3840x2160 landscape home.jpg placeholder!');
}

run().catch(console.error);
