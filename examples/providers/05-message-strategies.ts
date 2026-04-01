/**
 * Sample 05: Message Strategies
 *
 * Sliding window, truncation — manage conversation context size.
 */
import { slidingWindow, truncateToCharBudget, userMessage, assistantMessage } from 'agentfootprint';

export async function run(_input: string) {
  const messages = [
    userMessage('First question'),
    assistantMessage('First answer'),
    userMessage('Second question'),
    assistantMessage('Second answer'),
    userMessage('Third question'),
    assistantMessage('Third answer'),
    userMessage('Fourth question'),
  ];

  const windowed = slidingWindow(messages, 4);
  const truncated = truncateToCharBudget(messages, 100);

  return {
    original: messages.length + ' messages',
    windowed: windowed.length + ' messages (last 4)',
    truncated: truncated.length + ' messages (100 char budget)',
  };
}

if (process.argv[1] === import.meta.filename) {
  run('').then(console.log);
}
