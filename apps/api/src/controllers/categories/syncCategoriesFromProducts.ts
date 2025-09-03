import { CategoryModel } from '@/models/category';
import { ProductModel } from '@/models/product';
import type { ProductDocument } from '@/models/product';

const syncCategoriesFromProducts = async () => {
  try {
    // 1. Fetch all products
    const products = await ProductModel.find();

    // 2. Extract unique categories (by name)
    const categoryNames = Array.from(
      new Set(
        products
          .map((p: ProductDocument) => p.category?.name)
          .filter((name): name is string => Boolean(name))
      )
    );

    // 3. Insert or update categories in DB
    for (const name of categoryNames) {
      const id = name; // Use the plain category name as ID

      await CategoryModel.updateOne(
        { id },                     // search by id
        { name, updatedAt: new Date() }, // update name
        { upsert: true }            // insert if doesn't exist
      );
    }

    console.log('Categories synced successfully!');
  } catch (error) {
    console.error('Error syncing categories:', error);
  }
};


export default syncCategoriesFromProducts;
