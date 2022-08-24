import Match from '../database/models/matches';

export default interface IMatchTeam extends Match {
  teamHome: {
    teamName: string,
  },
  teamAway: {
    teamName: string,
  }
}
