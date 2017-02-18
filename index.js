'use strict';

const
      express = require('express'),
      fun = require('funcy'),
      _ = require('highland')

let app = express()

let requests = (push, next) => {
  app.get(/$/, (request, response) => {
    push(undefined, [ request.path, request, response ])
    next()
  });
}

let routes = fun(
  [
    [ '/', fun.wildcard, fun.parameter ], 
    (response) => { return [ response, { status: 200, body: 'Hello World!' } ] }
  ],
  [
    [ fun.wildcard, fun.wildcard, fun.parameter ], 
    (response) => { return [ response, { status: 400 } ] }
  ]
)

let responder = fun(
  [
    [fun.parameter, {status: fun.parameter, body: fun.parameter}], 
    (response, status, body) => response.status(status).send(body)
  ],
  [
    [fun.parameter, {status: fun.parameter}], 
    (response, status) => response.sendStatus(status)
  ]
)


app.listen(3000, () => {
  console.log('Listening on port 1234');

  _(requests)
  .map(routes)
  .each(responder)

})