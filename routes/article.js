import express from 'express';

import {articleController} from '../controller/index.js';
import {auth} from '../middleware/index.js';

const router = express.Router();

router.get('/:id', articleController.get);

router.get('/', auth.canAuth, articleController.getAll);

router.post('/create', articleController.create);

router.put('/update/:id', articleController.update);

router.delete('/delete/:id', articleController.remove);

export default router;