import {Router} from 'express';
import {getHomePage, upsertHomePage} from '../controllers/homepage.controller.js';
import verifyJwt from '../middlewares/auth.middleware.js';
const router = Router();

router.route('/').get(getHomePage);
router.route('/').patch(upsertHomePage);

export default router;