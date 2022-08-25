import Team from '../database/models/teams';
import Match from '../database/models/matches';

export default class LeaderService {
  constructor(private model = Match, private model2 = Team) {}

  public async leaderBoard() {
    const findMatches = await this.model.findAll();
    const response = findMatches;
    return response;
  }
}
