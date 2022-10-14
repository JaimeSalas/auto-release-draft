export const toUList = (text: string): string =>
  text
    .split('\n')
    .map(l => (l ? `- ${l}` : ''))
    .join('\n')
