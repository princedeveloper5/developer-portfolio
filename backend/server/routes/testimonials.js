import { Router } from 'express';
import { pool } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

export const testimonialsRouter = Router();

function validateTestimonial(body) {
  const name = String(body.name || '').trim();
  const role = String(body.role || '').trim();
  const quote = String(body.quote || '').trim();

  if (!name || !quote) {
    const error = new Error('Testimonial name and quote are required.');
    error.status = 400;
    throw error;
  }

  return { name, role, quote };
}

testimonialsRouter.get('/', async (request, response, next) => {
  try {
    const [rows] = await pool.query('SELECT id, name, role, quote FROM testimonials ORDER BY id DESC');
    response.json({ data: rows });
  } catch (error) {
    next(error);
  }
});

testimonialsRouter.post('/', requireAuth, async (request, response, next) => {
  try {
    const testimonial = validateTestimonial(request.body);
    const [result] = await pool.execute(
      'INSERT INTO testimonials (name, role, quote) VALUES (:name, :role, :quote)',
      testimonial
    );
    response.status(201).json({ data: { id: result.insertId, ...testimonial } });
  } catch (error) {
    next(error);
  }
});

testimonialsRouter.put('/:id', requireAuth, async (request, response, next) => {
  try {
    const testimonial = validateTestimonial(request.body);
    const [result] = await pool.execute(
      'UPDATE testimonials SET name = :name, role = :role, quote = :quote WHERE id = :id',
      { id: request.params.id, ...testimonial }
    );

    if (!result.affectedRows) {
      return response.status(404).json({ message: 'Testimonial not found.' });
    }

    return response.json({ data: { id: Number(request.params.id), ...testimonial } });
  } catch (error) {
    return next(error);
  }
});

testimonialsRouter.delete('/:id', requireAuth, async (request, response, next) => {
  try {
    const [result] = await pool.execute('DELETE FROM testimonials WHERE id = :id', { id: request.params.id });

    if (!result.affectedRows) {
      return response.status(404).json({ message: 'Testimonial not found.' });
    }

    return response.status(204).send();
  } catch (error) {
    return next(error);
  }
});
