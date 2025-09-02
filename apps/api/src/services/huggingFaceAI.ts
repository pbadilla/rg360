import fetch from "node-fetch";

import { ProductForDescription } from "@/types/products";

export async function generateDescription(product: ProductForDescription): Promise<string> {
  const prompt = `
Write a compelling product description:
- Brand: ${product.brand}
- Reference: ${product.reference}
- EAN: ${product.ean13}
- Price: ${product.price}
- Stock: ${product.stock}
- Colors: ${product.colors.join(", ")}
- Sizes: ${product.sizes.join(", ")}

Make it natural, persuasive, and ready for an online store.
`;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY || process.env.HF_API_KEY || ''}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: 200, temperature: 0.7 }
      }),
    }
  );

  const data = await response.json();
  return data[0]?.generated_text?.trim() ?? "";
}
