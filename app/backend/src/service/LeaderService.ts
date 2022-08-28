import Board from '../interface/Board';
import ILeader from '../interface/ILeader';
import IMatch from '../interface/IMatch';
import Team from '../database/models/teams';
import Match from '../database/models/matches';

export default class LeaderService {
  constructor(private model = Match, private model2 = Team) {}

  private static pointsGoalsHome(home:number, arrayMatch:IMatch[]) {
    const matches = arrayMatch.filter((el) => el.homeTeam === home);
    const equal = matches.filter((el) => el.homeTeamGoals === el.awayTeamGoals);
    const goals = matches.filter((el) => el.homeTeamGoals > el.awayTeamGoals);
    const loser = matches.filter((el) => el.homeTeamGoals < el.awayTeamGoals);
    const favor = matches.map((el) => el.homeTeamGoals).reduce((acc, el) => el + acc);
    const own = matches.map((el) => el.awayTeamGoals).reduce((acc, el) => el + acc);
    return {
      totalPoints: (goals.length * 3) + equal.length,
      totalGames: matches.length,
      totalVictories: goals.length,
      totalDraws: equal.length,
      totalLosses: loser.length,
      goalsFavor: favor,
      goalsOwn: own,
      goalsBalance: favor - own,
      efficiency: ((((goals.length * 3) + equal.length) / (matches.length * 3)) * 100),
    };
  }

  private static pointsGoalsAway(away:number, arrayMatch:IMatch[]) {
    const matches = arrayMatch.filter((el) => el.awayTeam === away);
    const equal = matches.filter((el) => el.homeTeamGoals === el.awayTeamGoals);
    const goals = matches.filter((el) => el.awayTeamGoals > el.homeTeamGoals);
    const loser = matches.filter((el) => el.awayTeamGoals < el.homeTeamGoals);
    const favor = matches.map((el) => el.awayTeamGoals).reduce((acc, el) => el + acc);
    const own = matches.map((el) => el.homeTeamGoals).reduce((acc, el) => el + acc);
    return {
      totalPoints: (goals.length * 3) + equal.length,
      totalGames: matches.length,
      totalVictories: goals.length,
      totalDraws: equal.length,
      totalLosses: loser.length,
      goalsFavor: favor,
      goalsOwn: own,
      goalsBalance: favor - own,
      efficiency: ((((goals.length * 3) + equal.length) / (matches.length * 3)) * 100),
    };
  }

  private static sorted(board: ILeader[]): ILeader[] {
    return board.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
    ));
  }

  public async leaderBoard(url:string):Promise<ILeader[]> {
    const findMatches = await this.model.findAll({ where: {
      inProgress: false,
    } });
    const response = JSON.parse(JSON.stringify(findMatches));
    const findTeam = await this.model2.findAll();
    return LeaderService.sorted(findTeam.map((homeOraway) => {
      const obj = url.includes('home') ? LeaderService
        .pointsGoalsHome(homeOraway.id, response)
        : LeaderService.pointsGoalsAway(homeOraway.id, response);
      const efficiency = obj.efficiency as number;
      return {
        name: homeOraway.teamName,
        ...obj,
        efficiency: `${efficiency.toFixed(2)}`,
      };
    }));
  }

  private static objTotal({ team,
    objHome, objAway, totalVictories, totalDraws, totalGames }:Board):ILeader {
    return {
      name: team.teamName,
      totalPoints: objHome.totalPoints + objAway.totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses: objHome.totalLosses + objAway.totalLosses,
      goalsFavor: objHome.goalsFavor + objAway.goalsFavor,
      goalsOwn: objHome.goalsOwn + objAway.goalsOwn,
      goalsBalance:
      (objHome.goalsFavor - objHome.goalsOwn) + (objAway.goalsFavor - objAway.goalsOwn),
      efficiency: `${
        ((((totalVictories * 3) + totalDraws) / (totalGames * 3)) * 100).toFixed(2)
      }`,
    };
  }

  public async totalPoint(): Promise<ILeader[]> {
    const findMatches = await this.model.findAll({ where: { inProgress: false } });
    const response = JSON.parse(JSON.stringify(findMatches));
    const findTeam = await this.model2.findAll();
    const result = LeaderService.sorted(findTeam.map((team) => {
      const objHome = LeaderService.pointsGoalsHome(team.id, response);
      const objAway = LeaderService.pointsGoalsAway(team.id, response);
      return LeaderService.objTotal({
        team,
        objHome,
        objAway,
        totalVictories: objHome.totalVictories + objAway.totalVictories,
        totalDraws: objHome.totalDraws + objAway.totalDraws,
        totalGames: objHome.totalGames + objAway.totalGames,
      });
    }));
    return result;
  }
}
