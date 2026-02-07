FROM node:20.20.0

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma

RUN npm ci

EXPOSE 3000

CMD ["npm", "start"]
