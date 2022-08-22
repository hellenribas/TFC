import { Request, Response } from 'express';
import Match from '../interface/Match';

export default class MatchController {
  private _matchService: Match;
  constructor(private matchService: Match) {
    this._matchService = matchService;
  }

  public async matches(req:Request, res:Response): Promise<void> {
    const response = await this._matchService.matches();
    res.status(200).json(response);
  }
}
