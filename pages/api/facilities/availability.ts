import type { NextApiRequest, NextApiResponse } from 'next';
import { buildUrl } from '../../../utils/common';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { facility_id: facilityId, date: dateReq } = req.query;
  if (!facilityId || !dateReq || typeof dateReq != 'string') {
    return res.status(400).json('Invalid request');
  }

  const date = new Date(dateReq);
  if (isNaN(date.getTime())) {
    return res.status(400).json('Invalid request');
  }

  const [year, month] = date.toISOString().split('T')[0].split('-');
  const response = await fetch(
    buildUrl(
      `${process.env.AVAILABILITY_API_HOST}/api/camps/availability/campground/${facilityId}/month`,
      {
        start_date: `${year}-${month}-01T00:00:00.000Z`,
      }
    )
  );
  if (response.status >= 300) {
    return res.status(response.status).json('fetch error');
  }
  const data = await response.json();
  const availabilities = new Set<string>();
  for (const i in data.campsites) {
    for (const j in data.campsites[i].availabilities) {
      if (data.campsites[i].availabilities[j] === 'Available') {
        availabilities.add(j);
      }
    }
  }

  return res.status(200).json({ availabilities: Array.from(availabilities) });
};

export default handler;
