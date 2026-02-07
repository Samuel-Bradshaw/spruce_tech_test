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

## Assumptions

- **Players are X and O on a shared screen** — both players take turns in the same browser window; there is no networked multiplayer.
- **Players are seeded on server startup** — no player creation endpoint has been implemented, so the server seeds Player X and Player O in the database at boot. The schema supports additional players for future use. Player X always plays first.
- **Win condition requires a full line** — on an N×N board, a player must fill an entire row, column, or diagonal (all N cells) to win. No partial-line (e.g. 5-in-a-row) variant is implemented.
- **Board size is fixed for the duration of a game** — the size selector is disabled once the first move is played, and resets the board if changed beforehand.

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
