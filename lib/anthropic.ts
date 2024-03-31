import Anthropic from "@anthropic-ai/sdk";

const isProductionEnv = process.env.PROD_ANTHROPIC_KEY !== undefined;

const apiKey = isProductionEnv
  ? process.env.PROD_ANTHROPIC_KEY
  : process.env.DEV_ANTHROPIC_KEY;

if (!apiKey) {
  throw Error("Anthropic API key is not set");
}

const anthropic = new Anthropic({ apiKey });

export default anthropic;
