/**
 * Utility functions for parsing Universkate product data
 */

/**
 * Extract color from product reference/name
 */
export function extractColor(reference: string): string {
  if (!reference) return '';
  
  const colorPatterns = [
    /black/i,
    /blue/i, 
    /red/i,
    /orange/i,
    /white/i,
    /green/i,
    /yellow/i,
    /purple/i,
    /pink/i,
    /gray|grey/i
  ];
  
  for (const pattern of colorPatterns) {
    const match = reference.match(pattern);
    if (match) {
      return match[0].toLowerCase();
    }
  }
  
  return '';
}

/**
 * Extract sizes from product reference 
 */
export function extractCSizes(reference: string): string[] {
  if (!reference) return [];
  
  const sizePatterns = [
    /\b(XS|S|M|L|XL|XXL)\b/gi,
    /\b(\d{2,3})\b/g, // Numeric sizes like 38, 42, etc.
  ];
  
  const sizes: string[] = [];
  
  for (const pattern of sizePatterns) {
    const matches = reference.match(pattern);
    if (matches) {
      sizes.push(...matches);
    }
  }
  
  return [...new Set(sizes)]; // Remove duplicates
}

/**
 * Extract base name without color/size variants
 */
export function getBaseName(fullName: string, colors: string[], sizes: string[]): string {
  if (!fullName) return '';
  
  let baseName = fullName;
  
  // Remove colors
  for (const color of colors) {
    if (color) {
      baseName = baseName.replace(new RegExp(color, 'gi'), '');
    }
  }
  
  // Remove sizes
  for (const size of sizes) {
    if (size) {
      baseName = baseName.replace(new RegExp(`\\b${size}\\b`, 'gi'), '');
    }
  }
  
  return baseName.trim().replace(/\s+/g, ' ');
}