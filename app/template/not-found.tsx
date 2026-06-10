import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full rounded-4xl border border-border bg-surface p-10 text-center shadow-2xl shadow-slate-950/30">
          <p className="text-sm uppercase tracking-[0.32em] text-primary">ไม่พบหน้าที่ต้องการ</p>
          <h1 className="mt-6 text-4xl font-semibold text-white">404 - ไม่พบเทมเพลต</h1>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            ขออภัย เราไม่พบไฟล์รูปภาพหรือ slug ที่คุณกำลังค้นหา กรุณากลับไปยังหน้าหลักแล้วลองอีกครั้ง
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-primary/90"
          >
            <ArrowLeft className="h-4 w-4" />
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </main>
  );
}
