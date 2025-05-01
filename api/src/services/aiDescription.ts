import { OpenAI } from "openai";
import { Product } from "@/types/product";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateDescription(product: Product): Promise<string> {
  const prompt = `
Write a compelling product description using the following details:
- Brand: ${product.brand}
- Reference: ${product.reference}
- EAN: ${product.ean}
- Price: ${product.price}
- Stock: ${product.stock}
- Colors: ${product.colors}
- Sizes: ${product.sizes}

Make it natural, persuasive, and ready for an e-commerce product page.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 200,
  });

  return response.choices[0]?.message?.content?.trim() ?? "";
}
