## Description

Backend Vehicles

## Installation

```bash
$ npm install
```

## Setup Environment

1 - Create new file .env

2 - Open .env.example file and copy all file

3 - Go to .env file and paste the environment and fill it up

Exp:

NODE_ENV='development'

DATABASE_URL='mongodb://localhost:27017/vehicles'

## Setup Database

### Choice 1 - With Mongodb Atlas

I prefer to connect database with mongodb atlas Exp:
(DATABASE\*URL='mongodb+srv://\*\*\*:\_\*\*@\*\*\*/vehicles?retryWrites=true&w=majority')

### Choice 2 - With Docker

Or you can use docker to run database locally:

```bash
$ docker-compose up -d

$ docker-compose exec database mongo --eval "rs.initiate({\_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]});"
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
