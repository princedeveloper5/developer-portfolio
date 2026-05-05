import { Router } from 'express';
import { pool } from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { imageUpload } from '../middleware/uploads.js';

export const profileRouter = Router();

const defaultProfile = {
  name: 'Mugisha Prince',
  role_left: 'full-stack developer',
  role_left_description: 'I design clean interfaces, thoughtful layouts, and portfolio experiences that feel easy to use.',
  role_right: '< coder >',
  role_right_description: 'I build Vue frontends, Express APIs, MySQL databases, and admin tools that make content manageable.',
  headline: 'Developer who designs useful web systems and writes clean, efficient code.',
  intro:
    'I am a software developer focused on practical web products: responsive pages, backend APIs, database flows, and portfolio systems that are simple to maintain.',
  portrait_url: '/img/prince-images/profile-image.png',
  og_image_url: '/img/prince-images/profile-image.png',
  alt_text: 'Mugisha Prince portrait',
  location: 'Rwanda',
  email: 'hello@example.com',
  phone: '',
  github_url: 'https://github.com/mugishaprince',
  linkedin_url: 'https://www.linkedin.com/in/mugisha-prince',
  instagram_url: 'https://www.instagram.com/mugishaprince',
  twitter_url: 'https://x.com/mugishaprince',
  facebook_url: 'https://www.facebook.com/mugishaprince',
  cv_url: '/Mugisha_Prince_CV.pdf'
};

function normalizeProfile(body) {
  const profile = {
    name: String(body.name || '').trim(),
    role_left: String(body.role_left || '').trim(),
    role_left_description: String(body.role_left_description || '').trim(),
    role_right: String(body.role_right || '').trim(),
    role_right_description: String(body.role_right_description || '').trim(),
    headline: String(body.headline || '').trim(),
    intro: String(body.intro || '').trim(),
    portrait_url: String(body.portrait_url || '').trim(),
    og_image_url: String(body.og_image_url || body.portrait_url || '').trim(),
    alt_text: String(body.alt_text || '').trim(),
    location: String(body.location || '').trim(),
    email: String(body.email || '').trim(),
    phone: String(body.phone || '').trim(),
    github_url: String(body.github_url || '').trim(),
    linkedin_url: String(body.linkedin_url || '').trim(),
    instagram_url: String(body.instagram_url || '').trim(),
    twitter_url: String(body.twitter_url || '').trim(),
    facebook_url: String(body.facebook_url || '').trim(),
    cv_url: String(body.cv_url || '').trim()
  };

  if (!profile.name || !profile.headline || !profile.intro) {
    const error = new Error('Name, headline, and intro are required.');
    error.status = 400;
    throw error;
  }

  return profile;
}

profileRouter.get('/', async (request, response, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM profile WHERE id = 1');
    response.json({ data: rows[0] || defaultProfile });
  } catch (error) {
    next(error);
  }
});

profileRouter.put('/', requireAuth, imageUpload.fields([{ name: 'portrait', maxCount: 1 }, { name: 'og_image', maxCount: 1 }]), async (request, response, next) => {
  try {
    const portrait = request.files?.portrait?.[0];
    const ogImage = request.files?.og_image?.[0];
    if (portrait) request.body.portrait_url = `/uploads/${portrait.filename}`;
    if (ogImage) request.body.og_image_url = `/uploads/${ogImage.filename}`;
    const profile = normalizeProfile(request.body);
    await pool.execute(
      `INSERT INTO profile
       (id, name, role_left, role_left_description, role_right, role_right_description, headline, intro, portrait_url, og_image_url, alt_text, location, email, phone, github_url, linkedin_url, instagram_url, twitter_url, facebook_url, cv_url)
       VALUES
       (1, :name, :role_left, :role_left_description, :role_right, :role_right_description, :headline, :intro, :portrait_url, :og_image_url, :alt_text, :location, :email, :phone, :github_url, :linkedin_url, :instagram_url, :twitter_url, :facebook_url, :cv_url)
       ON DUPLICATE KEY UPDATE
       name = VALUES(name),
       role_left = VALUES(role_left),
       role_left_description = VALUES(role_left_description),
       role_right = VALUES(role_right),
       role_right_description = VALUES(role_right_description),
       headline = VALUES(headline),
       intro = VALUES(intro),
       portrait_url = VALUES(portrait_url),
       og_image_url = VALUES(og_image_url),
       alt_text = VALUES(alt_text),
       location = VALUES(location),
       email = VALUES(email),
       phone = VALUES(phone),
       github_url = VALUES(github_url),
       linkedin_url = VALUES(linkedin_url),
       instagram_url = VALUES(instagram_url),
       twitter_url = VALUES(twitter_url),
       facebook_url = VALUES(facebook_url),
       cv_url = VALUES(cv_url)`,
      profile
    );
    response.json({ data: { id: 1, ...profile } });
  } catch (error) {
    next(error);
  }
});
