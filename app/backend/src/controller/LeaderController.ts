import { Request, Response } from 'express';
import Leader from '../interface/Leader';

export default class LeaderController {
  private _leaderService: Leader;
  constructor(private leaderService: Leader) {
    this._leaderService = leaderService;
  }

  public async leaderBoard(req: Request, res: Response): Promise<void> {
    const response = await this._leaderService.leaderBoard(req.url);

    res.status(200).json(response);
  }

  // public async totalPoint(req: Request, res: Response):Promise<void> {
  //   const response = await this._leaderService.totalPoint();

  //   res.status(200).json(response);
  // }
}
