import type { NextApiRequest, NextApiResponse } from 'next';
import { buildUrl } from '../../../utils/common';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  };
  const response = await fetch(
    `${process.env.BACKEND_API_ENDPOINT}/subscriptions`,
    options
  );

  if (response.status >= 300) {
    return res.status(response.status).json('fetch error');
  }

  const data = await response.json();

  return res.status(200).json(data);
};

export default handler;
