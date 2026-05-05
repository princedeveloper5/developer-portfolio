<<<<<<< HEAD
# developer-portfolio
This is my portfolio
=======
# Mugisha Prince Portfolio

This is Mugisha Prince's Vue.js single page portfolio backed by a Node.js REST API and MySQL database.

## Stack

- Frontend: Vue 3, Vite, Vue Router
- Backend: Node.js, Express
- Database: MySQL
- API format: JSON over REST

The project is grouped into `frontend/` and `backend/`.

- `frontend/`: Vue app, Vite config, public assets, and legacy template references
- `backend/`: Express API, MySQL schema/seed files, backups, and environment example

The original template page files are kept only as references inside `frontend/legacy-template/`.
The real application is handled by Vue Router through `/about`, `/services`, `/projects`, `/blog`, and `/contact`.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create the MySQL database and tables:

   ```bash
   mysql -u root < backend/database/schema.sql
   mysql -u root < backend/database/seed.sql
   ```

3. Copy environment settings:

   ```bash
   copy backend\.env.example backend\.env
   ```

4. Start the API:

   ```bash
   npm run server
   ```

5. Start the Vue app in another terminal:

   ```bash
   npm run dev
   ```

## API

- `GET /api/projects`
- `GET /api/skills`
- `POST /api/contact`
- `POST /api/login`
- `POST /api/logout`
- `POST /api/projects` protected
- `PUT /api/projects/:id` protected
- `DELETE /api/projects/:id` protected

Seeded admin login:

- Username: `admin` 
- Password: `admin123`
