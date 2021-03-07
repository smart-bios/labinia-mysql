import { Router } from 'express';
import Storage from '../controllers/storage'

const route = Router();

route.post( '/upload', Storage.upload );
route.delete( '/delete/:id', Storage.delete);
route.get( '/list', Storage.list);
route.get( '/download/:id', Storage.download);

export default route