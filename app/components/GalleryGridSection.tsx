import LanguageLogo from './LanguageLogo'

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  size: number;
};

type GalleryGridSectionProps = {
  repos: GitHubRepo[];
  loading: boolean;
  error: string;
  onResetFilters: () => void;
};

function formatRepoDate(updatedAt: string) {
  return new Date(updatedAt).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function GalleryGridSection({
  repos,
  loading,
  error,
  onResetFilters,
}: GalleryGridSectionProps) {
  return (
    <section className="relative min-h-100">
      {loading ? (
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center gap-3.5">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-surface rounded-full" />
            <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin" />
          </div>
          <span className="text-xs font-semibold text-slate-400 tracking-wider">กำลังดึงและแปลงข้อมูลพอร์ตโฟลิโอ...</span>
        </div>
      ) : null}

      {error ? (
        <div className="rounded-3xl border border-rose-500/40 bg-rose-500/10 p-8 text-center text-rose-200">
          <p className="text-sm font-semibold">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
          <p className="text-xs mt-2 text-rose-200/80">{error}</p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 px-4 py-2 bg-surface hover:bg-border text-slate-200 text-xs font-bold rounded-xl transition"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      ) : repos.length === 0 && !loading ? (
        <div className="rounded-3xl border border-border/70 bg-background/80 p-8 text-center text-slate-500">
          <p className="text-sm font-medium">ยังไม่มีคลังข้อมูลที่ตรงตามเงื่อนไข</p>
          <p className="text-xs mt-2">ปรับคำค้นหรือเลือกภาษาอื่นเพื่อค้นหา repository ของ MicroAppDesign</p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 px-4 py-2 bg-surface hover:bg-border text-slate-200 text-xs font-bold rounded-xl transition"
          >
            ล้างการค้นหา
          </button>
        </div>
      ) : (
        <div id="gallery-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
          {repos.map((repo) => {
            return (
            <article key={repo.id} className="rounded-3xl border border-border/70 bg-background/80 p-6 hover:border-primary/40 transition">
              {repo.language && (
                <div className="mb-4 flex items-center justify-center">
                  <LanguageLogo language={repo.language} className="h-16 w-16 object-contain" />
                </div>
              )}
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="text-base font-bold text-white truncate">{repo.name}</h3>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs uppercase tracking-widest text-primary hover:text-primary/80"
                >
                  ดูบน GitHub
                </a>
              </div>
              <p className="text-sm text-slate-400 min-h-12">{repo.description ?? "ไม่มีคำอธิบาย"}</p>
              <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-slate-400">
                {repo.language ? (
                  <span className="rounded-full bg-surface/70 px-3 py-1">{repo.language}</span>
                ) : null}
                <span className="rounded-full bg-surface/70 px-3 py-1">⭐ {repo.stargazers_count}</span>
                <span className="rounded-full bg-surface/70 px-3 py-1">🍴 {repo.forks_count}</span>
                <span className="rounded-full bg-surface/70 px-3 py-1">{formatRepoDate(repo.updated_at)}</span>
              </div>
            </article>
          );})}
        </div>
      )}
    </section>
  );
}