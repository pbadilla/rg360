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

// Helper: create merged prompt
function createPrompt(product: ProductForDescription) {
  const brand = product.brand ?? "Unknown";
  const reference = product.reference ?? "N/A";
  const colors = Array.isArray(product.colors) ? product.colors.join(", ") : "N/A";
  const sizes = Array.isArray(product.sizes) ? product.sizes.join(", ") : "N/A";
  const price = typeof product.price === "number" ? product.price : "N/A";
  const stock = typeof product.stock === "number" ? product.stock : "N/A";

  return `
You are an expert e-commerce product data analyst and copywriter.

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
2. Write a compelling, natural, and persuasive product description (80-120 words) for an e-commerce page.
3. Extract and enrich key attributes (color, size, material, brand, style, unique features).
4. Suggest relevant product categories for an online shop.

Return the result as a JSON object with the fields:
{
  "name": "...",
  "description": "...",
  "attributes": { ... },
  "categories": ["...", "..."]
}
`;
}

// Global error log per call
let errorLog: string[] = [];

// Utility wrapper
async function safeRun<T>(name: string, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err: any) {
    const msg = err?.message || err;
    errorLog.push(`❌ ${name} failed: ${msg}`);
    console.warn(`⚠️ ${name} failed: ${msg}`);
    throw err;
  }
}

// JSON parser helper
function parseJSONSafe(text: string, fallback: ProductForDescription) {
  try {
    const parsed = JSON.parse(text);
    // Ensure fields exist
    return {
      name: parsed.name || fallback.reference || "Unknown Product",
      description: parsed.description || `Premium ${fallback.brand ?? "Unknown"} ${fallback.reference}`,
      attributes: parsed.attributes || { brand: fallback.brand, colors: fallback.colors, sizes: fallback.sizes },
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

// Provider functions
async function tryOpenAI(product: ProductForDescription): Promise<any> {
  if (!openai || (provider !== "auto" && provider !== "openai")) throw new Error("Skipped");
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
        if (!text) throw new Error("No text");
        return parseJSONSafe(text, product);
      });
    } catch {
      continue;
    }
  }
  throw new Error("All OpenAI models failed");
}

async function tryHuggingFace(product: ProductForDescription): Promise<any> {
  if (!hfKey || (provider !== "auto" && provider !== "hf")) throw new Error("Skipped");
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
        const text = Array.isArray(data as any) ? (data as any)[0]?.generated_text : (data as any).generated_text;
        if (!text) throw new Error("No text");
        return parseJSONSafe(text, product);
      });
    } catch {
      continue;
    }
  }
  throw new Error("All HuggingFace models failed");
}

async function tryCohere(product: ProductForDescription): Promise<any> {
  if (!cohere || (provider !== "auto" && provider !== "cohere")) throw new Error("Skipped");
  return safeRun("Cohere", async () => {
    const res = await cohere.chat({
      model: "command",
      message: createPrompt(product),
      temperature: 0.7,
      maxTokens: 300,
    });
    const text = (res as any)?.text?.trim();
    if (!text) throw new Error("No text");
    return parseJSONSafe(text, product);
  });
}

async function tryAI21(product: ProductForDescription): Promise<any> {
  if (!ai21Key || (provider !== "auto" && provider !== "ai21")) throw new Error("Skipped");
  return safeRun("AI21", async () => {
    const res = await fetch("https://api.ai21.com/studio/v1/j2-large/complete", {
      method: "POST",
      headers: { Authorization: `Bearer ${ai21Key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: createPrompt(product), maxTokens: 300 }),
    });
    const data = await res.json();
    const completions = Array.isArray((data as any)?.completions) ? (data as any).completions : [];
    const text = completions[0]?.data?.text || completions[0]?.text || "";
    if (!text) throw new Error("No text");
    return parseJSONSafe(text, product);
  });
}

async function tryDeepAI(product: ProductForDescription): Promise<any> {
  if (!deepAiKey || (provider !== "auto" && provider !== "deepai")) throw new Error("Skipped");
  return safeRun("DeepAI", async () => {
    const res = await fetch("https://api.deepai.org/api/text-generator", {
      method: "POST",
      headers: { "Api-Key": deepAiKey, "Content-Type": "application/json" },
      body: JSON.stringify({ text: createPrompt(product) }),
    });
    const data = (await res.json()) as { output?: string };
    if (!data.output) throw new Error("No text");
    return parseJSONSafe(data.output.trim(), product);
  });
}

// Main AI description function
export async function AIDescription(product: ProductForDescription): Promise<any> {
  errorLog = []; // reset per call
  const providers = [tryOpenAI, tryCohere, tryHuggingFace, tryAI21, tryDeepAI];

  for (const fn of providers) {
    try {
      const result = await fn(product);
      if (errorLog.length > 0) console.warn("⚠️ Some providers failed:\n" + errorLog.join("\n"));
      return result;
    } catch {
      continue;
    }
  }

  console.warn("❌ All providers failed:\n" + errorLog.join("\n"));
  return {
    name: product.reference ?? "Unknown Product",
    description: `Premium ${product.brand ?? "Unknown"} ${product.reference} with excellent quality and design. (Fallback text)`,
    attributes: { brand: product.brand, colors: product.colors, sizes: product.sizes },
    categories: [],
  };
}
