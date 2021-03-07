import { Router } from 'express';
import userRoute from './user';
import storageRoute from "./storage";
import specieRoute from './specie';

const route = Router();

route.use( '/user', userRoute );
route.use( '/storage', storageRoute);
route.use( '/specie', specieRoute);

export default route;