import express, { Router } from 'express';

import {articleController} from '../controller/index.js';

const router = express.Router();

router.get('/:id', articleController.get);

router.get('/', articleController.getAll);

router.post('/create', articleController.create);

router.put('/update/:id', articleController.update);

router.delete('/delete/:id', articleController.remove);

export default router;