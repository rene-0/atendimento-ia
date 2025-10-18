import { ChatCompletionAssistantMessageParam, ChatCompletionUserMessageParam } from "openai/resources/index"
import { openai } from "../../infra/ai/openai-client"
import { defaultRules } from "./default-messages"

const userMessages = new Map<string, string[]>()
const aiAnswers = new Map<string, string[]>()

export async function getAIResponse(message: string, from: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      ...defaultRules,
      ...[...(userMessages.get(from) || [])].map((m): ChatCompletionUserMessageParam => ({ role: "user", content: m })),
      ...[...(aiAnswers.get(from) || [])].map((a): ChatCompletionAssistantMessageParam => ({ role: "assistant", content: a })),
      { role: "user", content: message },
    ],
  })
  if (!completion) {
    return null
  }

  if (!completion.choices[0]) {
    return null
  }

  const answer = completion.choices[0].message.content

  if (!answer) {
    return null
  }

  userMessages.set(from, [...(userMessages.get(from) || []), message])

  aiAnswers.set(from, [...(aiAnswers.get(from) || []), answer])

  return answer
}
