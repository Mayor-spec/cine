import { getGeminiStatus } from './_lib/filmIntelligence';

export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const status = getGeminiStatus();
  return res.status(200).json({
    message: 'CineScout AI Film Development Intelligence API',
    ...status,
    endpoints: ['/api/scout', '/api/ask-room', '/api/health'],
  });
}
