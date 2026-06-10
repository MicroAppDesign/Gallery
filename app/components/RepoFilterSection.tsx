type RepoFilterSectionProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  languageFilterButtons: React.ReactNode;
  galleryCount: number;
};

export default function RepoFilterSection({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  languageFilterButtons,
  galleryCount,
}: RepoFilterSectionProps) {
  return (
    <section className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse"></div>
          <h2 className="text-lg font-extrabold text-white tracking-tight uppercase">
            ผลงานจัดเก็บในแกลเลอรี่ (<span id="gallery-count">{galleryCount}</span>)
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              id="repo-search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="พิมพ์เพื่อค้นหาคลัง..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition"
            />
          </div>

          <div className="relative">
            <select
              id="repo-sort"
              aria-label="Sort repositories"
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value)}
              className="appearance-none bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl pl-4 pr-10 py-2 text-xs text-slate-200 focus:outline-none cursor-pointer transition"
            >
              <option value="stars">เรียงตาม: ยอดดาว (Stars)</option>
              <option value="updated">เรียงตาม: อัปเดตล่าสุด</option>
              <option value="name">เรียงตาม: ชื่ออัลฟาเบท (A-Z)</option>
              <option value="size">เรียงตาม: ขนาดโฟลเดอร์</option>
            </select>
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-[10px] pointer-events-none">
              ▼
            </span>
          </div>
        </div>

        <div id="language-filter-container" className="flex flex-wrap items-center gap-1.5 mt-4 border-t border-slate-800/40 pt-4">
          <span className="text-xs text-slate-500 mr-1.5">ตัวกรองภาษา:</span>
          {languageFilterButtons}
        </div>
      </div>
    </section>
  );
}
