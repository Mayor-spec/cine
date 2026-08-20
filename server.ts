import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import {
  runScoutInvestigation,
  askExecutiveRoom,
  getGeminiStatus,
} from './api/_lib/filmIntelligence';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Helper to extract custom API key from headers or request payload
const extractCustomKey = (req: Request): string | undefined => {
  const headerKey =
    (req.headers['x-gemini-api-key'] as string) ||
    (req.headers['X-Gemini-Api-Key'] as string) ||
    (req.headers['authorization']
      ? (req.headers['authorization'] as string).replace(/^Bearer\s+/i, '')
      : '') ||
    (req.query.apiKey as string) ||
    (req.body && req.body.apiKey) ||
    '';
  return headerKey.trim() || undefined;
};

// Health check endpoint
const handleHealth = (req: Request, res: Response) => {
  const customKey = extractCustomKey(req);
  res.json(getGeminiStatus(customKey));
};
app.get('/api/health', handleHealth);
app.get('/health', handleHealth);

// Film intelligence investigation endpoint
const handleScout = async (req: Request, res: Response) => {
  try {
    const customKey = extractCustomKey(req);
    const report = await runScoutInvestigation(req.body, customKey);
    res.json(report);
  } catch (err: any) {
    console.error('Server /api/scout error:', err);
    res.status(500).json({
      error: 'AI_INVESTIGATION_FAILED',
      message: err.message || 'CineScout could not complete the investigation.',
    });
  }
};
app.post('/api/scout', handleScout);
app.post('/scout', handleScout);

// Interactive room consultation endpoint
const handleAskRoom = async (req: Request, res: Response) => {
  try {
    const answer = await askExecutiveRoom(req.body);
    res.json(answer);
  } catch (err: any) {
    console.error('Server /api/ask-room error:', err);
    res.status(500).json({
      error: 'FAILED',
      message: err.message || 'Error processing consultation question.',
    });
  }
};
app.post('/api/ask-room', handleAskRoom);
app.post('/ask-room', handleAskRoom);

// Vite middleware & static production handler
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));

    // Fallback for client SPA routing (ignoring unmatched /api routes)
    app.get('*', (req: Request, res: Response) => {
      if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'NOT_FOUND', message: 'API route not found.' });
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CineScout server running on http://localhost:${PORT}`);
  });
}

// Start server if run directly (container or local dev)
if (!process.env.VERCEL) {
  startServer();
}

export default app;
export { app };
