export type GenerateStructuredOutputInput = {
  systemPrompt: string;
  userPrompt: string;
};

export type AiProvider = {
  generateStructuredOutput(
    input: GenerateStructuredOutputInput,
  ): Promise<unknown>;
};
