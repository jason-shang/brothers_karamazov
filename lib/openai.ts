import { OpenAI } from "openai";

const isProductionEnv = process.env.PROD_OPENAI_API_KEY !== undefined;

const apiKey = isProductionEnv
  ? process.env.PROD_OPENAI_API_KEY
  : process.env.DEV_OPENAI_API_KEY;

if (!apiKey) {
  throw Error("OpenAI API key is not set");
}

const openai = new OpenAI({ apiKey });

export default openai;
