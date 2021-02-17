import { Router } from 'express';
import multer from 'multer';

import upLoadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';

const router = Router();
const upload = multer(upLoadConfig);

router.get('/orphanages', OrphanagesController.index);
router.get('/orphanages/:id', OrphanagesController.show);
router.post('/orphanages', upload.array('images'), OrphanagesController.create);

export default router;