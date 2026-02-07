FROM node:20.20.0-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci

EXPOSE 3001

CMD ["npm", "start"]
