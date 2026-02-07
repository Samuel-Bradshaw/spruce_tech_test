FROM node:18.19.1

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY prisma ./prisma

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
