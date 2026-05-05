import multer from 'multer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDir = path.dirname(fileURLToPath(import.meta.url));
export const uploadRoot = path.resolve(serverDir, '../../uploads');

const storage = multer.diskStorage({
  destination: uploadRoot,
  filename: (request, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeBase = path
      .basename(file.originalname, extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 60);

    callback(null, `${Date.now()}-${safeBase || 'image'}${extension}`);
  }
});

function mediaOnly(request, file, callback) {
  const isAllowed = file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/');

  if (!isAllowed) {
    const error = new Error('Only image and video uploads are allowed.');
    error.status = 400;
    callback(error);
    return;
  }

  callback(null, true);
}

export const imageUpload = multer({
  storage,
  fileFilter: mediaOnly,
  limits: { fileSize: 24 * 1024 * 1024 }
});
