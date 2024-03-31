import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getVoyageAIKey() {
  const isProductionEnv = process.env.PROD_VOYAGEAI_KEY !== undefined;
  const apiKey = isProductionEnv
    ? process.env.PROD_VOYAGEAI_KEY
    : process.env.DEV_VOYAGEAI_KEY;
  if (!apiKey) {
    throw Error("Voyage AI key is not set");
  }
  return apiKey;
}