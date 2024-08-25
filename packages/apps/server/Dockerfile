# syntax=docker/dockerfile:1

FROM node:20.1.0-alpine

ENV NODE_ENV production

WORKDIR /usr/app

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN apk add --no-cache ffmpeg

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json

COPY packages/libs packages/libs
COPY packages/apps/server packages/apps/server

RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

RUN npm install typescript -g
RUN npm install tsx -g

CMD ["npm", "run", "start-server"]
