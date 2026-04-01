/**
 * Sample 07: FlowChart Pipeline
 *
 * Sequential multi-agent composition — classify → analyze → respond.
 * Token and turn recorders observe the whole pipeline.
 */
import { FlowChart, LLMCall, mock, TokenRecorder, TurnRecorder } from 'agentfootprint';

export async function run(input: string) {
  const tokens = new TokenRecorder();
  const turns = new TurnRecorder();

  const classify = LLMCall
    .create({ provider: mock([{ content: 'Category: billing' }]) })
    .system('Classify this request:')
    .build();

  const analyze = LLMCall
    .create({ provider: mock([{ content: 'Analysis: Customer needs refund for overcharge.' }]) })
    .system('Analyze the classified request:')
    .build();

  const respond = LLMCall
    .create({ provider: mock([{ content: 'Dear customer, we have processed your refund of $50.' }]) })
    .system('Generate a customer response:')
    .build();

  const runner = FlowChart.create()
    .agent('classify', 'Classify Request', classify)
    .agent('analyze', 'Analyze Request', analyze)
    .agent('respond', 'Generate Response', respond)
    .recorder(tokens)
    .recorder(turns)
    .build();

  const result = await runner.run(input);
  return { content: result.content, tokenStats: tokens.getStats(), turnStats: turns.getTurns() };
}

if (process.argv[1] === import.meta.filename) {
  run('I was overcharged $50 on my bill.').then(console.log);
}
