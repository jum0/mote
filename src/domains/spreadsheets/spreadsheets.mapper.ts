import dayjs from 'dayjs';

import type { SpreadSheets } from './spreadsheets.type';

export const addCreatedAt_trimmedContent = (data: SpreadSheets): SpreadSheets => {
  const trimmedContent = data.content.trim().replace(/\n+/g, '\n');

  data.content = trimmedContent;
  data.createdAt = dayjs().format(`YYYY/MM/DD(ddd) HH:mm:ss`);

  return data;
};
