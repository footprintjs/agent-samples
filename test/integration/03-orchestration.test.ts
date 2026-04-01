/**
 * Integration tests: Orchestration (samples 07-09)
 */
import { describe, it, expect } from 'vitest';
import { run as runFlowChart } from '../../examples/orchestration/07-flowchart-pipeline';
import { run as runSwarm } from '../../examples/orchestration/08-swarm-delegation';
import { run as runResilience } from '../../examples/orchestration/09-resilience';

describe('07 — FlowChart Pipeline', () => {
  it('runs classify → analyze → respond pipeline', async () => {
    const result = await runFlowChart('I was overcharged $50.');
    expect(result.content).toBe('Dear customer, we have processed your refund of $50.');
    expect(result.tokenStats).toBeDefined();
    expect(result.turnStats).toBeDefined();
  });
});

describe('08 — Swarm Delegation', () => {
  it('orchestrator delegates to billing specialist', async () => {
    const result = await runSwarm('I need a refund.');
    expect(result.content).toBe('The billing team has processed your refund.');
    expect(result.tokenStats).toBeDefined();
  });
});

describe('09 — Resilience', () => {
  it('retries flaky runner until success', async () => {
    const result = await runResilience('Do something.');
    expect(result.content).toBe('Success on attempt 3');
    expect(result.attempts).toBe(3);
  });
});
