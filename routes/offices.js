import express from 'express';
import {officeController} from '../controller/index.js';

const router = express.Router();

//router.get('/:id', officeController.get);

router.get('/', officeController.list);

router.get('/:city', officeController.city);

export default router;