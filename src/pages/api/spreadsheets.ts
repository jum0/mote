import type { NextApiRequest, NextApiResponse } from 'next';

import { google } from 'googleapis';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import type { SpreadSheets } from 'domains/spreadsheets/spreadsheets.type';

function getCreatedAt() {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  return dayjs().tz('Asia/Seoul').format('YYYY/MM/DD(ddd) HH:mm:ss');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Method Not Allowed' });
  }

  const deviceType = /Mobi/i.test(req.headers['user-agent']) ? 'mobile' : 'desktop';
  const createdAt = getCreatedAt();
  const { content } = req.body as SpreadSheets;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
        private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({
      auth,
      version: 'v4',
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID,
      range: 'A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[createdAt, deviceType, content]],
      },
    });

    return res.status(201).send({ message: 'Created' });
  } catch (error) {
    return res.status(error.code).send({ message: error.message });
  }
}
