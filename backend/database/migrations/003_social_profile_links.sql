USE vue_portfolio;

ALTER TABLE profile
  ADD COLUMN IF NOT EXISTS github_url VARCHAR(500) NOT NULL DEFAULT '' AFTER email,
  ADD COLUMN IF NOT EXISTS linkedin_url VARCHAR(500) NOT NULL DEFAULT '' AFTER github_url,
  ADD COLUMN IF NOT EXISTS instagram_url VARCHAR(500) NOT NULL DEFAULT '' AFTER linkedin_url,
  ADD COLUMN IF NOT EXISTS twitter_url VARCHAR(500) NOT NULL DEFAULT '' AFTER instagram_url,
  ADD COLUMN IF NOT EXISTS facebook_url VARCHAR(500) NOT NULL DEFAULT '' AFTER twitter_url,
  ADD COLUMN IF NOT EXISTS cv_url VARCHAR(500) NOT NULL DEFAULT '' AFTER facebook_url;

UPDATE profile
SET
  github_url = CASE WHEN github_url = '' THEN 'https://github.com/mugishaprince' ELSE github_url END,
  linkedin_url = CASE WHEN linkedin_url = '' THEN 'https://www.linkedin.com/in/mugisha-prince' ELSE linkedin_url END,
  cv_url = CASE WHEN cv_url = '' THEN '/Mugisha_Prince_CV.pdf' ELSE cv_url END
WHERE id = 1;
