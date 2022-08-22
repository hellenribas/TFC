import * as express from 'express';
import { Request, Response } from 'express';
import TeamsService from '../service/TeamService';
import TeamsController from '../controller/TeamController';

const router = express.Router();

const TeamService = new TeamsService();
const TeamController = new TeamsController(TeamService);

router.get('/teams', (req: Request, res: Response) => TeamController.teams(req, res));
router.get('/teams/:id', (req: Request, res: Response) => TeamController.teamId(req, res));

export default router;
