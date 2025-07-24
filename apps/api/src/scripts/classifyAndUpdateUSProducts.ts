import config from '../config/config.js';
import mongoose from 'mongoose';

interface Product {
  _id: mongoose.Types.ObjectId;
  brand?: string;
  reference?: string;
  parentReference?: string;
  colors?: string[];
}

// Modelo Mongoose (ajustado)
const productSchema = new mongoose.Schema({
  brand: String,
  reference: String,
  parentReference: String,
  colors: [String],
  group: String,
  // otros campos si quieres
});
const ProductModel = mongoose.model<Product & mongoose.Document>('Product', productSchema);

// Ya no usaremos extractColor porque tenemos el array colors directo

async function classifyAndUpdateProducts() {
  try {
    console.log('🔄 Iniciando clasificación y actualización de productos...');
    await mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' });
    console.log('✅ Conectado a MongoDB');

    const products: Product[] = await ProductModel.find().exec();

    const bulkOps = products.map(product => {
      // Default brand
      const brand = product.brand?.toLowerCase().trim() || 'sin-marca';
      // Parent reference
      const parentRef = product.parentReference?.toLowerCase().trim() || 'sin-parent';
      // Colors concatenados separados por guion o 'sin-color' si vacío
      const colorsStr = (product.colors && product.colors.length > 0)
        ? product.colors.map(c => c.toLowerCase().trim()).join('-')
        : 'sin-color';

      // Construir grupo compuesto
      const group = `${brand}_${parentRef}_${colorsStr}`;

      // Preparar la actualización solo con group
      return {
        updateOne: {
          filter: { _id: product._id },
          update: { $set: { group } },
        }
      };
    });

    const bulkOpsNonNull = bulkOps.filter(op => op !== null);

    console.log(`Operaciones válidas para bulkWrite: ${bulkOpsNonNull.length}`);

    if (bulkOpsNonNull.length > 0) {
      const result = await ProductModel.bulkWrite(bulkOpsNonNull);
      console.log(`✅ Productos actualizados: ${result.modifiedCount}`);
    } else {
      console.log('No hay operaciones para actualizar.');
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error al clasificar productos:', error);
  }
}

classifyAndUpdateProducts();
