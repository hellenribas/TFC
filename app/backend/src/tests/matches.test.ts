import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/matches';
import { Response } from 'superagent';
import IMatch from '../interface/IMatch';

chai.use(chaiHttp);

const { expect } = chai;

const matchMock: IMatch[] =  [
  {
    "id": 1,
    "homeTeam": 1,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": 0,
    // "teamHome": {
    //   "teamName": "Team2"
    // },
    // "teamAway": {
    //   "teamName": "Team1"
    // }
  },
  {
    "id": 2,
    "homeTeam": 2,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": 1,
    // "teamHome": {
    //   "teamName": "Team3"
    // },
    // "teamAway": {
    //   "teamName": "Team4"
    // }
  }
];

const matchMockInProgress: IMatch[] =  [
  {
    "id": 1,
    "homeTeam": 1,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": 1,
    // "teamHome": {
    //   "teamName": "Team2"
    // },
    // "teamAway": {
    //   "teamName": "Team1"
    // }
  },
  {
    "id": 2,
    "homeTeam": 2,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": 1,
    // "teamHome": {
    //   "teamName": "Team3"
    // },
    // "teamAway": {
    //   "teamName": "Team4"
    // }
  }
];

const matchMockNoInProgress: IMatch[] =  [
  {
    "id": 1,
    "homeTeam": 1,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": 0,
    // "teamHome": {
    //   "teamName": "Team2"
    // },
    // "teamAway": {
    //   "teamName": "Team1"
    // }
  },
  {
    "id": 2,
    "homeTeam": 2,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": 0,
    // "teamHome": {
    //   "teamName": "Team3"
    // },
    // "teamAway": {
    //   "teamName": "Team4"
    // }
  }
];

describe('/matches no filter', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matchMock as Match[]);
  });

  after(()=>{
    sinon.restore();
  })

  it('should return status 200', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/matches').send();

    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('should return matches', async () => {
    chaiHttpResponse = await chai
    .request(app).post('/matches');
    expect(chaiHttpResponse.body).to.equal(matchMock);
  });
});

describe('/matches in progress', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matchMockInProgress as Match[]);
  });

  after(()=>{
    sinon.restore();
  })

  it('should return status 200', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/matches').send();

    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('should return matches', async () => {
    chaiHttpResponse = await chai
    .request(app).post('/matches');
    expect(chaiHttpResponse.body).to.equal(matchMockInProgress);
  });
});

describe('/matches no in progress', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matchMockNoInProgress as Match[]);
  });

  after(()=>{
    sinon.restore();
  })

  it('should return status 200', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/matches').send();

    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('should return matches', async () => {
    chaiHttpResponse = await chai
    .request(app).post('/matches');
    expect(chaiHttpResponse.body).to.equal(matchMockNoInProgress);
  });
});