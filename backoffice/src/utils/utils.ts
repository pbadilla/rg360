
export const newFormatPrice = (price: number): string => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

export const newNormalizeReference = (reference: string): string => 
  reference.endsWith('-') ? reference.slice(0, -1) : reference;

export function newFindDiff(str1: string, str2: string): string {
  if (!str1) return '';

  let diff = str2.split('')
    .filter((char, i) => char !== str1.charAt(i))
    .join('')
    .replace(/^-+/, ''); // Remove leading '-'

  return diff;
}

export const newChangeColor = (originColor: string): string => {
  const colorMap: Record<string, string> = {
    'BK': 'Negro', 'BLK': 'Negro',
    'BL': 'Azul',
    'BG': 'Rosa chicle',
    'CRBN': 'Carbon', 'R': 'Carbon',
    'DA': 'Negro Transparente',
    'CL': 'Blanco Transparente',
    'CO': 'Coral',
    'GD': 'Dorado',
    'GR': 'Verde',
    'GY': 'Gris', 'GRY': 'Gris',
    'GL': 'Gris Perla',
    'NL': 'Marrón',
    'NY': 'Azul Oscuro', 'NV': 'Azul Oscuro',
    'LB': 'Azul flojo',
    'PK': 'Rosa',
    'PU': 'Violeta',
    'OR': 'Naranja',
    'RED': 'Rojo', 'RD': 'Rojo',
    'SILVER': 'Plata', 'SL': 'Plata', 'SV': 'Plata',
    'YE': 'Amarillo', 'YL': 'Amarillo',
    'VI': 'Violeta',
    'WH': 'Blanco'
  };

  return colorMap[originColor] || 'Color desconocido'; // Provide a fallback
};

export const newChangeSize = (originSize: string): string => {
  const sizeMap: Record<string, string> = {
    '2 - 4': '32-34', 
    '2': '32-34',
    '5 - 8': '37-39',
    '9 - 12': '40-42',
    '4 - 6': '35-37',
    '2730': '27-30',
    '2734': '27-34',
    '2932': '29-32',
    '3336': '33-36',
    '3538': '35-38',
    '3740': '37-40',
    '34': '34',
    '35': '35',
    '36': '36',
    '36 - 38': '36-38',
    '37': '37', '5': '37',
    '38': '38',
    '6': '38-39',
    '39': '39',
    '39 - 41': '39-41',
    '40': '40', '7': '40',
    '405': '40.5',
    '41': '41', '8': '41',
    '415': '41.5',
    '42': '42', '9': '42',
    '42 - 44': '42-44',
    '425': '42.5',
    '43': '43', '10': '43',
    '435': '43.5',
    '44': '44', '11': '44',
    '445': '44.5',
    '45': '45', '12': '45',
    '45 - 47': '45-47',
    '46': '46', '13': '46',
    '47': '47',
    '48': '48',
    'JR': 'Junior',
    'XXL': 'DobleExtraLargo',
    'XXXL': 'TripleExtraLargo',
    'XL': 'ExtraLargo',
    'L': 'Largo',
    'M': 'Medium',
    'S': 'Small',
    'XS': 'ExtraSmall',
    'XXS': 'DobleExtraSmall',
    '72': '72mm',
    '80': '80mm',
    '76': '76mm',
    '100': '100mm',
    '110': '110mm',
    '125': '125mm',
    'undefined': '',
  };

  return sizeMap[originSize] || 'Tamaño desconocido'; // Provide a fallback
};

export function newExtractColor(reference: string) {
  const validColors = new Set([
    'BK', 'BL', 'WH', 'R', 'RED', 'BLK', 'GW', 'YE', 'PK', 'GR', 'RD', 
    'VI', 'GY', 'NA', 'PU', 'OR', 'CO', 'SL', 'YL', 'DA'
  ]);

  const colorParts = reference.split('-').reverse(); // Reverse to check last-first order

  for (const part of colorParts) {
    if (validColors.has(part)) {
      return newChangeColor(part);
    }
  }
}

export function newExtractCSizes(reference) {
  const validSizes = new Set([
    'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL',
    '2730', '3134', '3740', '3336', '2734', '34', '35', '3538', '2932',
    '36', '37', '38', '39', '40', '41', '355', '365', '375', '385', '395',
    '405', '415', '425', '435', '445', '42', '43', '44', '45', '46', '47', '48',
    '72', '76', '80', '100', '110', '125', '202', 'MER',
    '4', '6', '8', '12', '17', '170', '18', '180'
  ]);

  const sizesTemp = reference.split('-');

  for (let i = sizesTemp.length - 1; i >= 0; i--) {
    const size = sizesTemp[i].trim();
    if (validSizes.has(size)) {
      return newChangeSize(size);
    }
  }

  return newChangeSize('undefined');
}