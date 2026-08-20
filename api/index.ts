import { getGeminiStatus } from './_lib/filmIntelligence';

export default function handler(req: any, res: any) {
  // CORS & Preflight handling
  const origin = req.headers?.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-gemini-api-key, authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'METHOD_NOT_ALLOWED',
      message: 'Method Not Allowed. Use GET.',
    });
  }

  // Check status using environment key or optional custom header/query key
  const customKey = (req.headers?.['x-gemini-api-key'] as string) || (req.query?.apiKey as string);
  const status = getGeminiStatus(customKey);

  return res.status(200).json({
    name: 'CineScout API',
    message: 'CineScout AI Film Development Intelligence API',
    ...status,
    endpoints: ['/api/scout', '/api/ask-room', '/api/health'],
  });
}
