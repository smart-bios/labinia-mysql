import { Router } from 'express';
import Specie from '../controllers/specie'

const router = Router();


router.post('/add', Specie.add);
router.get('/list', Specie.list);
router.get('/findById/:id', Specie.findById);
router.get('/find/:text', Specie.find);
router.put('/edit/:id', Specie.edit);

export default router;