import ILeader from './ILeader';

export default interface Leader {
  leaderBoard(url:string):Promise<ILeader[]>,
}
