import express from 'express';

import {userController} from '../controller/index.js'

const router = express.Router();

router.get('/:id', userController.get);

router.get('/', userController.list);

router.post('/create', userController.create);

router.put('/update/:id', userController.update);

router.delete('/delete/:id', userController.remove);

router.post('/login', userController.login);

export default router;