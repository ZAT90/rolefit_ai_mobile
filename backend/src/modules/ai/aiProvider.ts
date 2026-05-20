import { env } from "../../config/env.js";
import type { AiProvider } from "./ai.types.js";
import { openAiProvider } from "./openaiProvider.js";

const mockAiProvider: AiProvider = {
  async generateText() {
    return JSON.stringify({
      fitScore: 82,
      roleSummary:
        "This role focuses on building production mobile experiences with AI-enabled workflows and strong product collaboration.",
      seniorityLevel: "Senior",
      requiredSkills: ["React Native", "TypeScript", "API integration"],
      matchedSkills: ["React Native", "TypeScript", "Node.js"],
      missingSkills: ["LLM evaluation", "AI observability"],
      senioritySignals: [
        "architecture ownership",
        "cross-functional collaboration",
        "performance optimization",
      ],
      resumeAdvice:
        "Emphasize production React Native architecture, backend API collaboration, and AI workflow delivery.",
      interviewQuestions: [
        "How would you handle AI request failures in a mobile workflow?",
        "How would you structure generated output for small-screen scanning?",
      ],
      outreachMessage:
        "Hi [Name], I noticed your team is hiring for a senior mobile role. My background in React Native, TypeScript, and product-focused AI workflows looks closely aligned.",
      nextActions: [
        "Prepare examples of React Native architecture decisions",
        "Highlight API integration and product ownership",
        "Review AI output validation trade-offs",
      ],
    });
  },
};

export const getAiProvider = (): AiProvider => {
  if (env.AI_PROVIDER === "openai") {
    return openAiProvider;
  }

  return mockAiProvider;
};
