/**
 * Integration tests: Basics (samples 01-03)
 *
 * Verifies LLMCall, Agent, and RAG produce expected results.
 */
import { describe, it, expect } from 'vitest';
import { run as runLLMCall } from '../../examples/basics/01-simple-llm-call';
import { run as runAgent } from '../../examples/basics/02-agent-with-tools';
import { run as runRAG } from '../../examples/basics/03-rag-retrieval';

describe('01 — Simple LLM Call', () => {
  it('returns content and observability data', async () => {
    const result = await runLLMCall('Explain AI.');
    expect(result.content).toBe('This text discusses AI safety and alignment challenges.');
    expect(result.tokens).toBeDefined();
    expect(result.tools).toBeDefined();
    expect(result.cost).toBeDefined();
  });
});

describe('02 — Agent with Tools', () => {
  it('returns content after tool use', async () => {
    const result = await runAgent('Tell me about AI.');
    expect(result.content).toBe('Based on my research: AI is transformative technology that powers modern applications.');
    expect(result.tokens).toBeDefined();
    expect(result.tools).toBeDefined();
    expect(result.cost).toBeDefined();
  });
});

describe('03 — RAG Retrieval', () => {
  it('returns content from retrieved context', async () => {
    const result = await runRAG('What is the ultimate answer?');
    expect(result.content).toBe('According to the documentation, the answer is 42.');
    expect(result.tokens).toBeDefined();
    expect(result.cost).toBeDefined();
  });
});
