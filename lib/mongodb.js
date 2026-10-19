import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let clientPromise = null;

// 개발 모드에서 핫 리로드 시 연결이 중복 생성되지 않도록 global에 캐시
export function getClient() {
  if (!uri) return null;
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri).connect();
  }
  clientPromise = global._mongoClientPromise;
  return clientPromise;
}

export async function getDb() {
  const client = await getClient();
  if (!client) return null;
  return client.db(process.env.MONGODB_DB || "portfolio");
}
