# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.18.0
FROM node:${NODE_VERSION}-alpine AS base
LABEL fly_launch_runtime="Node.js"

WORKDIR /app
RUN apk update && \
    apk upgrade --no-cache && \
    apk add --no-cache \
    build-base \
    python3 \
    make \
    g++ \
    ca-certificates && \
    rm -rf /var/cache/apk/*

COPY package.json package-lock.json* ./

FROM base AS dev
ENV NODE_ENV=development
RUN npm ci
COPY . .


FROM dev AS builder
ENV NODE_ENV=production
RUN npm run build


FROM base AS prod
ENV NODE_ENV=production
RUN npm ci --omit=dev
COPY --from=builder /app/dist /app/dist
CMD [ "node", "dist/index.js" ]
