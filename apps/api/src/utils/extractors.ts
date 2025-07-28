const SIZE_TOKEN = /(?:^|[-])(XS|S|M|L|XL|XXL|XXXL|\d{1,4}(?:\s?-\s?\d{1,4})?)(?:$|[-])/;
const COLOR_TOKEN = /(?:^|[-])(BK|BLK|BL|GY|WH|PK|RD|RED|YE|YL|GR|PU|VI|OR|CO|SL|DA)(?:$|[-])/;

export const COLOR_MAP: Record<string, string> = {
  BK: 'Negro',
  BLK: 'Negro',
  BL: 'Azul',
  BG: 'Rosa chicle',
  CRBN: 'Carbon',
  R: 'Carbon',
  DA: 'Negro Transparente',
  CL: 'Blanco Transparente',
  CO: 'Coral',
  GD: 'Dorado',
  GR: 'Verde',
  GY: 'Gris',
  GRY: 'Gris',
  GL: 'Gris Perla',
  NL: 'Marrón',
  NY: 'Azul Oscuro',
  NV: 'Azul Oscuro',
  LB: 'Azul flojo',
  PK: 'Rosa',
  PU: 'Violeta',
  OR: 'Naranja',
  RED: 'Rojo',
  RD: 'Rojo',
  SILVER: 'Plata',
  SL: 'Plata',
  SV: 'Plata',
  YE: 'Amarillo',
  YL: 'Amarillo',
  VI: 'Violeta',
  WH: 'Blanco',
};

export const changeColor = (originColor: string): string => {
  return COLOR_MAP[originColor] ?? originColor;
};

export const SIZE_MAP: Record<string, string> = {
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
  '37': '37',
  '5': '37',
  '38': '38',
  '6': '38-39',
  '39': '39',
  '39 - 41': '39-41',
  '40': '40',
  '7': '40',
  '405': '40.5',
  '41': '41',
  '8': '41',
  '415': '41.5',
  '42': '42',
  '9': '42',
  '42 - 44': '42-44',
  '425': '42.5',
  '43': '43',
  '10': '43',
  '435': '43.5',
  '44': '44',
  '11': '44',
  '445': '44.5',
  '45': '45',
  '12': '45',
  '45 - 47': '45-47',
  '46': '46',
  '13': '46',
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
  '76': '76mm',
  '80': '80mm',
  '100': '100mm',
  '110': '110mm',
  '125': '125mm',
  'undefined': '',
};

export const changeSize = (originSize: string): string => {
  return SIZE_MAP[originSize] ?? originSize;
};

export const extractSize = (ref: string) =>
  changeSize((ref.match(SIZE_TOKEN)?.[1] ?? '').replace(/\s+/g, ' '));

export const extractColor = (ref: string) =>
  changeColor(ref.match(COLOR_TOKEN)?.[1] ?? '');
