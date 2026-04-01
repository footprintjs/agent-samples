/**
 * Sample 01: Simple LLM Call
 *
 * LLMCall builder + TokenRecorder — the simplest concept.
 * Single LLM call, no tools, no loop.
 */
import { LLMCall, mock, TokenRecorder } from 'agentfootprint';

export async function run(input: string) {
  const tokens = new TokenRecorder();

  const runner = LLMCall
    .create({ provider: mock([{ content: 'This text discusses AI safety and alignment challenges.' }]) })
    .system('Summarize the following text concisely:')
    .recorder(tokens)
    .build();

  const result = await runner.run(input);
  return { content: result.content, tokenStats: tokens.getStats() };
}

// CLI entry point
if (process.argv[1] === import.meta.filename) {
  run('Explain AI safety in one sentence.').then(console.log);
}
