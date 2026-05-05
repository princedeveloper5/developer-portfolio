USE vue_portfolio;

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS description_summary VARCHAR(500) NOT NULL DEFAULT '' AFTER description,
  ADD COLUMN IF NOT EXISTS preview_video_url VARCHAR(500) NOT NULL DEFAULT '' AFTER image_url,
  ADD COLUMN IF NOT EXISTS position INT UNSIGNED NOT NULL DEFAULT 0 AFTER github_url;

UPDATE projects
SET description_summary = LEFT(
  CASE
    WHEN JSON_VALID(description) THEN JSON_UNQUOTE(JSON_EXTRACT(description, '$[0].content'))
    ELSE description
  END,
  500
)
WHERE description_summary = '';

UPDATE projects
SET description = JSON_ARRAY(JSON_OBJECT('type', 'text', 'content', description))
WHERE NOT JSON_VALID(description);

ALTER TABLE projects
  MODIFY COLUMN description JSON NOT NULL;

CREATE INDEX idx_projects_position ON projects (position);

UPDATE projects
SET position = id
WHERE position = 0;

ALTER TABLE profile
  ADD COLUMN IF NOT EXISTS og_image_url VARCHAR(500) NOT NULL DEFAULT '' AFTER portrait_url;

UPDATE profile
SET og_image_url = portrait_url
WHERE og_image_url = '';
