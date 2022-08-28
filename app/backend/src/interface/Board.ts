import ILeaderSimple from './ILeaderSimple';

export default interface Board {
  team: {
    teamName:string
  },
  objHome:ILeaderSimple,
  objAway:ILeaderSimple,
  totalVictories:number,
  totalDraws:number,
  totalGames:number
}
