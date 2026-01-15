CREATE TYPE "public"."game_status" AS ENUM('IN_PROGRESS', 'COMPLETED');--> statement-breakpoint
CREATE TYPE "public"."game_outcome" AS ENUM('X', 'O', 'TIE');--> statement-breakpoint
CREATE TYPE "public"."player" AS ENUM('X', 'O');--> statement-breakpoint
CREATE TABLE "games" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"board_size" integer NOT NULL,
	"winner" "game_outcome",
	"status" "game_status" DEFAULT 'IN_PROGRESS' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "game_moves" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"game_id" uuid NOT NULL,
	"current_layer" "player" NOT NULL,
	"last_played_position" integer NOT NULL,
	"board_state" varchar(250)[],
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "game_moves" ADD CONSTRAINT "game_moves_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;