import { Router } from 'express';
import { pool } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

export const messagesRouter = Router();

messagesRouter.get('/', requireAuth, async (request, response, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, message, created_at FROM messages ORDER BY created_at DESC'
    );
    response.json({ data: rows });
  } catch (error) {
    next(error);
  }
});

messagesRouter.delete('/:id', requireAuth, async (request, response, next) => {
  try {
    const [result] = await pool.execute('DELETE FROM messages WHERE id = :id', { id: request.params.id });

    if (!result.affectedRows) {
      return response.status(404).json({ message: 'Message not found.' });
    }

    return response.status(204).send();
  } catch (error) {
    return next(error);
  }
});
