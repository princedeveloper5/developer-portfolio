import { Router } from 'express';
import { pool } from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { imageUpload } from '../middleware/uploads.js';

export const projectsRouter = Router();

function validateProject(body) {
  const requiredFields = ['title', 'description_summary', 'tech_stack', 'image_url', 'alt_text'];
  const missingField = requiredFields.find((field) => !String(body[field] || '').trim());

  if (missingField) {
    const error = new Error(`${missingField} is required.`);
    error.status = 400;
    throw error;
  }
}

function parseCaseStudy(value, fallbackSummary) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'object' && value) return value;
  const raw = String(value || '').trim();
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return [{ type: 'text', content: raw }];
    }
  }
  return [{ type: 'text', content: fallbackSummary }];
}

function projectPayload(body) {
  const descriptionSummary = String(body.description_summary || body.description || '').trim();
  return {
    title: String(body.title || '').trim(),
    description: JSON.stringify(parseCaseStudy(body.description, descriptionSummary)),
    description_summary: descriptionSummary,
    tech_stack: String(body.tech_stack || '').trim(),
    image_url: String(body.image_url || '').trim(),
    preview_video_url: String(body.preview_video_url || '').trim(),
    alt_text: String(body.alt_text || '').trim(),
    problem: String(body.problem || '').trim(),
    solution: String(body.solution || '').trim(),
    features: String(body.features || '').trim(),
    live_url: String(body.live_url || '').trim(),
    github_url: String(body.github_url || '').trim(),
    position: Number.parseInt(body.position, 10) || 0,
    is_featured: body.is_featured === true || body.is_featured === 'true' || body.is_featured === '1' ? 1 : 0
  };
}

function hydrateProject(row) {
  if (!row) return row;
  const description = row.description;
  return {
    ...row,
    description:
      typeof description === 'string'
        ? (() => {
            try {
              return JSON.parse(description);
            } catch {
              return [{ type: 'text', content: description }];
            }
          })()
        : description
  };
}

projectsRouter.get('/', async (request, response, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, title, description, description_summary, tech_stack, image_url, preview_video_url,
       alt_text, problem, solution, features, live_url, github_url, position, is_featured, created_at
       FROM projects
       ORDER BY position ASC, is_featured DESC, created_at DESC`
    );
    response.json({ data: rows.map(hydrateProject) });
  } catch (error) {
    next(error);
  }
});

projectsRouter.get('/:id', async (request, response, next) => {
  try {
    const [rows] = await pool.execute(
      `SELECT id, title, description, description_summary, tech_stack, image_url, preview_video_url,
       alt_text, problem, solution, features, live_url, github_url, position, is_featured, created_at
       FROM projects
       WHERE id = :id`,
      { id: request.params.id }
    );

    if (!rows[0]) {
      return response.status(404).json({ message: 'Project not found.' });
    }

    return response.json({ data: hydrateProject(rows[0]) });
  } catch (error) {
    return next(error);
  }
});

projectsRouter.post('/', requireAuth, imageUpload.fields([{ name: 'image', maxCount: 1 }, { name: 'preview_video', maxCount: 1 }]), async (request, response, next) => {
  try {
    const image = request.files?.image?.[0];
    const video = request.files?.preview_video?.[0];
    if (image) request.body.image_url = `/uploads/${image.filename}`;
    if (video) request.body.preview_video_url = `/uploads/${video.filename}`;
    validateProject(request.body);
    const project = projectPayload(request.body);
    const [result] = await pool.execute(
      `INSERT INTO projects
       (title, description, description_summary, tech_stack, image_url, preview_video_url, alt_text, problem, solution, features, live_url, github_url, position, is_featured)
       VALUES
       (:title, :description, :description_summary, :tech_stack, :image_url, :preview_video_url, :alt_text, :problem, :solution, :features, :live_url, :github_url, :position, :is_featured)`,
      project
    );
    response.status(201).json({ data: hydrateProject({ id: result.insertId, ...project }) });
  } catch (error) {
    next(error);
  }
});

projectsRouter.put('/reorder/list', requireAuth, async (request, response, next) => {
  const connection = await pool.getConnection();
  try {
    const ids = Array.isArray(request.body.ids) ? request.body.ids.map(Number).filter(Boolean) : [];
    if (!ids.length) return response.status(400).json({ message: 'Project ids are required.' });
    await connection.beginTransaction();
    await Promise.all(ids.map((id, index) => connection.execute('UPDATE projects SET position = :position WHERE id = :id', { id, position: index + 1 })));
    await connection.commit();
    return response.json({ data: { ids } });
  } catch (error) {
    await connection.rollback();
    return next(error);
  } finally {
    connection.release();
  }
});

projectsRouter.put('/:id', requireAuth, imageUpload.fields([{ name: 'image', maxCount: 1 }, { name: 'preview_video', maxCount: 1 }]), async (request, response, next) => {
  try {
    const image = request.files?.image?.[0];
    const video = request.files?.preview_video?.[0];
    if (image) request.body.image_url = `/uploads/${image.filename}`;
    if (video) request.body.preview_video_url = `/uploads/${video.filename}`;
    validateProject(request.body);
    const project = projectPayload(request.body);
    const [result] = await pool.execute(
      `UPDATE projects
       SET title = :title,
           description = :description,
           description_summary = :description_summary,
           tech_stack = :tech_stack,
           image_url = :image_url,
           preview_video_url = :preview_video_url,
           alt_text = :alt_text,
           problem = :problem,
           solution = :solution,
           features = :features,
           live_url = :live_url,
           github_url = :github_url,
           position = :position,
           is_featured = :is_featured
       WHERE id = :id`,
      { id: request.params.id, ...project }
    );

    if (!result.affectedRows) {
      return response.status(404).json({ message: 'Project not found.' });
    }

    return response.json({ data: hydrateProject({ id: Number(request.params.id), ...project }) });
  } catch (error) {
    return next(error);
  }
});

projectsRouter.delete('/:id', requireAuth, async (request, response, next) => {
  try {
    const [result] = await pool.execute('DELETE FROM projects WHERE id = :id', {
      id: request.params.id
    });

    if (!result.affectedRows) {
      return response.status(404).json({ message: 'Project not found.' });
    }

    return response.status(204).send();
  } catch (error) {
    return next(error);
  }
});
