import { runScoutInvestigation, generateHeuristicFilmReport } from './_lib/filmIntelligence';

export const maxDuration = 60; // Extends execution limit on Vercel/Node platforms

async function parseBody(req: any): Promise<any> {
  if (req.body) {
    if (typeof req.body === 'object') return req.body;
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch {
        return {};
      }
    }
  }

  // Support Web API Request (req.json)
  if (typeof req.json === 'function') {
    try {
      return await req.json();
    } catch {
      return {};
    }
  }

  // Support Node.js stream body if not pre-parsed
  if (typeof req.on === 'function' && !req.readableEnded) {
    return new Promise((resolve) => {
      let data = '';
      req.on('data', (chunk: any) => {
        data += chunk;
      });
      req.on('end', () => {
        try {
          resolve(data ? JSON.parse(data) : {});
        } catch {
          resolve({});
        }
      });
      req.on('error', () => resolve({}));
    });
  }

  return {};
}

export default async function handler(req: any, res: any) {
  // CORS & Preflight handling
  const origin = req.headers?.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-gemini-api-key, authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'METHOD_NOT_ALLOWED',
      message: 'Method Not Allowed. Use POST.',
    });
  }

  let body: any = {};
  try {
    body = await parseBody(req);

    if (!body || !body.title || !body.concept) {
      return res.status(400).json({
        error: 'INVALID_REQUEST',
        message: 'Project title and concept/logline are required.',
      });
    }

    // Extract API key from headers or request payload
    const headerKey =
      (req.headers && (req.headers['x-gemini-api-key'] || req.headers['X-Gemini-Api-Key'])) ||
      (req.headers && req.headers['authorization'] ? req.headers['authorization'].replace(/^Bearer\s+/i, '') : '') ||
      body.apiKey ||
      '';

    const report = await runScoutInvestigation(body, headerKey);
    return res.status(200).json(report);
  } catch (err: any) {
    const errorMsg = err?.message || 'CineScout could not complete the investigation.';
    console.error('API /api/scout error:', errorMsg);

    if (errorMsg.includes('GEMINI_KEY_MISSING')) {
      return res.status(422).json({
        error: 'GEMINI_KEY_MISSING',
        message: 'Google Gemini API Key is not configured. Please add GEMINI_API_KEY to your environment variables or provide a custom key.',
      });
    }

    if (err?.status === 401 || err?.status === 403 || errorMsg.includes('API_KEY_INVALID')) {
      return res.status(401).json({
        error: 'INVALID_API_KEY',
        message: 'The provided Google Gemini API Key is invalid or expired.',
      });
    }

    // Fallback to deterministic heuristic report if AI quotas/rate-limits fail
    if (body?.title && body?.concept) {
      console.warn('Falling back to heuristic film report generation.');
      const fallbackReport = generateHeuristicFilmReport(body);
      return res.status(200).json({
        ...fallbackReport,
        isFallback: true,
        notice: 'Generated using CineScout heuristic fallback engine due to upstream demand.',
      });
    }

    return res.status(500).json({
      error: 'AI_INVESTIGATION_FAILED',
      message: errorMsg,
    });
  }
}
}
