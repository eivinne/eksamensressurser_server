import express from 'express';
import {pollController} from '../controller/index.js';

const router = express.Router();

router.get('/:id', pollController.get);

router.get('/', pollController.list);

router.post('/create', pollController.create);

router.put('/update/:id', pollController.update);

router.delete('/delete/:id', pollController.remove);

export default router;