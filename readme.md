# Blubify

## Features

* Download and store audio from Youtube.
* Direct upload of audio.
* Secure user accounts and authentication.
* Create and manage playlists.
* Well featured audio player with seek, exponential volume control, loop controls including shuffle and repeat.
* Ability to share songs between accounts and playlists.

## Requirements

* NodeJS/npm
* serve
* FFMPEG
* Python 3.7 or greater installed on system.
* A mysql/mariadb database. (some scripts may not work properly outside of MariaDB)
* screen (optional)

## Installation

* Clone the source code locally.

```sh
git clone https://github.com/ArtificialLegacy/blubify.git
```

### Database Setup

* Install and config a mysql fork such as MariaDB.
* Setup the blubify database.

```sql
CREATE DATABASE blubify;
USE blubify;
```

* Execute the sql code in ./server/db/init.sql to create all necessary tables.
* Verify tables were created properly.

```sql
SHOW tables;
```

### Server Setup

* Open server directory

```sh
cd ./server
```

* Create .env in the server directory with the following:

```sh
# optional if FFMPEG is installed on PATH
FFMPEG_PATH="" # Path to the exe file.
FFMPEG_LOCATION="" # Path to bin directory.

DATABASE_URL="" # The full url to connect to the api with, this is used to generate db types.
DATABASE_HOST="" # Host ip for the db.
DATABASE_PORT="" # Host port for the db.
DATABASE_USER="" # DB user to login to.
DATABASE_PASSWORD="" # Password for the db user.
DATABASE="" # Name of the database.

API_IP="" # The ip to host the ip on, either 127.0.0.1 for hosting locally or you're ip on you're local network.
API_PORT="" # The port to host the api on.
```

* Install packages and generate db types.

```sh
npm i
npm run migrate-db

```

* Running the server is blocking so it must be run within it's own screen/terminal

```sh
# OPTIONAL: create a screen
screen -S BlubifyServer

# run server
npm start
```

### Client Setup (run from within the client directory)

* Open client directory.

```sh
cd ./client
```

* Install packages.

```sh
npm i
```

* Create .env in the client directory with the following.

```sh
REACT_APP_API_URL="" # Should be similar to http://{API_IP}:{API_PORT}
```

* Build static files for hosting.

```sh
npm run build
```

* Running the client is blocking so it must be run within it's own screen/terminal.

```sh
# OPTIONAL: create a screen
screen -S BlubifyClient

# run client
npm run host
```

## Updating

* Take note of what "step" the database is on, this number is included in the top comment of ./server/db/init.sql, you will need this to update the database instead of overwriting it.

* Retrieve new source code

```sh
git pull
```

### Update Database

* Using the previous step number you can run any additional steps from ./server/db/update_scripts.
* For example if the previous step was 10, then you would run 11.sql 12.sql 13.sql etc in order.

### Update Server

* Open server directory

```sh
cd ./server
```

* Install packages and generate db types.

```sh
npm i --force
npm run migrate-db
```

### Update Client

* Open client directory.

```sh
cd ./client
```

* Install packages.

```sh
npm i
```

* Build static files for hosting.

```sh
npm run build
```

## Common Issues

* Occasionally as the `youtube-dl-exec` package gets out of date it will be unable to download songs imported from youtube, to fix this you can try to update the package.

```sh
npm update youtube-dl-exec --force
```

* Currently the --force flag is necessary what updating or installing packages within the server directory, as 2 different packages depend on different versions of mysql2. There is no compatibility issue but npm will throw errors because of this.
