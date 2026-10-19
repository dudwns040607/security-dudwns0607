import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export async function GET() {
  const { projects, source } = await getProjects();
  return NextResponse.json({ source, projects });
}

// 프로젝트 등록: x-admin-key 헤더가 ADMIN_KEY와 같아야 합니다.
export async function POST(req) {
  const key = req.headers.get("x-admin-key");
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  if (!body?.title || !body?.summary) {
    return NextResponse.json({ error: "title, summary는 필수입니다." }, { status: 400 });
  }
  const db = await getDb();
  if (!db) return NextResponse.json({ error: "DB가 연결되지 않았습니다." }, { status: 500 });

  const doc = {
    title: String(body.title).slice(0, 100),
    summary: String(body.summary).slice(0, 300),
    tags: Array.isArray(body.tags) ? body.tags.slice(0, 6).map(String) : [],
    link: body.link ? String(body.link) : "",
    createdAt: new Date(),
  };
  const result = await db.collection("projects").insertOne(doc);
  return NextResponse.json({ ok: true, id: String(result.insertedId) }, { status: 201 });
}
