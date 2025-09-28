import { Product } from "@/types/product";

type CategoryMapping = Record<string, string[]>;

// --- Step 1: Raw mappings as [key, category] pairs ---
const rawMappings: [string, string][] = [
  // COMPONENTES Y RECAMB
  ['WIFM', 'componentes-y-recamb'],
  ['ABR', 'componentes-y-recamb'],
  ['AGR', 'componentes-y-recamb'],
  ['ALN', 'componentes-y-recamb'],
  ['AXL', 'componentes-y-recamb'],
  ['BRK', 'componentes-y-recamb'],
  ['BUK', 'componentes-y-recamb'],
  ['CKIT', 'componentes-y-recamb'],
  ['CUF', 'componentes-y-recamb'],
  ['FRLAC', 'componentes-y-recamb'],
  ['FRABR', 'componentes-y-recamb'],
  ['FRAXL', 'componentes-y-recamb'],
  ['FRBUK', 'componentes-y-recamb'],
  ['FRCKIT', 'componentes-y-recamb'],
  ['FRCUF', 'componentes-y-recamb'],
  ['FRDST', 'componentes-y-recamb'],
  ['FRLAD', 'componentes-y-recamb'],
  ['FRLIN', 'componentes-y-recamb'],
  ['FRPWST', 'componentes-y-recamb'],
  ['FRSTRP', 'componentes-y-recamb'],
  ['FRWC', 'componentes-y-recamb'],
  ['INS', 'componentes-y-recamb'],
  ['LIN', 'componentes-y-recamb'],
  ['SABR', 'componentes-y-recamb'],
  ['SCRW', 'componentes-y-recamb'],
  ['SH', 'componentes-y-recamb'],
  ['SPA', 'componentes-y-recamb'],
  ['SSPL', 'componentes-y-recamb'],
  ['WHR', 'componentes-y-recamb'],
  ['FRSCRW', 'componentes-y-recamb'],
  ['LUSTRP', 'componentes-y-recamb'],
  ['FRSPL', 'componentes-y-recamb'],
  ['FRSPA', 'componentes-y-recamb'],
  ['LUSCRW', 'componentes-y-recamb'],

  // RUEDAS
  ['FRWL', 'ruedas'],
  ['GY', 'ruedas'],
  ['GYWL', 'ruedas'],
  ['LUWL', 'ruedas'],
  ['WIWL', 'ruedas'],
  ['EOWL', 'ruedas'],
  ['SWL', 'ruedas'],

  // RODAMIENTOS
  ['FRBRG', 'rodamientos'],
  ['SON', 'rodamientos'],
  ['son', 'rodamientos'],

  // GUIAS Y PLACAS
  ['OYFM', 'guias-y-placas'],
  ['SFM', 'guias-y-placas'],
  ['SIC', 'guias-y-placas'],
  ['FRFM', 'guias-y-placas'],
  ['FLFM', 'guias-y-placas'],
  ['LUFM', 'guias-y-placas'],
  ['EOFM', 'guias-y-placas'],

  // PATINES
  ['SSK', 'patines'],
  ['FRSK', 'patines'],
  ['FRSK', 'junior'],
  ['THSK', 'patines'],
  ['21SSK', 'patines'],
  ['22SSK', 'patines'],
  ['22SSK', 'slalom'],
  ['21FRSK', 'patines'],
  ['22FRSK', 'patines'],
  ['23SSK', 'patines'],
  ['22FRSKB', 'patines'],
  ['22FRSKB', 'freeskate'],
  ['23FRSK', 'patines'],
  ['23FRSK', 'slalom'],
  ['20SSK', 'patines'],

  // FREESKATE
  ['FRSKB', 'freeskate'],
  ['LUSK', 'freeskate'],

  // PROTECCIONES
  ['PRO', 'protecciones'],

  // MOCHILAS Y BOLSAS
  ['SBG', 'mochilas-y-bolsas'],
  ['FRBG', 'mochilas-y-bolsas'],

  // ACCESORIOS TEXTIL
  ['FRSO', 'accesorios-textil'],
  ['FRSO', 'calcetines'],
  ['SSSB', 'accesorios-textil'],
  ['SSSB', 'calcetines'],
  ['STS', 'accesorios-textil'],
  ['STS', 'camisetas'],
  ['TSM', 'accesorios-textil'],
  ['TSM', 'camisetas'],
  ['TSW', 'accesorios-textil'],
  ['TSW', 'camisetas'],
  ['FRWR', 'accesorios-textil'],
  ['LUWR', 'accesorios-textil'],
  ['LUWR', 'camisetas'],
  ['EOLYC', 'accesorios-textil'],

  // CASCOS
  ['CASCOS', 'cascos'],

  // GUANTES
  ['GUANTES', 'guantes'],

  // ACCESORIOS
  ['CON', 'accesorios'],
  ['CONDD', 'accesorios'],
  ['FOLIN', 'accesorios'],
  ['FRLACM', 'accesorios'],
  ['FRCON', 'accesorios'],
  ['FRKH', 'accesorios'],
  ['FRLYC', 'accesorios'],
  ['FRWLPAK', 'accesorios'],
  ['SSH', 'accesorios'],
  ['THAC', 'accesorios'],
  ['FRBRK', 'accesorios'],
  ['FDSTBL', 'accesorios'],
  ['FRWSH', 'accesorios'],
  ['PR', 'accesorios'],
  ['21FRSKB', 'accesorios'],
  ['son', 'accesorios'],
  ['INT', 'accesorios'],
  ['LUSC', 'accesorios'],
  ['SBKP', 'accesorios'],
  ['LUWB', 'accesorios'],
  ['ALND', 'accesorios'],
  ['LUAXL', 'accesorios'],
  ['LUBUK', 'accesorios'],
  ['OYAXL', 'accesorios'],
  ['FRTO', 'accesorios'],
  ['EOBRK', 'accesorios'],
  ['EOLAC', 'accesorios'],
  ['LUSLD', 'accesorios'],

  // BOTINES
  ['INT', 'botines'],
];

// --- Step 2: Reduce and merge duplicates ---
export const categoryMapping: CategoryMapping = rawMappings.reduce((acc, [key, category]) => {
  if (!acc[key]) acc[key] = [];
  if (!acc[key].includes(category)) acc[key].push(category);
  return acc;
}, {} as CategoryMapping);

// --- Helper: Get categories from MOTHER REF ---
export function getCategoriesFromMotherRef(motherRef: string): string[] {
  if (!motherRef) return ['unknown'];
  const prefix = motherRef.split('-')[0].toUpperCase();
  return categoryMapping[prefix] || ['unknown'];
}

// --- Helper: Get primary category ---
export function getCategoryFromMotherRef(motherRef: string): string {
  return getCategoriesFromMotherRef(motherRef)[0];
}

// // --- Enhanced: Categorize product with fallback strategies ---
// export function categorizeProduct(product: Product): string[] {
//   const motherRef = product['MOTHER REF'] || product.motherRef || '';
//   const productName = (product['PRODUCT DESCRIPTION'] || product.name || '').toLowerCase();
//   const brand = (product['BRAND'] || product.brand || '').toLowerCase();

//   // Primary categories from MOTHER REF
//   let categories = getCategoriesFromMotherRef(motherRef);

//   // Fallback if unknown
//   if (categories.includes('unknown')) {
//     const fallbackCategories: string[] = [];

//     const addCategory = (cat: string) => {
//       if (!fallbackCategories.includes(cat)) fallbackCategories.push(cat);
//     };

//     // Keywords in product name
//     if (productName.match(/patin|skate/)) {
//       if (productName.includes('junior')) addCategory('junior');
//       if (productName.includes('freeskate')) addCategory('freeskate');
//       if (productName.includes('slalom')) addCategory('slalom');
//       if (fallbackCategories.length === 0) addCategory('patines');
//     }
//     if (productName.match(/rueda|wheel/)) addCategory('ruedas');
//     if (productName.match(/rodamiento|bearing/)) addCategory('rodamientos');
//     if (productName.match(/guia|frame/)) addCategory('guias-y-placas');
//     if (productName.match(/proteccion|protection/)) addCategory('protecciones');
//     if (productName.match(/mochila|backpack/)) addCategory('mochilas-y-bolsas');
//     if (productName.match(/casco|helmet/)) addCategory('cascos');
//     if (productName.match(/guante|glove/)) addCategory('guantes');
//     if (productName.match(/calcetin|sock/)) addCategory('calcetines');
//     if (productName.match(/camiseta|shirt/)) addCategory('camisetas');

//     // Brand-based fallback
//     if (fallbackCategories.length === 0) {
//       if (brand.includes('wizard')) addCategory('componentes-y-recamb');
//       if (brand.includes('seba')) addCategory('patines');
//       if (brand.includes('fr')) addCategory('patines');
//       if (brand.includes('them')) addCategory('patines');
//     }

//     // Merge fallback categories (deduplicated)
//     if (fallbackCategories.length > 0) {
//       categories = [...new Set(fallbackCategories)];
//     }
//   }

//   return categories;
// }

// // --- Primary category helper ---
// export function getPrimaryCategory(product: Product): string {
//   return categorizeProduct(product)[0];
// }
