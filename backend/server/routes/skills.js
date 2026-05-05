import { Router } from 'express';
import { pool } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

export const skillsRouter = Router();

function validateSkill(body) {
  const name = String(body.name || '').trim();
  const level = Number(body.level);

  if (!name || !Number.isInteger(level) || level < 1 || level > 100) {
    const error = new Error('Skill name and a level from 1 to 100 are required.');
    error.status = 400;
    throw error;
  }

  return { name, level };
}

skillsRouter.get('/', async (request, response, next) => {
  try {
    const [rows] = await pool.query('SELECT id, name, level FROM skills ORDER BY level DESC, name ASC');
    response.json({ data: rows });
  } catch (error) {
    next(error);
  }
});

skillsRouter.post('/', requireAuth, async (request, response, next) => {
  try {
    const skill = validateSkill(request.body);
    const [result] = await pool.execute('INSERT INTO skills (name, level) VALUES (:name, :level)', skill);
    response.status(201).json({ data: { id: result.insertId, ...skill } });
  } catch (error) {
    next(error);
  }
});

skillsRouter.put('/:id', requireAuth, async (request, response, next) => {
  try {
    const skill = validateSkill(request.body);
    const [result] = await pool.execute('UPDATE skills SET name = :name, level = :level WHERE id = :id', {
      id: request.params.id,
      ...skill
    });

    if (!result.affectedRows) {
      return response.status(404).json({ message: 'Skill not found.' });
    }

    return response.json({ data: { id: Number(request.params.id), ...skill } });
  } catch (error) {
    return next(error);
  }
});

skillsRouter.delete('/:id', requireAuth, async (request, response, next) => {
  try {
    const [result] = await pool.execute('DELETE FROM skills WHERE id = :id', { id: request.params.id });

    if (!result.affectedRows) {
      return response.status(404).json({ message: 'Skill not found.' });
    }

    return response.status(204).send();
  } catch (error) {
    return next(error);
  }
});
