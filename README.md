# Tic-Tac-Toe

A two-player Tic-Tac-Toe game with a scalable board (3×3 to 15×15) and persistent game statistics.

## Tech Stack

- **Client** — React, TypeScript, TailwindCSS, Webpack
- **Server** — Node.js, Express, Prisma ORM
- **Database** — PostgreSQL
- **Infrastructure** — Docker Compose

## Quickstart

Requires **Docker** and **Docker Compose**.

```bash
docker-compose up --build
```

- Client: http://localhost:3001
- Server: http://localhost:3000

## Running Tests

```bash
cd client && npm test
cd server && npm install && npm test
```

## Project Structure

```
client/          React frontend
  src/
    components/  UI components (Game, Board, Cell, GameStatus, Stats, BoardSizeInput)
    hooks/       Custom hooks (useGameState, useStats)
    utils/       Game logic (win detection, board creation)
  test/          Unit tests

server/          Express backend
  src/
    routes/      API endpoints (POST /api/game, GET /api/stats)
    middleware/  Request validation
  prisma/        Database schema
  test/          Unit tests
```
