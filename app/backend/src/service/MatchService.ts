import IMatch from '../interface/IMatch';
import Match from '../database/models/matches';
import MatchInterface from '../interface/Match';
import Team from '../database/models/teams';

export default class MatchService implements MatchInterface {
  constructor(private model = Match) {}

  public async matches(): Promise<IMatch[]> {
    const findMatches = await this.model.findAll({ include: [
      {
        model: Team,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: Team,
        as: 'teamAway',
        attributes: ['teamName'],
      },
    ] });
    const response = findMatches as IMatch[];
    return response;
  }
}
