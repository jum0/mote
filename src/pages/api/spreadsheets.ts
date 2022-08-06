import type { NextApiRequest, NextApiResponse } from 'next';

import { google } from 'googleapis';

import type { SpreadSheets } from 'domains/spreadsheets/spreadsheets.type';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405);
  }

  const body = req.body as SpreadSheets;

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

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID,
      range: 'A1:B1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[body.createdAt, body.content]],
      },
    });

    return res.status(201).json({
      data: response.data,
    });
  } catch (error) {
    return res.status(error.code).send({ message: error.message });
  }
}
