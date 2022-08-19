import * as express from 'express';
import LoginService from '../service/LoginService';
import LoginController from '../controller/LoginController';

const router = express.Router();

const loginService = new LoginService();
const loginController = new LoginController(loginService);

router.post('/login', loginController.login);

export default router;
