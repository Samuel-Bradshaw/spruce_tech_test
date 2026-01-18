export const schema = `
CREATE TABLE IF NOT EXISTS user (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS game (
    id TEXT PRIMARY KEY,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    board_size INTEGER NOT NULL,
    first_player TEXT NOT NULL CHECK (first_player IN ('X', 'O')),
    winner TEXT CHECK (winner IN ('X', 'O') OR winner IS NULL),
    is_draw INTEGER DEFAULT NULL,
    user_x_id TEXT NOT NULL,
    user_o_id TEXT NOT NULL,
    FOREIGN KEY (user_x_id) REFERENCES user(id),
    FOREIGN KEY (user_o_id) REFERENCES user(id)
);
`;
