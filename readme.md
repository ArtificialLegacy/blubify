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

* Install packages.

```sh
cd ./blubify
npm i
```

### Database Setup

* Install and config a mysql fork such as MariaDB.
* Setup the blubify database.

```sql
CREATE DATABASE blubify;
USE blubify;
```

* Open db directory

```sh
cd ./packages/db
```

* Run `npm run migrate latest` in `./packages/db`.

```sql
SHOW tables;
```

* Create .env in the server directory with the following:

```sh
DATABASE_URL="" # url to hosted database.
DATABASE="" # name of database.
```

### Server Setup

* Open server directory

```sh
cd ./packages/server
```

* Create .env in the server directory with the following:

```sh
# optional if FFMPEG is installed on PATH
FFMPEG_PATH="" # Path to the exe file.
FFMPEG_LOCATION="" # Path to bin directory.

API_IP="" # The ip to host the ip on, either 127.0.0.1 for hosting locally or you're ip on you're local network.
API_PORT="" # The port to host the api on.
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

* Create .env in the client directory with the following.

```sh
VITE_API_URL="" # Should be similar to http://{API_IP}:{API_PORT}
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

* Retrieve new source code

```sh
git pull
```

* Install packages.

```sh
npm i

```

### Update Database

* Run `npm run migrate latest` in `./packages/db`.

### Update Client

* Build static files for hosting.

```sh
npm run build
```

## Common Issues

* Occasionally as the `youtube-dl-exec` package gets out of date it will be unable to download songs imported from youtube, to fix this you can try to update the package.

```sh
npm update youtube-dl-exec
```
