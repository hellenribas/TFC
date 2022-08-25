import Goals from '../interface/Goals';
import Message from '../interface/Message';
import IMatch from '../interface/IMatch';
import Match from '../database/models/matches';
import MatchInterface from '../interface/Match';
import Team from '../database/models/teams';
import Validation from '../helpers/Validation';

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

  public async matchInProgress({
    homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }:IMatch):Promise<IMatch> {
    Validation.matchEqual(homeTeam, awayTeam);
    const findTeam = await this.model.findAll();
    Validation.matchInvalid(findTeam, homeTeam, awayTeam);
    const insertMatch = await this.model
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });

    return insertMatch as IMatch;
  }

  public async matchInProgressId(id:number | string):Promise<Message> {
    await this.model.update(
      {
        inProgress: false,
      },
      {
        where: {
          id,
        },
      },
    );
    return { message: 'Finished' };
  }

  public async updatedInProgress(id:number, { homeTeamGoals, awayTeamGoals }:Goals)
    :Promise<Message> {
    await this.model.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      {
        where: {
          id,
        },
      },
    );
    return { message: 'Updated' };
  }
}
