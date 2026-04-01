/**
 * Integration tests: Advanced patterns (samples 20-22)
 */
import { describe, it, expect } from 'vitest';
import { run as runGatedTools } from '../../examples/security/20-permission-gated-tools';
import { run as runFallback } from '../../examples/resilience/21-provider-fallback';
import { run as runMemory } from '../../examples/memory/22-persistent-memory';

describe('20 — Permission-Gated Tools', () => {
  it('blocks unauthorized tools at registration', async () => {
    const result = await runGatedTools('Search for AI news.');
    expect(result.content).toContain('cannot delete users');
    expect(result.blocked.some(b => b.id === 'delete-user')).toBe(true);
    expect(result.permissions).toContain('search');
    expect(result.permissions).not.toContain('delete-user');
  });
});

describe('21 — Provider Fallback', () => {
  it('falls back from primary to backup', async () => {
    const result = await runFallback('Hello!');
    expect(result.content).toContain('backup provider');
    expect(result.fallbacks.length).toBe(1);
    expect(result.fallbacks[0]).toContain('429');
  });
});

describe('22 — Persistent Memory', () => {
  it('remembers across agent instances', async () => {
    const result = await runMemory('');
    expect(result.turn1).toContain('Alice');
    expect(result.turn2).toContain('Alice');
    expect(result.finalStoreSize).toBeGreaterThan(0);
  });
});
