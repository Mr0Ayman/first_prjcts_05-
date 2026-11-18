import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';

const originalsDir = path.resolve('assets/originals');
const outputDir = path.resolve('public/img');

fs.mkdirSync(originalsDir, { recursive: true });
fs.mkdirSync(outputDir, { recursive: true });

// All unique master images needed across the site
const imageMap = [
  // Logos
  { name: 'logo-marrakech-seminaire.png', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2022/01/Sans-titre-100-x-69-px.png', alt: 'Marrakech Séminaire Maisons d\'Hôtes - Logo' },
  { name: 'logo-conciergerie.png', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2022/01/CONCIERGERIE.png', alt: 'Marrakech Séminaire Conciergerie - Logo' },

  // Hero & Categories
  { name: 'villa-dhorizon-piscine.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/07/Villa-DHorizon-Marrakech-34.jpg', alt: 'Villa D\'Horizon Marrakech avec piscine et palmiers' },
  { name: 'les-lys-magique-entree.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/07/LES-LYS-MAGIQUE-ENTREE.jpg', alt: 'Entrée majestueuse du domaine Les Lys Magique Marrakech' },
  { name: 'majestic-luxury-piscine.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/07/DSCF5139-copie-2-3.jpg', alt: 'Piscine et jardin du Majestic Luxury Manoir Marrakech' },
  { name: 'marrakech-atlas-view.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/10/Marrakech-Atlas-Vieu-18.jpg', alt: 'Domaine Marrakech Atlas View avec vue sur les montagnes' },

  // 6 Featured Properties
  { name: 'villa-anouar-terrasse.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/07/Villa-Anouar-Marrakech-49.jpg', alt: 'Villa Anouar Marrakech terrasse et piscine privée' },
  { name: 'palais-paradis-facade.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-05-at-18.36.5023.jpg', alt: 'Palais Paradis Hôtel Marrakech architecture et jardins' },
  { name: 'riad-bleu-patio.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/07/Riad-Le-Bleu-de-la-Medina-4.jpg', alt: 'Riad Le Bleu de la Médina patio traditionnel avec piscine' },
  { name: 'riad-bleu-rooftop.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/07/Riad-Le-Bleu-de-la-Medina-1.jpg', alt: 'Riad Le Bleu de la Médina terrasse rooftop panoramique' },
  { name: 'riad-bleu-chambre.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/07/Riad-Le-Bleu-de-la-Medina-2.jpg', alt: 'Riad Le Bleu de la Médina suite raffinée' },
  { name: 'riad-bleu-salon.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/07/Riad-Le-Bleu-de-la-Medina-3.jpg', alt: 'Riad Le Bleu de la Médina salon marocain' },
  { name: 'jardin-deux-soeurs.webp', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/07/2023-10-31-2.webp', alt: 'Jardin Les Deux Sœurs Marrakech parc arboré et piscine' },

  // Gallery of Les Lys Magique (Property Page)
  { name: 'les-lys-terrasses.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/07/TERASSES-TRANSATS.jpg', alt: 'Les Lys Magique terrasse ensoleillée avec transats' },
  { name: 'les-lys-piscine-bord.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/07/AU-BORD-DE-LA-PISCINE.jpg', alt: 'Les Lys Magique espace détente au bord de la piscine' },
  { name: 'les-lys-suite-executive.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/07/SUITE-EXECUTIVE.jpg', alt: 'Les Lys Magique suite executive grand confort' },
  { name: 'les-lys-hammam.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/07/HAMMAM.jpg', alt: 'Les Lys Magique hammam traditionnel marocain' },
  { name: 'les-lys-restaurant.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/07/RESTAURANT.jpg', alt: 'Les Lys Magique restaurant gastronomique oriental' },
  { name: 'les-lys-salle-conference.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/07/SALLE-CONFERANCE.jpg', alt: 'Les Lys Magique salle de conférence et séminaire équipée' },
  { name: 'les-lys-coucher-soleil.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/07/COUCHER-DE-SOLEIL.jpg', alt: 'Les Lys Magique coucher de soleil sur les palmiers' },
  { name: 'les-lys-buffet.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/07/BUFFET-EVE.jpg', alt: 'Les Lys Magique buffet d\'événement traiteur' },

  // Additional Villas in Categories
  { name: 'villa-palm-beach.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/08/WhatsApp-Image-2025-11-19-a-20.22.55_125626d3.jpg', alt: 'Villa Palm Beach Marrakech 10 chambres' },
  { name: 'villa-al-marrakchi.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/10/VILLA-AL-MARRAKCHI.jpg', alt: 'Villa Al Marrakchi 9 chambres' },
  { name: 'brin-de-lorient.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/10/WhatsApp-Image-2025-12-11-at-17.09.14-1.jpeg', alt: 'Le Brin de l\'Orient 8 chambres' },
  { name: 'green-garden.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/07/WhatsApp-Image-2025-01-22-a-16.25.36_120b207f.jpg', alt: 'Green Garden Marrakech 19 chambres' },
  { name: 'oiseau-bleu-jaune.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/08/3W7A9885.jpg', alt: 'L\'Oiseau Bleu et Jaune 17 chambres' },
  { name: 'vu-sur-golf.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/08/WhatsApp-Image-2025-02-03-a-12.52.47_b326060f.jpg', alt: 'Vu sur Golf Marrakech 40 chambres' },
  { name: 'royal-kasbah-source.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2026/10/ROYAL-KASBAH-SOURCE-RESSORT-2.jpg', alt: 'Royal Kasbah Source Resort 32 chambres' },

  // About Us
  { name: 'about-banner.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2023/12/IMG-20230719-WA0129.jpg', alt: 'Marrakech Séminaires - Cadre d\'exception' },
  { name: 'about-mission.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2023/12/IMG-20230719-WA0123.jpg', alt: 'Notre Mission - Accueil chaleureux à Marrakech' },
  { name: 'about-valeurs.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2023/12/IMG-20230719-WA0081.jpg', alt: 'Nos Valeurs - Excellence et hospitalité marocaine' },
  { name: 'about-equipe.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2023/12/IMG-20230719-WA0118.jpg', alt: 'Notre Équipe dévouée et passionnée' },
  { name: 'about-engagement.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2023/12/IMG-20230719-WA0114.jpg', alt: 'Notre Engagement pour des séjours inoubliables' },

  // Events Gallery
  { name: 'event-oriental-night-1.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2022/02/ORIENTALNIGHT_KA97-scaled.jpg', alt: 'Soirée orientale avec lanternes et ambiance marocaine' },
  { name: 'event-day-after.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2022/02/DAYAFTER12-scaled.jpg', alt: 'Brunch day-after mariage au bord de l\'eau' },
  { name: 'event-oriental-night-2.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2022/02/ORIENTALNIGHT_KA75-scaled.jpg', alt: 'Dîner sous les étoiles aux chandelles' },
  { name: 'event-soiree-dj.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2022/02/SOIREE_KA90-scaled.jpg', alt: 'Soirée festive avec DJ et animation musicale' },
  { name: 'event-soiree-danse.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2022/02/SOIREE_KA81-scaled.jpg', alt: 'Spectacle et performances d\'artistes à Marrakech' },
  { name: 'event-oriental-buffet.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2022/02/ORIENTALNIGHT_KA7-scaled.jpg', alt: 'Buffet gastronomique marocain' },
  { name: 'event-fire-eater.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2022/02/ORIENTALNIGHT_KA67-scaled.jpg', alt: 'Performance spectaculaire cracheur de feu' },

  // Contact
  { name: 'contact-banner.jpg', url: 'https://marrakechseminairesmaisondhotes.com/wp-content/uploads/2022/02/header-banner-contact.jpg', alt: 'Contactez notre conciergerie à Marrakech' }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      return resolve(dest);
    }
    const file = fs.createWriteStream(dest);
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    });
    req.on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
    req.on('timeout', () => {
      req.destroy();
      fs.unlink(dest, () => reject(new Error(`Timeout downloading ${url}`)));
    });
  });
}

async function main() {
  console.log(`Starting download of ${imageMap.length} images into assets/originals/...`);
  const manifest = [];

  for (const item of imageMap) {
    const rawDest = path.join(originalsDir, item.name);
    try {
      await download(item.url, rawDest);
      console.log(`✓ Downloaded: ${item.name}`);
    } catch (e) {
      console.warn(`! Failed to download ${item.name} (${item.url}): ${e.message}`);
      // If download fails, create a placeholder original so the pipeline does not break
      if (!fs.existsSync(rawDest)) {
        await sharp({
          create: {
            width: 1200,
            height: 800,
            channels: 3,
            background: { r: 180, g: 170, b: 155 }
          }
        }).jpeg().toFile(rawDest);
      }
    }

    // Now process using Sharp into public/img
    const baseName = item.name.substring(0, item.name.lastIndexOf('.'));
    const isLogo = item.name.includes('logo');
    
    try {
      const metadata = await sharp(rawDest).metadata();
      const origWidth = metadata.width || 1200;
      const origHeight = metadata.height || 800;

      if (isLogo) {
        // Keep PNG and also generate WebP for logo
        await sharp(rawDest)
          .webp({ quality: 85 })
          .toFile(path.join(outputDir, `${baseName}.webp`));
        fs.copyFileSync(rawDest, path.join(outputDir, item.name));
        manifest.push({
          key: baseName,
          original: item.name,
          alt: item.alt,
          aspectRatio: origWidth / origHeight,
          width: origWidth,
          height: origHeight,
          webp: `/img/${baseName}.webp`,
          src: `/img/${item.name}`
        });
      } else {
        // Generate responsive widths: 480, 800, 1200, 1920
        const widths = [480, 800, 1200, 1920].filter(w => w <= origWidth * 1.25);
        if (widths.length === 0) widths.push(origWidth);

        const srcsetParts = [];
        for (const w of widths) {
          const outName = `${baseName}-${w}w.webp`;
          const outPath = path.join(outputDir, outName);
          await sharp(rawDest)
            .resize({ width: w, withoutEnlargement: true })
            .webp({ quality: 78, effort: 4 })
            .toFile(outPath);
          srcsetParts.push(`/img/${outName} ${w}w`);
        }

        // Standard fallback WebP (800w or origWidth)
        const stdWidth = Math.min(1200, origWidth);
        const stdName = `${baseName}.webp`;
        await sharp(rawDest)
          .resize({ width: stdWidth, withoutEnlargement: true })
          .webp({ quality: 78, effort: 4 })
          .toFile(path.join(outputDir, stdName));

        manifest.push({
          key: baseName,
          original: item.name,
          alt: item.alt,
          aspectRatio: origWidth / origHeight,
          width: origWidth,
          height: origHeight,
          src: `/img/${stdName}`,
          srcset: srcsetParts.join(', '),
          sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1200px'
        });
        console.log(`  ✓ Converted & resized: ${baseName} (${widths.join(', ')}px)`);
      }
    } catch (err) {
      console.error(`Error processing ${item.name}:`, err.message);
    }
  }

  fs.writeFileSync(path.join(outputDir, 'images-manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`\nAll images processed! Manifest saved to public/img/images-manifest.json`);
}

main().catch(console.error);
