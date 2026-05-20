import OpenAI from "openai";
import { env } from "../../config/env.js";
import { ApiError } from "../../utils/ApiError.js";
import type { AiProvider } from "./ai.types.js";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const openAiProvider: AiProvider = {
  async generateText({ systemPrompt, userPrompt }) {
    if (!env.OPENAI_API_KEY) {
      throw new ApiError(500, "OpenAI API key is not configured.");
    }

    const response = await openai.responses.create({
      model: env.OPENAI_MODEL,
      input: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    if (!response.output_text) {
      throw new ApiError(502, "OpenAI returned an empty response.");
    }

    return response.output_text;
  },
};
