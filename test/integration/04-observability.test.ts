/**
 * Integration tests: Observability (sample 10)
 */
import { describe, it, expect } from 'vitest';
import { run as runRecorders } from '../../examples/observability/10-recorders';

describe('10 — Recorders', () => {
  it('tracks tokens, costs, and tool usage', async () => {
    const result = await runRecorders('Hello!');
    expect(result.tokenStats).toBeDefined();
    expect(result.costEntries).toBeDefined();
    expect(result.toolStats).toBeDefined();
  });
});
