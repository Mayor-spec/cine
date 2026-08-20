import { getGeminiStatus } from './_lib/filmIntelligence';

export default function handler(req: any, res: any) {
  // CORS & Preflight handling
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-gemini-api-key, authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const customKey =
    (req.headers && (req.headers['x-gemini-api-key'] || req.headers['X-Gemini-Api-Key'])) ||
    (req.query && req.query.key) ||
    '';

  const status = getGeminiStatus(typeof customKey === 'string' ? customKey : undefined);
  return res.status(200).json(status);
}
