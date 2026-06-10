"use client";

export default function GitGalleryHeader({
  onToggleDrawer,
}: Readonly<{
  onToggleDrawer: () => void;
}>) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <span className="text-lg font-black">G</span>
          </div>
          <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            GitGallery
          </span>
        </div>

        <button
          type="button"
          onClick={onToggleDrawer}
          className="flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg transition-all duration-300"
        >
          <span>เปลี่ยนบัญชี GitHub</span>
        </button>
      </div>
    </header>
  );
}
