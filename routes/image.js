/*
Image upload/download was the last thing we where working on and is not fully completed. The code snippets for image upload/download are gotten from the dropbox "Leksjon 13".
*/

import express from 'express';
import { imageController } from '../controller/index.js';
import { upload } from '../middleware/image.js';

const router = express.Router();

router.post('/upload', upload, imageController.create);

router.get('/download/:id', imageController.get);

export default router;