import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { mkdirSync } from 'node:fs';
import { errorHandler } from './middleware/errorHandler.js';
import { trackHomeVisit } from './middleware/visits.js';
import { uploadRoot } from './middleware/uploads.js';
import { analyticsRouter } from './routes/analytics.js';
import { authRouter } from './routes/auth.js';
import { contactRouter } from './routes/contact.js';
import { factsRouter } from './routes/facts.js';
import { messagesRouter } from './routes/messages.js';
import { profileRouter } from './routes/profile.js';
import { projectsRouter } from './routes/projects.js';
import { skillsRouter } from './routes/skills.js';
import { testimonialsRouter } from './routes/testimonials.js';

dotenv.config({ path: new URL('../.env', import.meta.url) });

const app = express();
const port = process.env.PORT || 4000;
const isProduction = process.env.NODE_ENV === 'production';

mkdirSync(uploadRoot, { recursive: true });

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173'
  })
);
app.use('/uploads', express.static(uploadRoot));
app.use(express.json({ limit: '1mb' }));
app.use(trackHomeVisit);

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: Number(process.env.CONTACT_RATE_LIMIT || 8),
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Too many messages sent. Please try again later.' }
});

app.get('/api/health', (request, response) => {
  response.json({ status: 'ok' });
});

app.use('/api', authRouter);
app.use('/api', analyticsRouter);
app.use('/api/profile', profileRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/facts', factsRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/contact', contactLimiter, contactRouter);
app.use('/api/messages', messagesRouter);
app.use(errorHandler);

app.listen(port, () => {
  if (!isProduction) {
    console.info(`API running on http://localhost:${port}`);
  }
});
