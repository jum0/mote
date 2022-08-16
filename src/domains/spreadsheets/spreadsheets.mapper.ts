import type { SpreadSheets } from './spreadsheets.type';

export const trimContent = (data: SpreadSheets): SpreadSheets => {
  const trimmedContent = data.content.trim().replace(/\n+/g, '\n');

  data.content = trimmedContent;

  return data;
};
