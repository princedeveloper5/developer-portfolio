import { Router } from 'express';
import { pool } from '../db.js';

export const contactRouter = Router();

function validateMessage(body) {
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const message = String(body.message || '').trim();

  if (!name || !email || message.length < 10) {
    const error = new Error('Name, valid email, and a 10 character message are required.');
    error.status = 400;
    throw error;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const error = new Error('Valid email is required.');
    error.status = 400;
    throw error;
  }

  return { name, email, message };
}

contactRouter.post('/', async (request, response, next) => {
  try {
    const message = validateMessage(request.body);
    const [result] = await pool.execute(
      'INSERT INTO messages (name, email, message) VALUES (:name, :email, :message)',
      message
    );

    response.status(201).json({
      data: {
        id: result.insertId,
        ...message
      }
    });
  } catch (error) {
    next(error);
  }
});
