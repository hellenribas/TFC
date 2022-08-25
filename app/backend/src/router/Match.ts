import * as express from 'express';
import { Request, Response } from 'express';
import validateMiddleware from '../middlewares/validateMiddleware';
import MatchsService from '../service/MatchService';
import MatchsController from '../controller/MatchController';

const router = express.Router();

const MatchService = new MatchsService();
const MatchController = new MatchsController(MatchService);

router.get('/matches', (req: Request, res: Response) => MatchController.matches(req, res));
router.post(
  '/matches',
  validateMiddleware,
  (req: Request, res: Response) => MatchController.matchInProgress(req, res),
);
router.patch(
  '/matches/:id/finish',
  validateMiddleware,
  (req: Request, res: Response) =>
    MatchController.matchInProgressId(req, res),
);

router.patch(
  '/matches/:id',
  validateMiddleware,
  (req: Request, res: Response) =>
    MatchController.updatedInProgress(req, res),
);

export default router;
