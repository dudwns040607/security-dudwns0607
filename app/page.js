import ContactForm from "@/components/ContactForm";
import { getProjects } from "@/lib/projects";

export const revalidate = 60;

const GITHUB = process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com";
const VERCEL = process.env.NEXT_PUBLIC_VERCEL_URL || "https://vercel.com";

const checks = [
  { name: "입력값 검증", state: "점검 완료", ok: true },
  { name: "접근 권한 분리", state: "점검 완료", ok: true },
  { name: "로그 모니터링", state: "운영 중", ok: true },
  { name: "의존성 업데이트", state: "진행 중", ok: false },
];

const skills = [
  ["점검", "웹 취약점 진단, OWASP Top 10"],
  ["분석", "서버 로그 분석, 이상 행위 탐지"],
  ["개발", "Python, Next.js, MongoDB"],
  ["운영", "Vercel 배포, 환경변수·비밀키 관리"],
];

export default async function Home() {
  const { projects, source } = await getProjects();

  return (
    <div className="shell">
      <aside className="side">
        <a className="brand" href="#top" aria-label="홈으로">
          <span className="brand-mark">S</span>
          <span className="brand-text">
            <strong>보안 포트폴리오</strong>
            <small>Security · Gams</small>
          </span>
        </a>
        <nav className="menu" aria-label="페이지 이동">
          <a href="#about">소개</a>
          <a href="#projects">프로젝트</a>
          <a href="#contact">연락</a>
        </nav>
        <div className="ext">
          <a href={GITHUB} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={VERCEL} target="_blank" rel="noreferrer">
            Vercel
          </a>
        </div>
      </aside>

      <main className="main" id="top">
        <section className="intro">
          <div className="intro-text">
            <h1>
              지킬 것은 지키고,
              <br />
              <span>확인할 것은 끝까지 확인합니다.</span>
            </h1>
            <p>
              데이터와 서비스를 안전하게 지키는 보안 전문가입니다. 문제를 꼼꼼히
              살피고 더 믿을 수 있는 환경을 만드는 데 관심이 있습니다.
            </p>
            <div className="actions">
              <a className="btn btn-primary" href="#projects">
                프로젝트 보기
              </a>
              <a className="btn btn-ghost" href="#contact">
                연락하기
              </a>
            </div>
          </div>

          <div className="panel" aria-label="보안 점검 현황 예시">
            <p className="panel-title">서비스 점검 현황</p>
            <ul>
              {checks.map((c) => (
                <li key={c.name}>
                  <span
                    className={`dot ${c.ok ? "ok" : "wait"}`}
                    aria-hidden="true"
                  />
                  <span className="c-name">{c.name}</span>
                  <span className="c-state">{c.state}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="about" className="block">
          <h2>소개</h2>
          <div className="about">
            <p>
              안녕하세요, 보안 전문가를 준비하는 조영준입니다 서비스의 취약점을
              찾고, 로그를 분석하고, 같은 문제가 반복되지 않도록 개선하는 일에
              흥미가 있습니다.
            </p>
            <dl className="skills">
              {skills.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="projects" className="block">
          <h2>
            프로젝트
            <small className={`src ${source}`}>
              {source === "mongodb" ? "MongoDB 연결됨" : "샘플 데이터"}
            </small>
          </h2>
          <ul className="rows">
            {projects.map((p) => (
              <li key={p._id} className="row">
                <div className="row-main">
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                </div>
                <ul className="tags">
                  {p.tags?.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                {p.link && (
                  <a
                    className="row-link"
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    열기
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" className="block contact">
          <div>
            <h2>연락</h2>
            <p className="lead">
              협업이나 점검 문의는 아래 양식으로 남겨 주세요. 확인 후
              답장드립니다.
            </p>
          </div>
          <ContactForm />
        </section>

        <footer className="footer">
          © {new Date().getFullYear()} Security Portfolio
        </footer>
      </main>
    </div>
  );
}
