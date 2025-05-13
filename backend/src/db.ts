import "dotenv/config";
import { Pool } from "pg";

/*-----NOTE--------
I'm really not a fan of this. Would have liked to have used an ORM such as
prisma to create schemas for the tables, and generate the necessary types.
*/

export interface GameStats {
  id: number;
  xwins: number;
  owins: number;
  draws: number;
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});

export const initDb = async (): Promise<void> => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS game_stats (
      id     SERIAL PRIMARY KEY,
      xwins  INTEGER NOT NULL DEFAULT 0,
      owins  INTEGER NOT NULL DEFAULT 0,
      draws  INTEGER NOT NULL DEFAULT 0
    );
  `);

  const { rows } = await pool.query<GameStats>(
    "SELECT * FROM game_stats LIMIT 1"
  );
  if (rows.length === 0) {
    await pool.query(
      "INSERT INTO game_stats (xwins, owins, draws) VALUES (0, 0, 0)"
    );
  }
};

export const closeDb = async (): Promise<void> => {
  await pool.end();
};

export default pool;
