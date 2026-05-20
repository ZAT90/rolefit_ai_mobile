export type GenerateStructuredOutputInput = {
  systemPrompt: string;
  userPrompt: string;
};

export type AiProvider = {
  generateText(input: GenerateStructuredOutputInput): Promise<string>;
};
