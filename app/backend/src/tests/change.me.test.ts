import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Login from '../database/models/users';
import IUser from '../interface/IUser';

import { Response } from 'superagent';
import User from '../database/models/users';

chai.use(chaiHttp);

const { expect } = chai;

const loginMock: IUser = {
  username: 'user',
  role: 'role',
  email: 'test@test.com',
  password: '123456',
}

describe('/login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Login, "findOne")
      .resolves(loginMock as User);
  });

  after(()=>{
    sinon.restore();
  })

  it('should return status 200', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login');

    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('should return token', async () => {
    chaiHttpResponse = await chai
    .request(app).post('/login');
    expect(chaiHttpResponse.body).to.have.property('token');
  });
});

