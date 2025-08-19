const generateDescription = async (product: any) => {
  const prompt = `Generate a catchy product description for a product with the following attributes:
  - Name: ${product.name}
  - Color: ${product.color}
  - Size: ${product.size}
  - Category: ${product.category}
  `;

  const response = await fetch("https://your-ai-endpoint.com/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const result = await response.json();
  return result.description;
};
