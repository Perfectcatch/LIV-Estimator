import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export const DEFAULT_MODEL = "claude-sonnet-4-5";
export const DEFAULT_MAX_TOKENS = 1500;

export interface ClaudeMessageOptions {
  model?: string;
  maxTokens?: number;
  systemPrompt?: string;
}

export async function callClaude(
  prompt: string,
  options: ClaudeMessageOptions = {}
): Promise<string> {
  const {
    model = DEFAULT_MODEL,
    maxTokens = DEFAULT_MAX_TOKENS,
    systemPrompt,
  } = options;

  const response = await anthropic.messages.create({
    model,
    max_tokens: maxTokens,
    ...(systemPrompt ? { system: systemPrompt } : {}),
    messages: [{ role: "user", content: prompt }],
  });

  return (
    response.content
      .filter((block) => block.type === "text")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((block: any) => block.text)
      .join("\n") || ""
  );
}

export default anthropic;
