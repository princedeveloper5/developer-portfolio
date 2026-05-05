import bcrypt from 'bcryptjs';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';

export const authRouter = Router();

authRouter.post('/login', async (request, response, next) => {
  try {
    const username = String(request.body.username || '').trim();
    const password = String(request.body.password || '');

    if (!username || !password) {
      return response.status(400).json({ message: 'Username and password are required.' });
    }

    const [users] = await pool.execute('SELECT id, username, password FROM users WHERE username = :username', {
      username
    });
    const user = users[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return response.status(401).json({ message: 'Invalid login.' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'change-this-secret',
      { expiresIn: '2h' }
    );

    return response.json({ data: { token, user: { id: user.id, username: user.username } } });
  } catch (error) {
    return next(error);
  }
});

authRouter.post('/logout', (request, response) => {
  response.status(204).send();
});
