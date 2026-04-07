/**
 * Integration tests: Observability (sample 10)
 */
import { describe, it, expect } from 'vitest';
import { run as runRecorders } from '../../examples/observability/10-recorders';

describe('10 — Recorders', () => {
  it('tracks tokens, costs, and tool usage via agentObservability()', async () => {
    const result = await runRecorders('What is the answer?');
    expect(result.tokens).toBeDefined();
    expect(result.tools).toBeDefined();
    expect(result.cost).toBeDefined();
    expect(result.costEntries).toBeDefined();
  });
});
