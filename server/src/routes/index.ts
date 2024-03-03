import userController from '@controller/userController';
import express from 'express';
const router = express.Router();
router.get('/', (req, res) => {
	res.send('ok');
});
router.post('/create', userController.signUp);
router.post('/createSession', userController.createSession);
export default router;
