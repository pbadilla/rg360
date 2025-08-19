// Example of fetching products
const fetchProducts = async () => {
  const response = await fetch("https://your-api.com/products");
  const data = await response.json();
  extractColorAndSizes(data); // reusing your function
};

// Example of patching a product with new description
const patchProduct = async (productId: string, description: string) => {
  await fetch(`https://your-api.com/products/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });
};
