USE vue_portfolio;

INSERT INTO users (username, password)
VALUES
  ('admin', '$2a$10$eErDM7PXZXVeAp3jdjk7bue88vxpv4.tXgTCI9eO.mu8m9RYj0Bxe')
ON DUPLICATE KEY UPDATE password = VALUES(password);

INSERT INTO projects
  (title, description, description_summary, tech_stack, image_url, preview_video_url, alt_text, problem, solution, features, live_url, github_url, position, is_featured)
VALUES
  (
    'Portfolio API Platform',
    JSON_ARRAY(JSON_OBJECT('type', 'text', 'content', 'A REST API that serves projects, skills, messages, and protected admin CRUD actions.')),
    'A REST API that serves projects, skills, messages, and protected admin CRUD actions.',
    'Node.js, Express, MySQL',
    '/img/work/work-1.jpg',
    '',
    'Portfolio API dashboard preview',
    'Portfolio owners often need a way to update projects, skills, and messages without touching code.',
    'I built authenticated Express routes connected to MySQL so portfolio content can be managed from a private dashboard.',
    'JWT admin login, protected CRUD routes, MySQL storage, contact message handling',
    '',
    '',
    1,
    TRUE
  ),
  (
    'Vue Project Gallery',
    JSON_ARRAY(JSON_OBJECT('type', 'text', 'content', 'A responsive Vue interface that filters and renders portfolio projects from live JSON data.')),
    'A responsive Vue interface that filters and renders portfolio projects from live JSON data.',
    'Vue, Vite, REST',
    '/img/work/work-4.jpg',
    '',
    'Responsive Vue project gallery preview',
    'Static project sections make it hard to grow a portfolio as new work is added.',
    'I connected Vue cards and filters to backend data so every project can be managed dynamically.',
    'Project filtering, reusable cards, responsive grid, API loading states',
    '',
    '',
    2,
    FALSE
  ),
  (
    'Contact Message Flow',
    JSON_ARRAY(JSON_OBJECT('type', 'text', 'content', 'A validated contact form that sends user messages to the backend and stores them in SQL.')),
    'A validated contact form that sends user messages to the backend and stores them in SQL.',
    'Vue, Express, MySQL',
    '/img/work/work-7.jpg',
    '',
    'Contact form and message flow preview',
    'Visitors need a simple way to contact the portfolio owner, while the owner needs messages stored safely.',
    'I created a validated Vue form and Express endpoint that saves messages to MySQL for admin review.',
    'Form validation, REST endpoint, MySQL messages table, admin message delete',
    '',
    '',
    3,
    FALSE
  )
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  alt_text = VALUES(alt_text);

INSERT INTO skills (name, level)
VALUES
  ('Vue', 88),
  ('Node.js', 82),
  ('MySQL', 78),
  ('REST APIs', 85),
  ('Responsive UI', 90)
ON DUPLICATE KEY UPDATE level = VALUES(level);

INSERT INTO profile
  (id, name, role_left, role_left_description, role_right, role_right_description, headline, intro, portrait_url, og_image_url, alt_text, location, email, phone, github_url, linkedin_url, instagram_url, twitter_url, facebook_url, cv_url)
VALUES
  (
    1,
    'Mugisha Prince',
    'software designer',
    'I shape clean portfolio pages, readable layouts, and interfaces that help visitors understand the work fast.',
    '< full-stack coder >',
    'I build Vue frontends, Express APIs, MySQL databases, and admin tools for managing real portfolio content.',
    'Developer who designs useful web systems and writes clean, efficient code.',
    'I am a software developer focused on practical web products: responsive pages, backend APIs, database flows, and portfolio systems that are simple to maintain.',
    '/img/prince-images/profile-image.png',
    '/img/prince-images/profile-image.png',
    'Mugisha Prince portrait',
    'Rwanda',
    'hello@example.com',
    '',
    'https://github.com/mugishaprince',
    'https://www.linkedin.com/in/mugisha-prince',
    '',
    '',
    '',
    '/Mugisha_Prince_CV.pdf'
  )
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
  cv_url = VALUES(cv_url);

INSERT INTO facts (id, label, value)
VALUES
  (1, 'Location', 'Rwanda'),
  (2, 'Focus', 'Vue, Node.js, MySQL'),
  (3, 'Style', 'Clean UI, useful backend'),
  (4, 'Currently', 'Building portfolio management tools')
ON DUPLICATE KEY UPDATE label = VALUES(label), value = VALUES(value);

INSERT INTO testimonials (id, name, role, quote)
VALUES
  (1, 'Future collaborator', 'Project partner', 'Prince turns ideas into clear portfolio systems and explains each technical choice calmly.'),
  (2, 'Portfolio client', 'Website owner', 'The work feels organized, responsive, and easy to update from the admin dashboard.')
ON DUPLICATE KEY UPDATE name = VALUES(name), role = VALUES(role), quote = VALUES(quote);
