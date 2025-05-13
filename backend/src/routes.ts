import { Router } from "express";
import pool, { GameStats } from "./db";

type ResultKind = "X" | "O" | "draw";

const router = Router();

/*-----NOTE--------
I could have ditched the express routes and just have used postgrest to create the apis to the database for me
*/

//GET current total of wins and draws
router.get("/stats", async (_req, res) => {
  const { rows } = await pool.query<GameStats>(
    "SELECT * FROM game_stats LIMIT 1"
  );
  res.json(rows[0]);
});

//POST a result, incrementing the relevant stat
router.post<{}, GameStats | { error: string }, { result?: ResultKind }>(
  "/result",
  async (req, res): Promise<void> => {
    const { result } = req.body;

    if (result !== "X" && result !== "O" && result !== "draw") {
      res.status(400).json({ error: "result must be 'X', 'O' or 'draw'" });
      return;
    }

    const column =
      result === "X" ? "xwins" : result === "O" ? "owins" : "draws";

    await pool.query(
      `UPDATE game_stats SET ${column} = ${column} + 1 WHERE id = 1`
    );

    const { rows } = await pool.query<GameStats>(
      "SELECT * FROM game_stats LIMIT 1"
    );

    res.status(201).json(rows[0]);
  }
);

//DELETE game stats, resetting all values to 0
router.delete("/stats", async (_req, res) => {
  await pool.query(
    "UPDATE game_stats SET xwins = 0, owins = 0, draws = 0 WHERE id = 1"
  );
  res.sendStatus(204);
});

export default router;
