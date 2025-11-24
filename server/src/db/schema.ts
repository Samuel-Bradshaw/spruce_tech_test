import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const gameStatusEnum = pgEnum("game_status", [
  "IN_PROGRESS",
  "COMPLETED",
]);

export const playerEnum = pgEnum("player", ["X", "O"]);

export const gameRoundsTable = pgTable("game_rounds", {
  id: uuid("id").primaryKey().defaultRandom(),
  boardSize: integer("board_size").notNull(),
  winner: varchar("winner", { length: 1 }),
  status: gameStatusEnum("status").notNull().default("IN_PROGRESS"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
});

export type GameRound = typeof gameRoundsTable.$inferSelect;
export type NewGameRoundRequest = typeof gameRoundsTable.$inferInsert;

export default gameRoundsTable;
