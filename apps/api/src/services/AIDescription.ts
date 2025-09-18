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

// Helper: create prompt
function createPrompt(product: ProductForDescription) {
  const brand = product.brand ?? "Unknown";
  const reference = product.reference;
  const colors = Array.isArray(product.colors) ? product.colors.join(", ") : "N/A";
  const sizes = Array.isArray(product.sizes) ? product.sizes.join(", ") : "N/A";
  const price = typeof product.price === "number" ? product.price : "N/A";
  const stock = typeof product.stock === "number" ? product.stock : "N/A";

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

// Provider functions
async function tryOpenAI(product: ProductForDescription): Promise<string> {
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
          max_tokens: 200,
        });
        const text = res.choices?.[0]?.message?.content?.trim();
        if (!text) throw new Error("No text");
        return text;
      });
    } catch {
      continue;
    }
  }
  throw new Error("All OpenAI models failed");
}

async function tryHuggingFace(product: ProductForDescription): Promise<string> {
  if (!hfKey || (provider !== "auto" && provider !== "hf")) throw new Error("Skipped");
  for (const hfModel of hfModels) {
    try {
      return await safeRun(`HuggingFace(${hfModel})`, async () => {
        const res = await fetch(`https://api-inference.huggingface.co/models/${hfModel}?wait_for_model=true`, {
          method: "POST",
          headers: { Authorization: `Bearer ${hfKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            inputs: createPrompt(product),
            parameters: { max_new_tokens: 200, temperature: 0.7 },
            options: { wait_for_model: true, use_cache: true },
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const text = Array.isArray(data) ? data[0]?.generated_text : data.generated_text;
        if (!text) throw new Error("No text");
        return text.trim();
      });
    } catch {
      continue;
    }
  }
  throw new Error("All HuggingFace models failed");
}

async function tryCohere(product: ProductForDescription): Promise<string> {
  if (!cohere || (provider !== "auto" && provider !== "cohere")) throw new Error("Skipped");
  return safeRun("Cohere", async () => {
    const res = await cohere.chat({ model: "command", message: createPrompt(product), temperature: 0.7, maxTokens: 200 });
    const text = (res as any)?.text?.trim();
    if (!text) throw new Error("No text");
    return text;
  });
}

async function tryAI21(product: ProductForDescription): Promise<string> {
  if (!ai21Key || (provider !== "auto" && provider !== "ai21")) throw new Error("Skipped");
  return safeRun("AI21", async () => {
    const res = await fetch("https://api.ai21.com/studio/v1/j2-large/complete", {
      method: "POST",
      headers: { Authorization: `Bearer ${ai21Key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: createPrompt(product), maxTokens: 200 }),
    });
    const data = await res.json();
    const text = data?.completions?.[0]?.data?.text || data?.completions?.[0]?.text || "";
    if (!text) throw new Error("No text");
    return text;
  });
}

async function tryDeepAI(product: ProductForDescription): Promise<string> {
  if (!deepAiKey || (provider !== "auto" && provider !== "deepai")) throw new Error("Skipped");
  return safeRun("DeepAI", async () => {
    const res = await fetch("https://api.deepai.org/api/text-generator", {
      method: "POST",
      headers: { "Api-Key": deepAiKey, "Content-Type": "application/json" },
      body: JSON.stringify({ text: createPrompt(product) }),
    });
    const data = await res.json();
    if (!data.output) throw new Error("No text");
    return data.output.trim();
  });
}

// Main AI description function
export async function AIDescription(product: ProductForDescription): Promise<string> {
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
  return `Premium ${product.brand ?? "Unknown"} ${product.reference} with excellent quality and design. (Fallback text)`;
}
