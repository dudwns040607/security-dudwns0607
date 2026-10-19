import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const font = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "보안 포트폴리오 | Security Gams",
  description: "데이터와 서비스를 안전하게 지키는 보안 전문가의 포트폴리오입니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={font.className}>{children}</body>
    </html>
  );
}
