'use strict';

const
      frisby = require('frisby')

describe('frp api', () => {

  it('says hello on the root route', (done) => {

    frisby
      .get('http://localhost:3000/')
      .expect('status', 200)
      .then(body => {
        expect(body).toEqual('Hello World!')
      })
      .then(done)

  })

  it('gives a bad request on other routes', () => {

    frisby
      .get('http://localhost:3000/other')
      .expect('status', 400)
      .then((done) => {
        expect(body).toEqual('Bad Request')
      })

  })

})