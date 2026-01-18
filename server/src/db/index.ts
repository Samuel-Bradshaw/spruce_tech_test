import path from "node:path";
import Database from "better-sqlite3";
import { schema } from "./schema";

const DB_PATH = path.join(process.cwd(), "data.db");

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
