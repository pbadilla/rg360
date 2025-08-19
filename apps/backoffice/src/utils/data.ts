import type { Product } from "@/types/stocks";

// Generate some initial dummy data for the stock manager
export const generateMockProducts = (): Product[] => {
  const categories = ["Electronics", "Clothing", "Food", "Books", "Toys"];
  const products: Product[] = [];

  for (let i = 1; i <= 15; i++) {
    const categoryIndex = Math.floor(Math.random() * categories.length);
    products.push({
      id: `product-${i}`,
      name: `Product ${i}`,
      description: `This is the description for product ${i}`,
      price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
      stock: Math.floor(Math.random() * 100),
      category: categories[categoryIndex],
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    });
  }

  return products;
};

export const getProductStats = (products: Product[]) => {
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const lowStockItems = products.filter((product) => product.stock < 10).length;
  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0,
  );

  const categoryCounts: Record<string, number> = {};
  products.forEach((product) => {
    if (categoryCounts[product.category]) {
      categoryCounts[product.category]++;
    } else {
      categoryCounts[product.category] = 1;
    }
  });

  return {
    totalProducts,
    totalStock,
    lowStockItems,
    totalValue,
    categoryCounts,
  };
};
