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
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'METHOD_NOT_ALLOWED',
      message: 'Method Not Allowed. Use GET.',
    });
  }

  const customKey =
    (req.headers && (req.headers['x-gemini-api-key'] || req.headers['X-Gemini-Api-Key'])) ||
    (req.headers && req.headers['authorization'] ? req.headers['authorization'].replace(/^Bearer\s+/i, '') : '') ||
    (req.query && (req.query.key || req.query.apiKey)) ||
    '';

  const status = getGeminiStatus(typeof customKey === 'string' ? customKey : undefined);
  return res.status(200).json(status);
}
