import { Router } from 'express';
import { pool } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

export const analyticsRouter = Router();

analyticsRouter.get('/home-visit', (request, response) => {
  response.status(204).send();
});

analyticsRouter.get('/analytics', requireAuth, async (request, response, next) => {
  try {
    const [totalRows] = await pool.query('SELECT COUNT(*) AS total FROM visits');
    const [dailyRows] = await pool.query(
      `SELECT DATE(visited_at) AS date, COUNT(*) AS visits
       FROM visits
       GROUP BY DATE(visited_at)
       ORDER BY DATE(visited_at) DESC
       LIMIT 7`
    );

    response.json({
      data: {
        totalVisits: Number(totalRows[0]?.total || 0),
        dailyVisits: dailyRows.reverse()
      }
    });
  } catch (error) {
    next(error);
  }
});
