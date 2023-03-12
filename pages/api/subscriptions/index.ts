import type { NextApiRequest, NextApiResponse } from 'next';
import { buildUrl } from '../../../utils/common';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Create subscription and retrieve subscriptionId
  let subscriptionId;
  {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    };
    const response = await fetch(
      buildUrl(`${process.env.BACKEND_API_ENDPOINT}/subscriptions`),
      options
    );

    if (response.status >= 300) {
      return res.status(response.status).json('fetch error');
    }

    const data = await response.json();
    subscriptionId = data.id;
  }

  // Create subscription_token and retrieve token
  let token;
  {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subscriptionId }),
    };
    const response = await fetch(
      buildUrl(`${process.env.BACKEND_API_ENDPOINT}/subscription_tokens`),
      options
    );

    if (response.status >= 300) {
      return res.status(response.status).json('fetch error');
    }

    const data = await response.json();
    token = data.token;
  }

  // Send confirmation email
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': process.env.POSTMARK_API_TOKEN,
    },
    body: JSON.stringify({
      From: 'info@theboardhop.com',
      To: req.body.email,
      Subject: 'Confirm your email address',
      TextBody: `Welcome to Lantrn! Please confirm your email address: ${token}`,
      HtmlBody: `<h1>Welcome to Lantrn!</h1><p>Please confirm your email address: ${token}</p>`,
      MessageStream: 'outbound',
    }),
  };
  const response = await fetch(
    buildUrl(`${process.env.POSTMARK_API_ENDPOINT}`),
    // @ts-ignore
    options
  );

  if (response.status >= 300) {
    return res.status(response.status).json('fetch error');
  }

  return res.status(200).json({});
};

export default handler;
