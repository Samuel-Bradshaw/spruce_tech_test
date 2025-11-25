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

export const games = pgTable("games", {
  id: uuid("id").primaryKey().defaultRandom(),
  boardSize: integer("board_size").notNull(),
  winner: varchar("winner", { length: 1 }),
  status: gameStatusEnum("status").notNull().default("IN_PROGRESS"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const moves = pgTable("game_moves", {
  id: uuid("id").primaryKey().defaultRandom(),
  gameId: uuid("game_id")
    .notNull()
    .references(() => games.id),
  lastPlayer: playerEnum("current_layer").notNull(),
  lastPlayedPosition: integer("last_played_position").notNull(),
  boardState: varchar("board_state", { length: 250 })
    .array()
    .$type<(string | null)[]>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const gameRelations = relations(moves, ({ one }) => ({
  author: one(games, {
    fields: [moves.gameId],
    references: [games.id],
  }),
}));

export type GameMove = typeof moves.$inferSelect;
export type AddMoveRequest = typeof moves.$inferInsert;

export type GameRound = typeof games.$inferSelect;
export type NewGameRequest = typeof games.$inferInsert;
