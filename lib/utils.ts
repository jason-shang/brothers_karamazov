import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getVoyageAIKey() {
  const isProductionEnv = process.env.PROD_VOYAGEAI_KEY !== undefined;
  const apiKey = isProductionEnv
    ? process.env.PROD_VOYAGEAI_KEY
    : process.env.DEV_VOYAGEAI_KEY;
  if (!apiKey) throw Error("Voyage AI key is not set");
  return apiKey;
}

export function getSupabaseURL() {
  const url = process.env.SUPABASE_URL;
  if (!url) throw new Error(`Expected env var SUPABASE_URL`);
  return url;
}

export function getSupabaseKey() {
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;
  if (!serviceKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);
  return serviceKey;
}

export function getCohereTrialKey() {
  const key = process.env.COHERE_TRIAL_KEY;
  if (!key) throw new Error(`Expected env var COHERE_TRIAL_KEY`);
  return key;
}

export function getBlobRWToken() {
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (!blobToken) throw new Error(`Expected env var BLOB_READ_WRITE_TOKEN`);
  return blobToken;
}
