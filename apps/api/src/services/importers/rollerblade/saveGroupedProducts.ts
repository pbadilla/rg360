import { ProductModel } from '@/models/product';
import { groupedProductToMongoDoc } from '@/utils/groupedProductToMongoDoc';
import { GroupedProduct } from '@/types/products';

export async function saveGroupedProducts(grouped: GroupedProduct[]) {
  for (const groupedItem of grouped) {
    const mongoDoc = groupedProductToMongoDoc(groupedItem); // <--- HERE
    await ProductModel.findOneAndUpdate(
      { reference: groupedItem.reference },
      { $set: mongoDoc },
      { upsert: true, new: true }
    );
  }
}
