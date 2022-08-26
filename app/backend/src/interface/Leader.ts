import ILeader from './ILeader';

export default interface Leader {
  leaderBoard():Promise<ILeader[]>,
}
