/*
Image upload/download was the last thing we where working on and is not fully completed. The code snippets for image upload/download are gotten from the dropbox "Leksjon 13".
*/

import multer from 'multer';
import ErrorHandler from '../util/errorHandler.js';

function fileFilter(req, file, cb) {
  const filetypes = /\.(jpeg|jpg|png)$/;
  if (!file.originalname.match(filetypes)) {
    return cb(new ErrorHandler('Kun bildefiler er lov', 400));
  }
  cb(null, true);
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/images');
  },
  filename(req, file, cb) {
    cb(null, `custom_value_${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 2000000 }, // 2mb
  fileFilter,
}).single('image');