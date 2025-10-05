// services/AIDescription.ts
import { OpenAI } from "openai";
import fetch from "node-fetch";
import { CohereClient } from "cohere-ai";
import { ProductForDescription } from "@/types/products";

const provider = (process.env.AIDESC_PROVIDER || "auto").toLowerCase();

// API Keys
const openaiApiKey = process.env.OPENAI_API_KEY;
const hfKey = process.env.HUGGINGFACE_API_KEY || process.env.HF_API_KEY || "";
const deepAiKey = process.env.DEEPAI_API_KEY || "";
const ai21Key = process.env.AI21_API_KEY || "";
const cohereKey = process.env.COHERE_API_KEY || "";

// Clients
const openai = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null;
const cohere = cohereKey ? new CohereClient({ token: cohereKey }) : null;

// Models
const hfModels = [
  process.env.HF_MODEL || "HuggingFaceH4/zephyr-7b-beta",
  "mistralai/Mixtral-8x7B-Instruct-v0.1",
];

const openaiModels = [
  process.env.OPENAI_MODEL || "gpt-4o-mini",
  "gpt-4o",
  "gpt-4.1-mini",
  "gpt-3.5-turbo",
];

// --------- Helper: Create JSON-enforcing prompt ----------
function createPrompt(product: ProductForDescription) {
  const brand = product.brand ?? "Unknown";
  const reference = product.reference ?? "N/A";
  const colors = Array.isArray(product.colors) ? product.colors.join(", ") : "N/A";
  const sizes = Array.isArray(product.sizes) ? product.sizes.join(", ") : "N/A";
  const price = typeof product.price === "number" ? product.price : "N/A";
  const stock = typeof product.stock === "number" ? product.stock : "N/A";

  return `You are an expert e-commerce product copywriter.

Given the following product details:
- Brand: ${brand}
- Reference: ${reference}
- EAN: ${product.ean13}
- Price: ${price}
- Stock: ${stock}
- Colors: ${colors}
- Sizes: ${sizes}

Tasks:
1. Generate a concise and attractive product name.
2. Write a compelling, natural, persuasive product description (80-120 words) for e-commerce.
3. Extract key attributes (color, size, material, brand, style, unique features).
4. Suggest relevant product categories.

IMPORTANT: Return the result as valid JSON only, wrapped in triple backticks like this:
\`\`\`json
{
  "name": "...",
  "description": "...",
  "attributes": { "brand": "...", "colors": ["..."], "sizes": ["..."] },
  "categories": ["...", "..."]
}
No other text, explanation, or markdown.
`;
}

// --------- JSON parsing helper ----------
function parseJSONSafe(text: string, fallback: ProductForDescription) {
  try {
    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return {
      name: parsed.name || fallback.reference || "Unknown Product",
      description:
        parsed.description || `Premium ${fallback.brand ?? "Unknown"} ${fallback.reference}`,
      attributes:
        parsed.attributes || { brand: fallback.brand, colors: fallback.colors, sizes: fallback.sizes },
      categories: parsed.categories || [],
    };
  } catch {
    // fallback to minimal structure
    return {
      name: fallback.reference || "Unknown Product",
      description: text,
      attributes: { brand: fallback.brand, colors: fallback.colors, sizes: fallback.sizes },
      categories: [],
    };
  }
}

// --------- Safe execution wrapper ----------
async function safeRun<T>(name: string, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err: any) {
    console.warn(`⚠️ ${name} failed: ${err?.message || err}`);
    throw err;
  }
}

// --------- Provider functions ----------
async function tryOpenAI(product: ProductForDescription): Promise<any> {
  if (!openai || (provider !== "auto" && provider !== "openai")) throw new Error("Skipped OpenAI");
  for (const model of openaiModels) {
    try {
      return await safeRun(`OpenAI(${model})`, async () => {
        const res = await openai.chat.completions.create({
          model,
          messages: [
            { role: "system", content: "You are a product description generator for e-commerce." },
            { role: "user", content: createPrompt(product) },
          ],
          temperature: 0.7,
          max_tokens: 300,
        });
        const text = res.choices?.[0]?.message?.content?.trim();
        if (!text) throw new Error("No text returned");
        return parseJSONSafe(text, product);
      });
    } catch {
      continue;
    }
  }
  throw new Error("All OpenAI models failed");
}

async function tryHuggingFace(product: ProductForDescription): Promise<any> {
  if (!hfKey || (provider !== "auto" && provider !== "hf")) throw new Error("Skipped HF");
  for (const hfModel of hfModels) {
    try {
      return await safeRun(`HuggingFace(${hfModel})`, async () => {
        const res = await fetch(`https://api-inference.huggingface.co/models/${hfModel}?wait_for_model=true`, {
          method: "POST",
          headers: { Authorization: `Bearer ${hfKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            inputs: createPrompt(product),
            parameters: { max_new_tokens: 300, temperature: 0.7 },
            options: { wait_for_model: true, use_cache: true },
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const text = Array.isArray(data) ? data[0]?.generated_text : (data as any).generated_text;
        if (!text) throw new Error("No text returned");
        return parseJSONSafe(text, product);
      });
    } catch {
      continue;
    }
  }
  throw new Error("All HuggingFace models failed");
}

async function tryCohere(product: ProductForDescription): Promise<any> {
  if (!cohere || (provider !== "auto" && provider !== "cohere")) throw new Error("Skipped Cohere");
  return safeRun("Cohere", async () => {
    const res = await cohere.chat({
      model: "command",
      message: createPrompt(product),
      temperature: 0.7,
      maxTokens: 300,
    });
    const text = (res as any)?.text?.trim();
    if (!text) throw new Error("No text returned");
    return parseJSONSafe(text, product);
  });
}

// --------- Main AI description function ----------
export async function AIDescription(product: ProductForDescription): Promise<any> {
  const providers = [tryOpenAI, tryCohere, tryHuggingFace];

  for (const fn of providers) {
    try {
      return await fn(product);
    } catch {
      continue;
    }
  }

  // Fallback if all providers fail
  console.warn(`❌ All AI providers failed for product: ${product.ean13}`);
  return {
    name: product.reference ?? "Unknown Product",
    description: `Premium ${product.brand ?? "Unknown"} ${product.reference} with excellent quality.`,
    attributes: { brand: product.brand, colors: product.colors, sizes: product.sizes },
    categories: [],
  };
}
