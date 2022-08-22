import * as express from 'express';
import { Request, Response } from 'express';
import MatchsService from '../service/MatchService';
import MatchsController from '../controller/MatchController';

const router = express.Router();

const MatchService = new MatchsService();
const MatchController = new MatchsController(MatchService);

router.get('/matches', (req: Request, res: Response) => MatchController.matches(req, res));

export default router;
