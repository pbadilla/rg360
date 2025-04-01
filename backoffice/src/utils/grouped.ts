import _ from 'lodash';
import { newExtractCSizes, newExtractColor, newFindDiff } from '@/utils/utils';

export function sizesAndColorOfProducts(allReferences: any[]) {
  const products: any[] = [];

  allReferences.forEach((item, index) => {
    if (item.refmere) {
      const compareString = newFindDiff(item.refmere, item.reference);
      const color = newExtractColor(compareString as string);
      const size = newExtractCSizes(compareString as string);

      products.push({
        ...item,
        id: index,
        color,
        size,
        ean13: JSON.stringify(item.ean),
        description: '',
        stock: item.stock === 0 ? null : item.stock,
        pvp: parseFloat((item.prix * 2.01).toFixed(2)),
        active: 0,
      });
    }
  });

  const grouped = _.groupBy(products, 'refmere');
  const productsList = Object.values(grouped).map((group) => group[0]); 

  return {
    allColors: products.map((p) => p.color),
    allSizes: products.map((p) => p.size),
    grouped,
    productsList,
  };
}
