# syntax=docker/dockerfile:1

FROM node:20.1.0-alpine AS build-stage

ENV NODE_ENV production

WORKDIR /usr/app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json

COPY packages/libs packages/libs
COPY packages/apps/client packages/apps/client
COPY .env packages/apps/client/.env

RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

RUN ["npm", "run", "build-client"]

FROM node:20.1.0-alpine

WORKDIR /usr/dist

COPY --from=build-stage /usr/app/packages/apps/client/build .

RUN npm i serve -g

CMD ["serve", "-s", ".", "--single"]
