import { relations } from "drizzle-orm";
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

export const gamesTable = pgTable("games", {
  id: uuid("id").primaryKey().defaultRandom(),
  boardSize: integer("board_size").notNull(),
  winner: varchar("winner", { length: 1 }),
  status: gameStatusEnum("status").notNull().default("IN_PROGRESS"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const gameMoves = pgTable("game_moves", {
  id: uuid("id").primaryKey().defaultRandom(),
  gameId: uuid("game_id")
    .notNull()
    .references(() => gamesTable.id),
  currentPlayer: playerEnum("current_layer").notNull(),
  nextPlayer: playerEnum("next_player").notNull(),
  lastPlayedPosition: integer("last_played_position").notNull(),
  boardState: varchar("board_state", { length: 250 })
    .array()
    .$type<string[] | undefined>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const gameRelations = relations(gameMoves, ({ one }) => ({
  author: one(gamesTable, {
    fields: [gameMoves.gameId],
    references: [gamesTable.id],
  }),
}));

export type GameMove = typeof gameMoves.$inferSelect;
export type NewGameMoveRequest = typeof gameMoves.$inferInsert;

export type GameRound = typeof gamesTable.$inferSelect;
export type NewGameRoundRequest = typeof gamesTable.$inferInsert;
