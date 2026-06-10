import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CreditCard, ExternalLink, GitFork, Globe } from "lucide-react";
import CookieBanner from "../../components/CookieBanner";
import { getTemplateBySlug } from "@/lib/image-utils";

export const dynamic = "force-dynamic";

export default async function TemplateDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8 rounded-4xl border border-border bg-surface p-6 sm:p-8 shadow-2xl shadow-slate-950/30">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm uppercase tracking-[0.32em] text-primary">หน้ารายละเอียดเทมเพลต</p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {template.title}
              </h1>
              <p className="text-base leading-8 text-slate-300">
                เทมเพลตราคาพร้อมใช้งาน 5,000 บาท พร้อมลิงก์ชำระเงิน, ตัวอย่าง Vercel, และเก็บโค้ดบน GitHub.
              </p>
            </div>
            <div className="rounded-4xl bg-slate-950/80 p-6 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">ราคาขาย</p>
              <p className="mt-3 text-4xl font-semibold text-white">5,000 บาท</p>
              <p className="mt-2 text-sm text-slate-400">รวมการปรับแต่งเว็บไซต์แบบ One-Page และลิงก์สำคัญทั้งหมด</p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-6">
              <div className="overflow-hidden rounded-4xl bg-slate-900/80">
                <img
                  src={template.imageSrc}
                  alt={template.title}
                  className="h-full w-full object-cover object-top"
                />
              </div>

              <div className="space-y-6">
                <div className="rounded-4xl border border-border bg-surface-muted p-6">
                  <p className="text-sm uppercase tracking-[0.28em] text-primary">รายละเอียดเพิ่มเติม</p>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{template.longDescription}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-4xl border border-border bg-surface-muted p-6">
                    <p className="text-sm uppercase tracking-[0.28em] text-primary">จุดเด่น</p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                      {template.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-4xl border border-border bg-surface-muted p-6">
                    <p className="text-sm uppercase tracking-[0.28em] text-primary">เหมาะสำหรับ</p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                      {template.useCases.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="rounded-4xl border border-border bg-surface-muted p-6">
                  <p className="text-sm uppercase tracking-[0.28em] text-primary">ข้อมูลการใช้งาน</p>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    เปิดแพลนหน้าเว็บไซต์ของคุณได้ทันทีโดยวางรูปภาพใน <span className="font-semibold text-white">public/</span> และเชื่อมลิงก์เว็บตัวอย่างกับ GitHub ของแต่ละเทมเพลต.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-4xl border border-border bg-surface-muted p-6">
                <p className="text-sm uppercase tracking-[0.28em] text-primary">ลิงก์ที่สำคัญ</p>
                <div className="mt-6 space-y-4">
                  <a
                    href={template.paymentLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 rounded-3xl border border-primary/20 bg-primary/5 px-5 py-4 text-sm font-semibold text-white transition hover:bg-primary/10"
                  >
                    <span className="inline-flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-primary" />
                      ชำระเงิน
                    </span>
                    <ExternalLink className="h-4 w-4 text-primary" />
                  </a>
                  <a
                    href={template.vercelLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-sm font-semibold text-slate-100 transition hover:border-primary/40"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Globe className="h-4 w-4 text-cyan-300" />
                      เว็บตัวอย่าง Vercel
                    </span>
                    <ExternalLink className="h-4 w-4 text-slate-300" />
                  </a>
                  <a
                    href={template.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-sm font-semibold text-slate-100 transition hover:border-accent/30"
                  >
                    <span className="inline-flex items-center gap-2">
                      <GitFork className="h-4 w-4 text-violet-400" />
                      ที่เก็บ GitHub
                    </span>
                    <ExternalLink className="h-4 w-4 text-slate-300" />
                  </a>
                </div>
              </div>
              <div className="rounded-4xl border border-border bg-surface-muted p-6">
                <p className="text-sm uppercase tracking-[0.28em] text-primary">Navigation</p>
                <Link
                  href="/"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-primary/90"
                >
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  กลับหน้าหลัก
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CookieBanner />
    </main>
  );
}
