import type { NextApiRequest, NextApiResponse } from 'next';
import { buildUrl } from '../../../utils/common';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch(
    buildUrl(`${process.env.BACKEND_API_ENDPOINT}/facilities`, {
      lat: req.query.lat ?? '',
      lng: req.query.lng ?? '',
      sort: req.query.sort ?? '',
      page: req.query.page ?? '',
    })
  );

  if (response.status >= 300) {
    return res.status(response.status).json('fetch error');
  }

  const data = await response.json();

  return res.status(200).json(data);
};

export default handler;
