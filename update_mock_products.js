const fs = require('fs');

const mapping = {
  "1": "hair-coloring",
  "2": "midnight-musk-amber",
  "3": "eye-brightening-corrector",
  "4": "bodifying-shampoo",
  "5": "oil-infused-lip-tint",
  "6": "oil-free-foundation",
  "7": "long-lash-serum",
  "8": "purity-made-simple-cleanser",
  "9": "priming-filter-face",
  "10": "instant-retouch-primer",
  "11": "extra-illuminating-moisture-balm",
  "12": "voce-viva-eau-de-parfum",
  "13": "airbrush-matte",
  "14": "flyliner-longwear-eyeliner",
  "15": "face-body-foundation",
  "16": "matte-revolution-lipstick",
  "17": "lactic-acid-treatment",
  "18": "eau-de-soleil-blanc-set"
};

const imagesMap = {
  "airbrush-matte": [
    "/images/shop/airbrush-matte/airbrush-matte-01.webp",
    "/images/shop/airbrush-matte/airbrush-matte-02.webp",
    "/images/shop/airbrush-matte/airbrush-matte-03.webp",
    "/images/shop/airbrush-matte/airbrush-matte-04.webp",
    "/images/shop/airbrush-matte/airbrush-matte-05.webp"
  ],
  "bodifying-shampoo": [
    "/images/shop/bodifying-shampoo/bodifying-shampoo-01.webp",
    "/images/shop/bodifying-shampoo/bodifying-shampoo-02.webp",
    "/images/shop/bodifying-shampoo/bodifying-shampoo-03.webp"
  ],
  "eau-de-soleil-blanc-set": [
    "/images/shop/eau-de-soleil-blanc-set/eau-de-soleil-blanc-set-01.webp",
    "/images/shop/eau-de-soleil-blanc-set/eau-de-soleil-blanc-set-02.webp",
    "/images/shop/eau-de-soleil-blanc-set/eau-de-soleil-blanc-set-03.webp",
    "/images/shop/eau-de-soleil-blanc-set/eau-de-soleil-blanc-set-04.webp"
  ],
  "extra-illuminating-moisture-balm": [
    "/images/shop/extra-illuminating-moisture-balm/extra-illuminating-moisture-balm-01.webp",
    "/images/shop/extra-illuminating-moisture-balm/extra-illuminating-moisture-balm-02.webp",
    "/images/shop/extra-illuminating-moisture-balm/extra-illuminating-moisture-balm-03.webp"
  ],
  "eye-brightening-corrector": [
    "/images/shop/eye-brightening-corrector/eye-brightening-corrector-01.webp",
    "/images/shop/eye-brightening-corrector/eye-brightening-corrector-02.webp"
  ],
  "face-body-foundation": [
    "/images/shop/face-body-foundation/face-body-foundation-01.webp",
    "/images/shop/face-body-foundation/face-body-foundation-02.webp",
    "/images/shop/face-body-foundation/face-body-foundation-03.webp"
  ],
  "flyliner-longwear-eyeliner": [
    "/images/shop/flyliner-longwear-eyeliner/flyliner-longwear-eyeliner-01.webp",
    "/images/shop/flyliner-longwear-eyeliner/flyliner-longwear-eyeliner-02.webp",
    "/images/shop/flyliner-longwear-eyeliner/flyliner-longwear-eyeliner-03.webp",
    "/images/shop/flyliner-longwear-eyeliner/flyliner-longwear-eyeliner-04.webp"
  ],
  "hair-coloring": [
    "/images/shop/hair-coloring/hair-coloring-01.webp",
    "/images/shop/hair-coloring/hair-coloring-02.webp"
  ],
  "instant-retouch-primer": [
    "/images/shop/instant-retouch-primer/instant-retouch-primer-01.webp",
    "/images/shop/instant-retouch-primer/instant-retouch-primer-02.webp"
  ],
  "lactic-acid-treatment": [
    "/images/shop/lactic-acid-treatment/lactic-acid-treatment-01.webp",
    "/images/shop/lactic-acid-treatment/lactic-acid-treatment-02.webp",
    "/images/shop/lactic-acid-treatment/lactic-acid-treatment-03.webp"
  ],
  "long-lash-serum": [
    "/images/shop/long-lash-serum/long-lash-serum-01.webp",
    "/images/shop/long-lash-serum/long-lash-serum-02.webp"
  ],
  "matte-revolution-lipstick": [
    "/images/shop/matte-revolution-lipstick/matte-revolution-lipstick-01.webp",
    "/images/shop/matte-revolution-lipstick/matte-revolution-lipstick-02.webp",
    "/images/shop/matte-revolution-lipstick/matte-revolution-lipstick-03.webp"
  ],
  "midnight-musk-amber": [
    "/images/shop/midnight-musk-amber/midnight-musk-amber-01.webp",
    "/images/shop/midnight-musk-amber/midnight-musk-amber-02.webp",
    "/images/shop/midnight-musk-amber/midnight-musk-amber-03.webp"
  ],
  "oil-free-foundation": [
    "/images/shop/oil-free-foundation/oil-free-foundation-01.webp",
    "/images/shop/oil-free-foundation/oil-free-foundation-02.webp",
    "/images/shop/oil-free-foundation/oil-free-foundation-03.webp"
  ],
  "oil-infused-lip-tint": [
    "/images/shop/oil-infused-lip-tint/oil-infused-lip-tint-01.webp",
    "/images/shop/oil-infused-lip-tint/oil-infused-lip-tint-02.webp",
    "/images/shop/oil-infused-lip-tint/oil-infused-lip-tint-03.webp"
  ],
  "priming-filter-face": [
    "/images/shop/priming-filter-face/priming-filter-face-01.webp",
    "/images/shop/priming-filter-face/priming-filter-face-02.webp",
    "/images/shop/priming-filter-face/priming-filter-face-03.webp"
  ],
  "purity-made-simple-cleanser": [
    "/images/shop/purity-made-simple-cleanser/purity-made-simple-cleanser-01.webp",
    "/images/shop/purity-made-simple-cleanser/purity-made-simple-cleanser-02.webp",
    "/images/shop/purity-made-simple-cleanser/purity-made-simple-cleanser-03.webp",
    "/images/shop/purity-made-simple-cleanser/purity-made-simple-cleanser-04.webp",
    "/images/shop/purity-made-simple-cleanser/purity-made-simple-cleanser-05.webp",
    "/images/shop/purity-made-simple-cleanser/purity-made-simple-cleanser-06.webp"
  ],
  "voce-viva-eau-de-parfum": [
    "/images/shop/voce-viva-eau-de-parfum/voce-viva-eau-de-parfum-01.webp",
    "/images/shop/voce-viva-eau-de-parfum/voce-viva-eau-de-parfum-02.webp",
    "/images/shop/voce-viva-eau-de-parfum/voce-viva-eau-de-parfum-03.webp",
    "/images/shop/voce-viva-eau-de-parfum/voce-viva-eau-de-parfum-04.webp"
  ]
};

const mockProductsPath = 'src/app/data/mockProducts.ts';
let content = fs.readFileSync(mockProductsPath, 'utf8');

// The file format is relatively standard so we can regex it
// Look for id: "1", ... images: [...],
for (let id = 1; id <= 18; id++) {
  const folderKey = mapping[String(id)];
  const images = imagesMap[folderKey];
  if (images && images.length > 0) {
    const imagesArrayStr = JSON.stringify(images, null, 6).replace(/\]/g, '    ]');
    
    // Find the block for this ID and replace its images array.
    // This is a simple regex that finds id: "X" and then the next images: [...] array.
    const regex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?images:\\s*\\[)([\\s\\S]*?)(\\])`, 'g');
    
    // Actually, it's safer to just split by id and replace the first images block.
    // Since IDs are "1", "2", etc.
    
    // Let's replace by finding the start of the product object
    const startIdx = content.indexOf(`id: "${id}"`);
    if (startIdx !== -1) {
      const imagesKeyIdx = content.indexOf('images: [', startIdx);
      if (imagesKeyIdx !== -1) {
        const endBracketIdx = content.indexOf(']', imagesKeyIdx);
        
        const before = content.substring(0, imagesKeyIdx);
        const after = content.substring(endBracketIdx + 1);
        
        // Form the new images array
        const newImagesStr = `images: ${JSON.stringify(images, null, 2).replace(/\\n/g, '\\n    ').split('\\n').join('\\n    ')}`;
        
        // Wait, JSON.stringify returns nice formatting, but we just need a valid JS array.
        // Let's do it simpler.
        const formattedImages = images.map(i => `"${i}"`).join(',\\n      ');
        content = before + `images: [\\n      ${formattedImages}\\n    ]` + after;
      }
    }
  }
}

fs.writeFileSync(mockProductsPath, content, 'utf8');
console.log('Successfully updated mockProducts.ts');
