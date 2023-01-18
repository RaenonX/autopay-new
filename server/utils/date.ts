export const generateCurrentApiTimestamp = (): number => parseInt(new Date()
  .toISOString()
  .replaceAll('T', '')
  .replaceAll('-', '')
  .replaceAll(':', '')
  .slice(0, 14));


export const apiTimestampToDate = (timestamp: number): Date => {
  const tsStr = timestamp.toString();

  const year = tsStr.slice(0, 4);
  const month = tsStr.slice(4, 6);
  const date = tsStr.slice(6, 8);
  const hour = tsStr.slice(8, 10);
  const minute = tsStr.slice(10, 12);
  const second = tsStr.slice(12, 14);

  return new Date(`${year}-${month}-${date}T${hour}:${minute}:${second}Z`);
};

export const jsDateToSqlDate = (date: Date): string => {
  const [dateIso, time] = date.toISOString().split('T', 2);

  const timeNoMs = time.split('.', 1);

  return `${dateIso} ${timeNoMs}`;
};
