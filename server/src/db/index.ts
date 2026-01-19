import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";
import { schema } from "./schema";

const DB_DIR = path.join(os.tmpdir(), "spruce-tech-test");
const DB_PATH = path.join(DB_DIR, "data.db");
if (!fs.existsSync(DB_DIR)) {
	fs.mkdirSync(DB_DIR);
}

let db: Database.Database | null = null;

export const getDb = (): Database.Database => {
	if (!db) {
		db = new Database(DB_PATH);
		db.pragma("journal_mode = WAL");
		db.pragma("foreign_keys = ON");
		db.exec(schema);
	}
	return db;
};
