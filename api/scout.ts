import { runScoutInvestigation } from './_lib/filmIntelligence';

export default async function handler(req: any, res: any) {
  // CORS & Preflight handling
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const rawBody = req.body;
    const body = typeof rawBody === 'string' ? JSON.parse(rawBody) : rawBody;

    if (!body || !body.title || !body.concept) {
      return res.status(400).json({
        error: 'INVALID_REQUEST',
        message: 'Project title and concept are required.',
      });
    }

    const report = await runScoutInvestigation(body);
    return res.status(200).json(report);
  } catch (err: any) {
    console.error('API /api/scout error:', err);
    return res.status(500).json({
      error: 'AI_INVESTIGATION_FAILED',
      message: err.message || 'CineScout could not complete the investigation.',
    });
  }
}
