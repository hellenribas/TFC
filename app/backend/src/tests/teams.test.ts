import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/teams';

import { Response } from 'superagent';
import ITeam from '../interface/ITeam';

chai.use(chaiHttp);

const { expect } = chai;

const teamMock: ITeam[] =  [{
  "id": 1,
  "teamName": "team1"
},
{
  "id": 2,
  "teamName": "team2"
},
{
  "id": 3,
  "teamName": "team3"
},]

const teamIdMock: ITeam = {
  "id": 1,
  "teamName": "team1"
}


describe('/teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(teamMock as Team[]);
  });

  after(()=>{
    sinon.restore();
  })

  it('should return status 200', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/teams').send();

    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('should return teams', async () => {
    chaiHttpResponse = await chai
    .request(app).post('/teams');
    expect(chaiHttpResponse.body).to.equal(teamMock);
  });
});

describe('/teams/:id', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findOne")
      .resolves(teamIdMock as Team);
  });

  after(()=>{
    sinon.restore();
  })

  it('should return status 200', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/teams').send();

    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('should return teams', async () => {
    chaiHttpResponse = await chai
    .request(app).post('/teams');
    expect(chaiHttpResponse.body).to.equal(teamIdMock);
  });
});


