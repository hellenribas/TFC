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

  public async matchInProgress(req:Request, res:Response): Promise<void> {
    const match = req.body;
    const { authorization } = req.headers;
    const token = authorization as string;
    const response = await this._matchService.matchInProgress(match, token);
    res.status(201).json(response);
  }
}
