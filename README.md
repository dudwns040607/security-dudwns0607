# Security Portfolio (Next.js + MongoDB + Vercel)

## 1. 로컬 실행
```bash
npm install
cp .env.example .env.local   # 값 채우기
npm run seed                 # 샘플 프로젝트를 MongoDB에 등록 (Node 20+)
npm run dev                  # http://localhost:3000
```
`MONGODB_URI`가 없어도 샘플 데이터로 화면은 동작합니다.

## 2. MongoDB Atlas
1. https://www.mongodb.com/atlas 에서 무료 M0 클러스터 생성
2. Database Access에서 사용자 생성
3. Network Access에 `0.0.0.0/0` 추가 (Vercel은 고정 IP가 없습니다)
4. Connect → Drivers에서 연결 문자열을 복사해 `MONGODB_URI`에 입력

## 3. Vercel 배포
1. GitHub에 push
   ```bash
   git init && git add . && git commit -m "init"
   git branch -M main
   git remote add origin https://github.com/<id>/<repo>.git
   git push -u origin main
   ```
2. https://vercel.com/new 에서 저장소 Import (Framework: Next.js 자동 인식)
3. Environment Variables에 `.env.example`의 값 5개 입력
4. Deploy 클릭 → `https://<이름>.vercel.app` 에서 데모 확인

## 4. 프로젝트 추가 (배포 후)
```bash
curl -X POST https://<이름>.vercel.app/api/projects \
  -H "Content-Type: application/json" \
  -H "x-admin-key: <ADMIN_KEY>" \
  -d '{"title":"새 프로젝트","summary":"설명","tags":["Next.js"],"link":"https://github.com/..."}'
```
최대 60초 안에 홈페이지에 반영됩니다.
