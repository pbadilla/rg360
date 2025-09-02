import { OpenAI } from "openai/index.mjs";
import dotenv from "dotenv";
import { ProductForDescription } from '@/types/products';
import fetch from "node-fetch";
import { CohereClient } from "cohere-ai";

dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const openai = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null;
const provider = (process.env.AIDESC_PROVIDER || 'auto').toLowerCase();

const hfKey = process.env.HUGGINGFACE_API_KEY || process.env.HF_API_KEY || '';
const deepAiKey = process.env.DEEPAI_API_KEY || '';
const ai21Key = process.env.AI21_API_KEY || '';

const cohereKey = process.env.COHERE_API_KEY || '';
const cohere = cohereKey ? new CohereClient({ token: cohereKey }) : null;

const hfModels = [
  process.env.HF_MODEL || "mistralai/Mistral-7B-Instruct-v0.2",
  "tiiuae/falcon-7b-instruct",
  "openassistant/openassistant-7b"
];

const openaiModels = [
  process.env.OPENAI_MODEL || "gpt-4o-mini",
  "gpt-4",
  "gpt-3.5-turbo"
];

export async function AIDescription(product: ProductForDescription): Promise<string> {
  const brand = product.brand ?? 'Unknown';
  const reference = product.reference;
  const colors = Array.isArray(product.colors) ? product.colors.join(', ') : 'N/A';
  const sizes = Array.isArray(product.sizes) ? product.sizes.join(', ') : 'N/A';
  const price = typeof product.price === 'number' ? product.price : 'N/A';
  const stock = typeof product.stock === 'number' ? product.stock : 'N/A';

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
  // 1. HuggingFace (multiple models)
  // ------------------------------
  if ((provider === 'auto' || provider === 'hf') && hfKey) {
    for (const hfModel of hfModels) {
      try {
        const response = await fetch(`https://api-inference.huggingface.co/models/${hfModel}?wait_for_model=true`, {
          method: "POST",
          headers: { Authorization: `Bearer ${hfKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            inputs: `Generate a product description for: ${brand} ${reference} (${colors}, ${sizes}, Price: ${price}, Stock: ${stock})`,
            parameters: { max_new_tokens: 200, temperature: 0.7 },
            options: { wait_for_model: true, use_cache: true },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const text = Array.isArray(data) ? data[0]?.generated_text : data.generated_text;
          if (text) return text.trim();
        }
      } catch (err) { console.warn("❌ HuggingFace model failed:", hfModel, err); }
    }
  }

  // ------------------------------
  // 2. DeepAI
  // ------------------------------
  if ((provider === 'auto' || provider === 'deepai') && deepAiKey) {
    try {
      const response = await fetch('https://api.deepai.org/api/text-generator', {
        method: 'POST',
        headers: { 'Api-Key': deepAiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `Write a product description for: ${brand} ${reference} (${colors}, ${sizes}, Price: ${price}, Stock: ${stock})` }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.output) return data.output.trim();
      }
    } catch (err) { console.warn("❌ DeepAI failed:", err); }
  }

  // ------------------------------
  // 3. Cohere
  // ------------------------------
  if ((provider === 'auto' || provider === 'cohere') && cohere) {
    try {
      const response = await cohere.chat({
        model: 'command',
        message: prompt,
        temperature: 0.7,
        maxTokens: 200,
      });
      if ((response as any).text) return String((response as any).text).trim();
    } catch (err) { console.warn("❌ Cohere failed:", err); }
  }

  // ------------------------------
  // 4. AI21 Labs
  // ------------------------------
  if ((provider === 'auto' || provider === 'ai21') && ai21Key) {
    try {
      const response = await fetch('https://api.ai21.com/studio/v1/j2-large/complete', {
        method: 'POST',
        headers: { Authorization: `Bearer ${ai21Key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, maxTokens: 200 }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.completions?.[0]?.data?.text) return data.completions[0].data.text.trim();
      }
    } catch (err) { console.warn("❌ AI21 failed:", err); }
  }

  // ------------------------------
  // 5. OpenAI (multiple models)
  // ------------------------------
  if ((provider === 'auto' || provider === 'openai') && openai) {
    for (const model of openaiModels) {
      try {
        const response = await openai.chat.completions.create({
          model,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 200,
        });
        const description = response.choices?.[0]?.message?.content?.trim();
        if (description) return description;
      } catch (err: any) {
        if (err.code === 'insufficient_quota') continue;
        if (err.status === 429) continue;
        console.warn(`⚠️ OpenAI model ${model} failed:`, err);
      }
    }
  }

  // ------------------------------
  // 6. Final hardcoded fallback
  // ------------------------------
  return `Premium ${brand} ${reference} with excellent quality and design. (Fallback text)`;
}
