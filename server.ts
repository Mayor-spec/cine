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
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Health check endpoint
const handleHealth = (req: Request, res: Response) => {
  res.json(getGeminiStatus());
};
app.get('/api/health', handleHealth);
app.get('/health', handleHealth);

// Film intelligence investigation endpoint
const handleScout = async (req: Request, res: Response) => {
  try {
    const report = await runScoutInvestigation(req.body);
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
    app.get('*', (req: Request, res: Response) => {
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
