"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function AnimatedHero() {
  return (
    <section className="relative overflow-hidden rounded-4xl border border-border bg-surface p-6 shadow-2xl shadow-slate-950/30 sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/15 via-transparent to-accent/10" />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <div className="space-y-8">
          <div className="max-w-xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" />
              เทมเพลตเว็บไซต์ขาย 5,000 บาท พร้อมอัปเดทรูปอัตโนมัติ
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              เลือกเว็บ template Next.js ที่ชื่นชอบ เรารับ ออกแบบ แก้ไขปรับแต่งเว็บไซต์
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              บริการปรับแต่งและออกแบบเทมเพลต Next.js พร้อมสาธิตหน้าเว็บตัวอย่างและลิงก์ชำระเงินครบถ้วน.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
            <a
              href="#gallery"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              ดู Gallery เทมเพลต
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://microtronic-thailand.github.io/micro-payment/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-primary/20 bg-surface-muted px-5 py-3 text-sm font-semibold text-white transition hover:border-primary hover:bg-surface"
            >
              ดูตัวอย่างชำระเงิน
            </a>
          </div>

          <div className="grid gap-4 rounded-4xl border border-border bg-surface-muted p-6 sm:grid-cols-3">
            {[
              "อัปเดทรูปใหม่ได้เอง",
              "รองรับทุกภาพจาก public/",
              "มีลิงก์ Vercel + GitHub",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <p className="text-sm leading-6 text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
