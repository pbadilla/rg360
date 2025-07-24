import mongoose from 'mongoose';
import config from '../config/config.js';
import { ProductSchema, ProductDocument } from '../models/product.js';

const ProductModel = mongoose.models.Product || mongoose.model<ProductDocument>('Product', ProductSchema);

const ProductGroupSchema = new mongoose.Schema({}, { strict: false });
const ProductGroupModel = mongoose.models.ProductGroup || mongoose.model('ProductGroup', ProductGroupSchema);

async function pipeAgregationJob_US() {
  try {
    console.log('Conectando a MongoDB...');
    await mongoose.connect(config.mongo.url);
    console.log('Conectado a MongoDB');

    const pipeline = [
      { $match: { status: 'active' } },
      {
        $group: {
          _id: {
            parentReference: '$parentReference',
            color: { $arrayElemAt: ['$colors', 0] },
            group: '$group',
          },
          products: { $push: '$$ROOT' },
          sizes: { $addToSet: { $arrayElemAt: ['$sizes', 0] } },
          stockTotal: { $sum: '$stock' },
          priceMin: { $min: '$price.pvp' },
          priceMax: { $max: '$price.pvp' },
        },
      },
      {
        $project: {
          _id: 0,
          parentReference: '$_id.parentReference',
          color: '$_id.color',
          group: '$_id.group',
          sizes: 1,
          stockTotal: 1,
          priceRange: { min: '$priceMin', max: '$priceMax' },
          productsCount: { $size: '$products' },
        },
      },
    ];

    console.log('Ejecutando pipeline de agregación...');
    const results = await ProductModel.aggregate(pipeline).exec();

    console.log(`Pipeline terminado, procesando ${results.length} grupos para actualizar...`);

    await Promise.all(
      results.map(doc =>
        ProductGroupModel.updateOne(
          { parentReference: doc.parentReference, color: doc.color, group: doc.group },
          { $set: doc },
          { upsert: true }
        )
      )
    );

    console.log('Todos los grupos actualizados correctamente.');

  } catch (error) {
    console.error('Error en el job de agregación:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  }
}


export { pipeAgregationJob_US };
