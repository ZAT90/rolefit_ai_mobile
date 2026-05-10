import {ApiError} from '../../utils/ApiError.js';
import type {AiProvider} from './ai.types.js';

export const openAiProvider: AiProvider = {
  async generateStructuredOutput() {
    throw new ApiError(
      501,
      'OpenAI provider is not implemented yet. Use AI_PROVIDER=mock for now.',
    );
  },
};
