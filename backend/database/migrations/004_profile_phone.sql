USE vue_portfolio;

ALTER TABLE profile
  ADD COLUMN phone VARCHAR(60) NOT NULL DEFAULT '' AFTER email;
