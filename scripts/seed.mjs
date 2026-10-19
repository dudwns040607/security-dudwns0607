import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI가 없습니다. .env.local을 확인하세요.");
  process.exit(1);
}
const client = new MongoClient(uri);
const projects = [
  {
    title: "웹 취약점 점검 리포트",
    summary: "OWASP Top 10 기준으로 웹 서비스를 점검하고 개선 방안을 정리했습니다.",
    tags: ["OWASP", "Burp Suite", "Report"],
    link: "https://github.com",
  },
  {
    title: "로그 기반 이상 행위 탐지",
    summary: "서버 접근 로그에서 비정상 패턴을 찾아 알림으로 보내는 도구입니다.",
    tags: ["Python", "ELK", "Detection"],
    link: "https://github.com",
  },
  {
    title: "개인 포트폴리오 사이트",
    summary: "Next.js와 MongoDB로 만들고 Vercel에 배포한 이 사이트입니다.",
    tags: ["Next.js", "MongoDB", "Vercel"],
    link: "https://github.com",
  },
].map((p, i) => ({ ...p, createdAt: new Date(Date.now() - i * 1000) }));

try {
  await client.connect();
  const col = client.db(process.env.MONGODB_DB || "portfolio").collection("projects");
  await col.deleteMany({});
  const r = await col.insertMany(projects);
  console.log(`${r.insertedCount}개의 프로젝트를 등록했습니다.`);
} finally {
  await client.close();
}
