FROM node:18.19.1

WORKDIR /app

COPY package*.json ./

RUN npm ci

EXPOSE 3001

CMD ["npm", "start"]
