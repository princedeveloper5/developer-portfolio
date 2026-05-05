import { pool } from '../db.js';

export async function trackHomeVisit(request, response, next) {
  if (request.method !== 'GET' || request.path !== '/api/home-visit') {
    return next();
  }

  try {
    await pool.execute(
      'INSERT INTO visits (path, ip_address, user_agent) VALUES (:path, :ip_address, :user_agent)',
      {
        path: '/',
        ip_address: request.ip || '',
        user_agent: String(request.headers['user-agent'] || '').slice(0, 500)
      }
    );
  } catch {
    // Visit tracking must never break the public site.
  }

  return next();
}
