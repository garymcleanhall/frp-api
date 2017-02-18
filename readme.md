#FRP-API

Toy example of an api using functional reactive programming in nodejs using es6, express, highland and funcy.

First install dependencies:

```
npm install
```

Then ensure the api working:

```
make test
```

Then run the api and have a poke around:

```
make run
curl -X GET 'http://localhost:3000/' // 200 | 'Hello World!'
curl -X GET 'http://localhost:3000/{anything}' // 400 | 'Bad Request'
```