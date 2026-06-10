export default function GitGalleryFooter() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900/80 py-8 text-center mt-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-xs text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>&copy; 2026 Developed with Ultra Tech Design. All public properties belong to developer.</p>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] tracking-widest uppercase">API Live status Connected</span>
        </div>
      </div>
    </footer>
  );
}
