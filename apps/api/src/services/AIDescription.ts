import { OpenAI } from "openai/index.mjs";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { CohereClient } from "cohere-ai";
import { ProductForDescription } from '@/types/products';

dotenv.config();

const provider = (process.env.AIDESC_PROVIDER || 'auto').toLowerCase();

// API Keys
const openaiApiKey = process.env.OPENAI_API_KEY;
const hfKey = process.env.HUGGINGFACE_API_KEY || process.env.HF_API_KEY || '';
const deepAiKey = process.env.DEEPAI_API_KEY || '';
const ai21Key = process.env.AI21_API_KEY || '';
const cohereKey = process.env.COHERE_API_KEY || '';

// Clients
const openai = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null;
const cohere = cohereKey ? new CohereClient({ token: cohereKey }) : null;

// Models
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

// Helper function to create the prompt
function createPrompt(product: ProductForDescription) {
  const brand = product.brand ?? 'Unknown';
  const reference = product.reference;
  const colors = Array.isArray(product.colors) ? product.colors.join(', ') : 'N/A';
  const sizes = Array.isArray(product.sizes) ? product.sizes.join(', ') : 'N/A';
  const price = typeof product.price === 'number' ? product.price : 'N/A';
  const stock = typeof product.stock === 'number' ? product.stock : 'N/A';

  return `
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
}

// Provider functions
async function tryHuggingFace(product: ProductForDescription): Promise<string> {
  if (!hfKey || (provider !== 'auto' && provider !== 'hf')) return Promise.reject();
  const brand = product.brand ?? 'Unknown';
  const reference = product.reference;
  const colors = Array.isArray(product.colors) ? product.colors.join(', ') : 'N/A';
  const sizes = Array.isArray(product.sizes) ? product.sizes.join(', ') : 'N/A';

  const requests = hfModels.map(hfModel => 
    fetch(`https://api-inference.huggingface.co/models/${hfModel}?wait_for_model=true`, {
      method: "POST",
      headers: { Authorization: `Bearer ${hfKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        inputs: `Generate a product description for: ${brand} ${reference} (${colors}, ${sizes}, Price: ${product.price}, Stock: ${product.stock})`,
        parameters: { max_new_tokens: 200, temperature: 0.7 },
        options: { wait_for_model: true, use_cache: true },
      }),
    })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => Array.isArray(data) ? data[0]?.generated_text : data.generated_text)
    .then(text => text?.trim() || Promise.reject("No text"))
    .catch(err => { console.warn("❌ HuggingFace failed:", hfModel, err); return Promise.reject(err); })
  );

  return Promise.any(requests);
}

async function tryDeepAI(product: ProductForDescription): Promise<string> {
  if (!deepAiKey || (provider !== 'auto' && provider !== 'deepai')) return Promise.reject();
  const text = `Write a product description for: ${product.brand ?? 'Unknown'} ${product.reference} (${product.colors?.join(', ') || 'N/A'}, ${product.sizes?.join(', ') || 'N/A'}, Price: ${product.price}, Stock: ${product.stock})`;

  try {
    const res = await fetch('https://api.deepai.org/api/text-generator', {
      method: 'POST',
      headers: { 'Api-Key': deepAiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    return data.output?.trim() || Promise.reject("No text");
  } catch (err) {
    console.warn("❌ DeepAI failed:", err);
    return Promise.reject(err);
  }
}

async function tryCohere(product: ProductForDescription): Promise<string> {
  if (!cohere || (provider !== 'auto' && provider !== 'cohere')) return Promise.reject();
  const prompt = createPrompt(product);
  try {
    const res = await cohere.chat({ model: 'command', message: prompt, temperature: 0.7, maxTokens: 200 });
    return (res as any).text?.trim() || Promise.reject("No text");
  } catch (err) {
    console.warn("❌ Cohere failed:", err);
    return Promise.reject(err);
  }
}

async function tryAI21(product: ProductForDescription): Promise<string> {
  if (!ai21Key || (provider !== 'auto' && provider !== 'ai21')) return Promise.reject();
  const prompt = createPrompt(product);
  try {
    const res = await fetch('https://api.ai21.com/studio/v1/j2-large/complete', {
      method: 'POST',
      headers: { Authorization: `Bearer ${ai21Key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, maxTokens: 200 }),
    });
    const data = await res.json();
    return data.completions?.[0]?.data?.text?.trim() || Promise.reject("No text");
  } catch (err) {
    console.warn("❌ AI21 failed:", err);
    return Promise.reject(err);
  }
}

async function tryOpenAI(product: ProductForDescription): Promise<string> {
  if (!openai || (provider !== 'auto' && provider !== 'openai')) return Promise.reject();
  const prompt = createPrompt(product);

  const requests = openaiModels.map(model =>
    openai.chat.completions.create({ model, messages: [{ role: "user", content: prompt }], temperature: 0.7, max_tokens: 200 })
      .then(res => res.choices?.[0]?.message?.content?.trim() || Promise.reject("No text"))
      .catch(err => {
        console.warn(`⚠️ OpenAI model ${model} failed:`, err);
        return Promise.reject(err);
      })
  );

  return Promise.any(requests);
}

// Main function
export async function AIDescription(product: ProductForDescription): Promise<string> {
  const providers = [
    tryHuggingFace,
    tryDeepAI,
    tryCohere,
    tryAI21,
    tryOpenAI
  ];

  try {
    return await Promise.any(providers.map(fn => fn(product)));
  } catch {
    return `Premium ${product.brand ?? 'Unknown'} ${product.reference} with excellent quality and design. (Fallback text)`;
  }
}
