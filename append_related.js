const fs = require('fs');

const mockProductsPath = 'src/app/data/mockProducts.ts';
let content = fs.readFileSync(mockProductsPath, 'utf8');

const relatedAdditions = {
  // bodifying-shampoo (id: "4") gets cleansing-oil-shampoo
  "4": [
    "/images/shop/cleansing-oil-shampoo/cleansing-oil-shampoo-01.webp",
    "/images/shop/cleansing-oil-shampoo/cleansing-oil-shampoo-02.webp"
  ],
  // oil-infused-lip-tint (id: "5") gets extra-lip-tint
  "5": [
    "/images/shop/extra-lip-tint/extra-lip-tint-01.webp",
    "/images/shop/extra-lip-tint/extra-lip-tint-02.webp",
    "/images/shop/extra-lip-tint/extra-lip-tint-03.webp"
  ],
  // flyliner-longwear-eyeliner (id: "14") gets perfect-brow-pencil
  "14": [
    "/images/shop/perfect-brow-pencil/perfect-brow-pencil-01.webp",
    "/images/shop/perfect-brow-pencil/perfect-brow-pencil-02.webp"
  ],
  // hair-coloring (id: "1") only has 2 images, let's duplicate them to ensure it reaches 4 without mixing unrelated products, OR we leave it and use the `page.tsx` fallback.
};

for (const [id, additionalImages] of Object.entries(relatedAdditions)) {
  const startIdx = content.indexOf(`id: "${id}"`);
  if (startIdx !== -1) {
    const imagesKeyIdx = content.indexOf('images: [', startIdx);
    if (imagesKeyIdx !== -1) {
      const endBracketIdx = content.indexOf(']', imagesKeyIdx);
      
      const before = content.substring(0, endBracketIdx);
      const after = content.substring(endBracketIdx);
      
      const additionalStr = `,\n      ` + additionalImages.map(i => `"${i}"`).join(',\n      ');
      content = before + additionalStr + after;
    }
  }
}

fs.writeFileSync(mockProductsPath, content, 'utf8');
console.log('Successfully added related images');
