import { getDb } from "./mongodb";

// DB가 연결되지 않았거나 비어 있을 때 보여줄 기본 데이터
export const fallbackProjects = [
  {
    _id: "demo-1",
    title: "웹 취약점 점검 리포트",
    summary: "OWASP Top 10 기준으로 웹 서비스를 점검하고 개선 방안을 정리했습니다.",
    tags: ["OWASP", "Burp Suite", "Report"],
    link: "https://github.com",
  },
  {
    _id: "demo-2",
    title: "로그 기반 이상 행위 탐지",
    summary: "서버 접근 로그에서 비정상 패턴을 찾아 알림으로 보내는 도구입니다.",
    tags: ["Python", "ELK", "Detection"],
    link: "https://github.com",
  },
  {
    _id: "demo-3",
    title: "개인 포트폴리오 사이트",
    summary: "Next.js와 MongoDB로 만들고 Vercel에 배포한 이 사이트입니다.",
    tags: ["Next.js", "MongoDB", "Vercel"],
    link: "https://github.com",
  },
];

export async function getProjects() {
  try {
    const db = await getDb();
    if (!db) return { projects: fallbackProjects, source: "fallback" };
    const docs = await db
      .collection("projects")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    if (!docs.length) return { projects: fallbackProjects, source: "fallback" };
    const projects = docs.map((d) => ({ ...d, _id: String(d._id) }));
    return { projects, source: "mongodb" };
  } catch (e) {
    console.error("getProjects error:", e);
    return { projects: fallbackProjects, source: "fallback" };
  }
}
