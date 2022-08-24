import Goals from './Goals';

export default interface IMatch extends Goals {
  id: number,
  homeTeam: number,
  awayTeam: number,
  inProgress: number,
}
