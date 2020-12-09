import express from 'express';

import {contactController} from '../controller/index.js';

const router = express.Router();

router.get('/:id', contactController.get);

router.get('/', contactController.getAll);

router.post('/create', contactController.create);

router.delete('/delete/:id', contactController.remove);

export default router;