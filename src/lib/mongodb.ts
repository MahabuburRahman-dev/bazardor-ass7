import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
type MongoCache = { client: MongoClient | null };
declare global { var _mongoCache: MongoCache | undefined; }
const cache = global._mongoCache ?? (global._mongoCache = { client: null });

// MongoClient connects lazily on the first database operation. This keeps
// Next.js build-time module evaluation from requiring a live database.
export function getMongoClient() {
  if (!cache.client) cache.client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
  return cache.client;
}
export function getDb(): Db {
  return getMongoClient().db(process.env.MONGODB_DB_NAME || "bazardor");
}
