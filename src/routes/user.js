import { Router } from 'express';
import User from '../controllers/user'

const router = Router();


router.post('/add', User.add);
router.get('/list', User.list);
router.get('/find/:id', User.find);
router.put('/edit/:id', User.edit);
router.delete('/delete/:id', User.delete);
router.post('/login', User.login);


export default router;