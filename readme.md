# Blubify

## Features

* Download and store audio from Youtube.
* Direct upload of audio.
* Secure user accounts and authentication.
* Create and manage playlists.
* Well featured audio player with seek, exponential volume control, loop controls including shuffle and repeat.
* Ability to share songs between accounts and playlists.

## Requirements

* Node
* Docker
* MariaDB

## Installation

* Clone the source code locally.

```sh
git clone https://github.com/ArtificialLegacy/blubify.git
cd blubify
```

### .env Setup

* Edit the .env file in the project root.

```sh
VITE_API_URL="http://127.0.0.1:5000" # When hosting on the network, set to the host's ip
CLIENT_PORT="3000"
API_IP="0.0.0.0"
API_PORT="5000"
SONG_STORE="/usr/songs/"
```

### Database Setup

* Install MariaDB.
* Setup the blubify database.

```sql
CREATE DATABASE blubify;
USE blubify;
```

* Open db directory

```sh
cd packages/libs/db
```

* Create .env in the server directory with the following:

```sh
DATABASE_URL="mysql://user:password@127.0.0.1:3306/blubify"
DATABASE="blubify"
```

* Run `npm run migrate latest` in `./packages/libs/db`.

### Server Setup

* Open server directory

```sh
cd ../../apps/server
```

* Create .env in the server directory with the following:

```sh
DATABASE_URL="mysql://user:password@host.docker.internal:3306/blubify"
DATABASE="blubify".
```

### Build

```sh
cd ../../..
docker compose up --build --detach
```

## Updating

```sh
git pull
npm i
npm run migrate-db
docker compose up --build --detach
docker image prune
```

## Common Issues

* Occasionally as the `youtube-dl-exec` package gets out of date it will be unable to download songs imported from youtube, to fix this you can try to update the package.

```sh
npm update youtube-dl-exec
```
