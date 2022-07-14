## Description

Backend Cars Rentals and Buy

## Installation

```bash
$ npm install
```

## Setup Environment

Open .env.example file and create new file .env, On the fill .env the fill environment (Exp: NODE_ENV='development', ...)

## Setup Database

I prefer to connect database with mongodb atlas Exp:
(DATABASE_URL='mongodb+srv://**_:_**@\*\*\*/cars?retryWrites=true&w=majority')

Or you can use docker to run database locally:

$ docker-compose up -d

$ docker-compose exec database mongo --eval "rs.initiate({\_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]});"

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
