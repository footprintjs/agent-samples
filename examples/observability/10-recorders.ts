/**
 * Sample 10: Recorders
 *
 * Token, Cost, Tool usage tracking — CompositeRecorder wraps multiple.
 */
import { LLMCall, mock, TokenRecorder, CostRecorder, ToolUsageRecorder, CompositeRecorder } from 'agentfootprint';

export async function run(input: string) {
  const tokens = new TokenRecorder();
  const costs = new CostRecorder();
  const tools = new ToolUsageRecorder();

  const _composite = new CompositeRecorder([tokens, costs, tools]);

  const runner = LLMCall
    .create({ provider: mock([{ content: 'Hello! How can I help?' }]) })
    .system('You are a helpful assistant.')
    .build();

  await runner.run(input);

  return {
    tokenStats: tokens.getStats(),
    costEntries: costs.getEntries(),
    toolStats: tools.getStats(),
  };
}

if (process.argv[1] === import.meta.filename) {
  run('Hello!').then(console.log);
}
