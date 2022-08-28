import * as express from 'express';
import { Request, Response } from 'express';
import LeaderService from '../service/LeaderService';
import LeaderController from '../controller/LeaderController';

const router = express.Router();

const leaderService = new LeaderService();
const leaderController = new LeaderController(leaderService);

router.get(
  '/leaderboard/home',
  (req: Request, res: Response) => leaderController.leaderBoard(req, res),
);

router.get(
  '/leaderboard/away',
  (req: Request, res: Response) => leaderController.leaderBoard(req, res),
);

router.get(
  '/leaderboard/',
  (req: Request, res: Response) => leaderController.totalPoint(req, res),
);

export default router;
