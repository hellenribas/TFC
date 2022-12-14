import { Request, Response } from 'express';
import Match from '../interface/Match';

export default class MatchController {
  private _matchService: Match;
  constructor(private matchService: Match) {
    this._matchService = matchService;
  }

  public async matches(_req:Request, res:Response): Promise<void> {
    const response = await this._matchService.matches();
    res.status(200).json(response);
  }

  public async matchInProgress(req:Request, res:Response): Promise<void> {
    const match = req.body;
    const response = await this._matchService.matchInProgress(match);
    res.status(201).json(response);
  }

  public async matchInProgressId(req:Request, res:Response):Promise<void> {
    const { id } = req.params;
    const response = await this._matchService.matchInProgressId(id);
    res.status(200).json(response);
  }

  public async updatedInProgress(req:Request, res:Response):Promise<void> {
    const { id } = req.params;
    const match = req.body;
    const response = await this._matchService.updatedInProgress(Number(id), match);
    res.status(200).json(response);
  }
}
