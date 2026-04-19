/**
 * Sample 22: Persistent Memory
 *
 * Multi-turn agent using the memory pipeline. `defaultPipeline` composes
 * load → pick → format on read and batched write on save. Swap the
 * store for Redis/Postgres/DynamoDB (Phase 3) in production.
 */
import { Agent, mock } from 'agentfootprint';
import { defaultPipeline, InMemoryStore } from 'agentfootprint/memory';

export async function run(_input: string) {
  const store = new InMemoryStore();
  const pipeline = defaultPipeline({ store });

  // Turn 1: fresh conversation
  const agent1 = Agent.create({
    provider: mock([{ content: "Nice to meet you, Alice! I'll remember your name." }]),
  })
    .system('You are a helpful assistant with persistent memory.')
    .memoryPipeline(pipeline)
    .build();

  const turn1 = await agent1.run('Hi! My name is Alice.', {
    identity: { conversationId: 'demo-conv' },
    turnNumber: 1,
  });

  // Turn 2: new agent instance, same pipeline/store — simulates server restart.
  const agent2 = Agent.create({
    provider: mock([{ content: 'Your name is Alice — you told me in our first message.' }]),
  })
    .system('You are a helpful assistant with persistent memory.')
    .memoryPipeline(pipeline)
    .build();

  const turn2 = await agent2.run('Do you remember my name?', {
    identity: { conversationId: 'demo-conv' },
    turnNumber: 2,
  });

  const listed = await store.list({ conversationId: 'demo-conv' });
  return {
    turn1: turn1.content,
    turn2: turn2.content,
    finalStoreSize: listed.entries.length,
  };
}

if (process.argv[1] === import.meta.filename) {
  run('').then(console.log);
}
