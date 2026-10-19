import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req) {
  const body = await req.json().catch(() => null);
  const name = body?.name?.trim();
  const email = body?.email?.trim();
  const message = body?.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "모든 항목을 입력해 주세요." }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "이메일 형식이 올바르지 않습니다." }, { status: 400 });
  }
  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "DB가 연결되지 않아 저장할 수 없습니다." }, { status: 500 });
  }
  await db.collection("messages").insertOne({
    name: name.slice(0, 50),
    email: email.slice(0, 100),
    message: message.slice(0, 1000),
    createdAt: new Date(),
  });
  return NextResponse.json({ ok: true }, { status: 201 });
}
