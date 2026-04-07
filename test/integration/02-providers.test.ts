/**
 * Integration tests: Providers (samples 04-06)
 */
import { describe, it, expect } from 'vitest';
import { run as runPrompt } from '../../examples/providers/04-prompt-strategies';
import { run as runMessages } from '../../examples/providers/05-message-strategies';
import { run as runTools } from '../../examples/providers/06-tool-strategies';

describe('04 — Prompt Strategies', () => {
  it('produces different outputs per strategy', async () => {
    const result = await runPrompt('AI is transforming the world.');
    expect(result.summary).toBe('This is a concise summary of the input.');
    expect(result.translation).toBe('Ceci est une traduction en francais.');
  });
});

describe('05 — Message Strategies', () => {
  it('applies sliding window and char budget strategies', async () => {
    const result = await runMessages('');
    expect(result.original).toBe('7 messages');
    expect(result.windowed).toContain('messages');
    expect(result.truncated).toContain('messages');
  });
});

describe('06 — Tool Strategies', () => {
  it('registers and retrieves tools', async () => {
    const result = await runTools('');
    expect(result.count).toBe(2);
    expect(result.hasCalculator).toBe(true);
  });
});
