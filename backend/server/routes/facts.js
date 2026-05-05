import { Router } from 'express';
import { pool } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

export const factsRouter = Router();

function validateFact(body) {
  const label = String(body.label || '').trim();
  const value = String(body.value || '').trim();

  if (!label || !value) {
    const error = new Error('Fact label and value are required.');
    error.status = 400;
    throw error;
  }

  return { label, value };
}

factsRouter.get('/', async (request, response, next) => {
  try {
    const [rows] = await pool.query('SELECT id, label, value FROM facts ORDER BY id ASC');
    response.json({ data: rows });
  } catch (error) {
    next(error);
  }
});

factsRouter.post('/', requireAuth, async (request, response, next) => {
  try {
    const fact = validateFact(request.body);
    const [result] = await pool.execute('INSERT INTO facts (label, value) VALUES (:label, :value)', fact);
    response.status(201).json({ data: { id: result.insertId, ...fact } });
  } catch (error) {
    next(error);
  }
});

factsRouter.put('/:id', requireAuth, async (request, response, next) => {
  try {
    const fact = validateFact(request.body);
    const [result] = await pool.execute('UPDATE facts SET label = :label, value = :value WHERE id = :id', {
      id: request.params.id,
      ...fact
    });

    if (!result.affectedRows) {
      return response.status(404).json({ message: 'Fact not found.' });
    }

    return response.json({ data: { id: Number(request.params.id), ...fact } });
  } catch (error) {
    return next(error);
  }
});

factsRouter.delete('/:id', requireAuth, async (request, response, next) => {
  try {
    const [result] = await pool.execute('DELETE FROM facts WHERE id = :id', { id: request.params.id });

    if (!result.affectedRows) {
      return response.status(404).json({ message: 'Fact not found.' });
    }

    return response.status(204).send();
  } catch (error) {
    return next(error);
  }
});
