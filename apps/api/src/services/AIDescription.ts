import { OpenAI } from "openai/index.mjs";
import dotenv from "dotenv";

import { ProductDocument } from '@/models/product';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function AIDescription(product: ProductDocument): Promise<string> {
  // ------------------------------
  // Prepare product details
  // ------------------------------
  const colors = product.variations?.map(v => v.color).join(', ') || 'N/A';
  const sizes = product.variations
    ?.flatMap(v => v.sizes.map(s => s.size))
    .join(', ') || 'N/A';

  const price = product.price?.pv ?? 'N/A';
  const stock = product.stock ?? 'N/A';
  const brand = product.brand ?? 'Unknown';
  const reference = product.reference;

  const prompt = `
Write a compelling product description using the following details:
- Brand: ${brand}
- Reference: ${reference}
- EAN: ${product.ean13}
- Price: ${price}
- Stock: ${stock}
- Colors: ${colors}
- Sizes: ${sizes}

Make it natural, persuasive, and ready for an e-commerce product page.
`;

  // ------------------------------
  // 1. Try OpenAI GPT-4
  // ------------------------------
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 200,
    });

    const description = response.choices[0]?.message?.content?.trim();
    if (description) return description;
  } catch (err) {
    console.warn("⚠️ OpenAI failed, falling back to HuggingFace:", err);
  }

  // ------------------------------
  // 2. Fallback: Hugging Face Mistral v0.3
  // ------------------------------
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `Generate a product description for: ${brand} ${reference}`,
          parameters: {
            max_length: 150,
            temperature: 0.7,
          },
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      // Handle both possible HuggingFace response formats
      if (Array.isArray(data) && data[0]?.generated_text) {
        return data[0].generated_text.trim();
      } else if (data.generated_text) {
        return data.generated_text.trim();
      } else {
        console.warn("⚠️ Unexpected HuggingFace response format:", data);
      }
    } else {
      console.warn("⚠️ HuggingFace API error:", response.status, response.statusText);
    }
  } catch (err) {
    console.error("❌ HuggingFace failed:", err);
  }

  // ------------------------------
  // 3. Final hardcoded fallback
  // ------------------------------
  return `Premium ${brand} ${reference} with excellent quality and design.`;
}
