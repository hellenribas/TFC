import { Request, Response } from 'express';
import Teams from '../interface/Teams';

export default class TeamController {
  private _teamService: Teams;
  constructor(private teamService: Teams) {
    this._teamService = teamService;
  }

  public async teams(_req: Request, res: Response): Promise<void> {
    const response = await this._teamService.teams();
    res.status(200).json(response);
  }

  public async teamId(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const response = await this._teamService.teamId(id);
    res.status(200).json(response);
  }
}
