"use client";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState({ type: "idle", text: "" });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus({ type: "loading", text: "보내는 중입니다." });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "전송에 실패했습니다.");
      form.reset();
      setStatus({ type: "ok", text: "메시지를 보냈습니다. 확인 후 답장드릴게요." });
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label>
        이름
        <input name="name" required maxLength={50} autoComplete="name" />
      </label>
      <label>
        이메일
        <input name="email" type="email" required maxLength={100} autoComplete="email" />
      </label>
      <label>
        문의 내용
        <textarea name="message" rows={4} required maxLength={1000} />
      </label>
      <button className="btn btn-primary" disabled={status.type === "loading"}>
        메시지 보내기
      </button>
      {status.text && (
        <p className={`form-status ${status.type}`} role="status">
          {status.text}
        </p>
      )}
    </form>
  );
}
