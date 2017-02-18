'use strict';

const
      express = require('express'),
      fun = require('funcy'),
      _ = require('highland')

let matcher = (pattern, handler) => {
  return [pattern, handler];
}

let route = (path, handler) => {
  return matcher([path, fun.wildcard, fun.parameter], handler);
}

let catchall = (handler) => {
  return route(fun.wildcard, handler)
}

let router = fun(
  route('/', response => { 
    return [ response, { status: 200, body: 'Hello World!' } ] 
  }),
  route('/foo', response => {
    return [ response, { status: 418, body: 'BAR!' } ]
  }),
  catchall(response => { 
    return [ response, { status: 400 } ] 
  })
)

let responder = fun(
  matcher([fun.parameter, {status: fun.parameter, body: fun.parameter}], 
    (response, status, body) => {
      response.status(status).send(body)
    }
  ),
  matcher([fun.parameter, {status: fun.parameter}],
    (response, status) => {
      response.sendStatus(status)
    }
  )
)

let app = express()

let requests = (push, next) => {
  app.get(/$/, (request, response) => {
    push(undefined, [ request.path, request, response ])
    next()
  })
}

let server = app.listen(3000, () => {
  console.log(`Listening on port ${server.address().port}`)

  _(requests)
  .map(router)
  .each(responder)

})