/**
 * Integration tests: Full integration + errors (samples 13, 15)
 */
import { describe, it, expect } from 'vitest';
import { run as runFull } from '../../examples/integration/13-full-integration';
import { run as runErrors } from '../../examples/integration/15-error-handling';

describe('13 — Full Integration', () => {
  it('agent with tools produces final answer', async () => {
    const result = await runFull('Where is my order?');
    expect(result.content).toBe('Your order ORD-123 has been shipped. Total was $49.99.');
  });
});

describe('15 — Error Handling', () => {
  it('classifies errors correctly', async () => {
    const result = await runErrors('');
    expect(result.classifications['429']).toBe('rate_limit');
    expect(result.classifications['401']).toBe('auth');
    expect(result.rateLimitError.retryable).toBe(true);
    expect(result.authError.retryable).toBe(false);
    expect(result.wrappedNetworkError.code).toBe('network');
  });
});
