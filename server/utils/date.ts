export const generateCurrentApiTimestamp = (): number => parseInt(new Date()
  .toISOString()
  .replaceAll('T', '')
  .replaceAll('-', '')
  .replaceAll(':', '')
  .slice(0, 14));
