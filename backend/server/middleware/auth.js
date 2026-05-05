import jwt from 'jsonwebtoken';

export function requireAuth(request, response, next) {
  const header = request.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';

  if (!token) {
    return response.status(401).json({ message: 'Authentication required.' });
  }

  try {
    request.user = jwt.verify(token, process.env.JWT_SECRET || 'change-this-secret');
    return next();
  } catch {
    return response.status(401).json({ message: 'Invalid or expired token.' });
  }
}
