import mongoose from 'mongoose';
import { ProductModel } from '@/models/product';
import config from '@/config/config';

// Tu lógica de mapeo (copiada tal cual del mensaje original)
const colorMap: Record<string, string> = {
  BK: 'Negro', BLK: 'Negro', BL: 'Azul', BG: 'Rosa chicle', CRBN: 'Carbon',
  R: 'Carbon', DA: 'Negro Transparente', CL: 'Blanco Transparente', CO: 'Coral',
  GD: 'Dorado', GR: 'Verde', GY: 'Gris', GRY: 'Gris', GL: 'Gris Perla', NL: 'Marrón',
  NY: 'Azul Oscuro', NV: 'Azul Oscuro', LB: 'Azul flojo', PK: 'Rosa', PU: 'Violeta',
  OR: 'Naranja', RED: 'Rojo', RD: 'Rojo', SILVER: 'Plata', SL: 'Plata',
  SV: 'Plata', YE: 'Amarillo', YL: 'Amarillo', VI: 'Violeta', WH: 'Blanco',
};

const sizeMap: Record<string, string> = {
  '2': '32-34', '2 - 4': '32-34', '5 - 8': '37-39', '9 - 12': '40-42',
  '4 - 6': '35-37', '2730': '27-30', '2734': '27-34', '2932': '29-32',
  '3336': '33-36', '3538': '35-38', '3740': '37-40', '34': '34', '35': '35',
  '36': '36', '36 - 38': '36-38', '37': '37', '5': '37', '38': '38',
  '6': '38-39', '39': '39', '39 - 41': '39-41', '40': '40', '7': '40',
  '405': '40.5', '41': '41', '8': '41', '415': '41.5', '42': '42', '9': '42',
  '42 - 44': '42-44', '425': '42.5', '43': '43', '10': '43', '435': '43.5',
  '44': '44', '11': '44', '445': '44.5', '45': '45', '12': '45', '45 - 47': '45-47',
  '46': '46', '13': '46', '47': '47', '48': '48', 'JR': 'Junior',
  'XXL': 'DobleExtraLargo', 'XXXL': 'TripleExtraLargo', 'XL': 'ExtraLargo',
  'L': 'Largo', 'M': 'Medium', 'S': 'Small', 'XS': 'ExtraSmall',
  'XXS': 'DobleExtraSmall', '72': '72mm', '76': '76mm', '80': '80mm',
  '100': '100mm', '110': '110mm', '125': '125mm', undefined: '',
};

const colorCodes = new Set([
  'BK', 'BL', 'WH', 'R', 'RED', 'GY', 'BLK', 'GW', 'YE', 'PK',
  'GR', 'RD', 'VI', 'NA', 'PU', 'OR', 'CO', 'YL', 'DA', 'SL'
]);

const validSizes = new Set(Object.keys(sizeMap));

const changeColor = (originColor: string): string | undefined => colorMap[originColor];
const changeSize = (originSize: string): string | undefined => sizeMap[originSize];

function findValidSize(parts: string[]) {
  return parts.find((part) => validSizes.has(part));
}

function extractColor(reference: string | undefined | null): string | undefined {
  if (!reference || typeof reference !== 'string') return undefined;
  const parts = reference.split('-').reverse();
  for (const part of parts) {
    if (colorCodes.has(part)) {
      return changeColor(part);
    }
  }
}

function extractCSizes(reference: string): string | undefined {
  if (!reference) return changeSize('undefined');
  const parts = reference.split('-');
  const found = findValidSize(parts);
  return found ? changeSize(found) : changeSize('undefined');
}

// ------------------------------------------------------
// 🔁 Clasificación y actualización de productos
// ------------------------------------------------------
async function classifyAndUpdateProducts() {
  try {
    await mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' });
    console.log('✅ Conectado a MongoDB'  );

    const products = await ProductModel.find();

    const bulkOps = products.map(product => {
      const group = product.brand?.toLowerCase().trim() || 'sin-marca';
      const color = extractColor(product.reference);
      const size = extractCSizes(product.reference);

      return {
        updateOne: {
          filter: { _id: product._id },
          update: {
            $set: {
              group,
              color,
              size
            }
          }
        }
      };
    });

    if (bulkOps.length > 0) {
      const result = await ProductModel.bulkWrite(bulkOps);
      console.log(`✅ Productos actualizados: ${result.modifiedCount}`);
    } else {
      console.log('No se encontraron productos para actualizar.');
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error al clasificar productos:', error);
  }
}

classifyAndUpdateProducts();
