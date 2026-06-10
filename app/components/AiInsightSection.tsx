type AiInsightSectionProps = {
  aiOutputVisible: boolean;
  aiAnalysisText: string;
  hasVoiceSupport: boolean;
  onAnalyze: () => void;
  onSpeak: () => void;
};

export default function AiInsightSection({
  aiOutputVisible,
  aiAnalysisText,
  hasVoiceSupport,
  onAnalyze,
  onSpeak,
}: AiInsightSectionProps) {
  return (
    <section className="mb-12">
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-r from-background via-background to-background p-6 md:p-8 shadow-2xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-[10px] font-bold tracking-widest uppercase rounded-full">
                AI Powered Insight
              </span>
              <span className="animate-pulse w-2 h-2 rounded-full bg-primary"></span>
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">
              วิเคราะห์พอร์ตและศักยภาพนักพัฒนาด้วย AI อัจฉริยะ ✨
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              วิเคราะห์สไตล์การเขียนโค้ด คลังโปรเจกต์ และทักษะเฉพาะตัวของคุณโดยใช้เทคโนโลยีระดับสูงเพื่อประเมินสายงานเด่น พร้อมสำรวจศักยภาพของคุณอย่างมืออาชีพ
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onAnalyze}
              className="px-5 py-3 bg-linear-to-r from-primary via-blue-600 to-accent hover:from-primary hover:to-accent text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-primary/10 active:scale-95 transition-all duration-300"
            >
              วิเคราะห์พอร์ตด้วย AI ✨
            </button>
            <button
              type="button"
              onClick={onSpeak}
              disabled={!hasVoiceSupport}
              className="px-4 py-3 bg-surface hover:bg-border disabled:bg-background/50 disabled:text-slate-700 disabled:border-surface border border-border text-slate-300 font-extrabold text-xs uppercase tracking-wider rounded-xl transition duration-300"
            >
              ฟังเสียงบรรยายด้วย AI ✨
            </button>
          </div>
        </div>

        <div
          id="ai-analysis-output-box"
          className={`mt-8 pt-6 border-t border-border/80 transition-all duration-500 ${
            aiOutputVisible ? "block" : "hidden"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/40 flex items-center justify-center text-primary shrink-0 shadow-lg shadow-primary/10">
              🤖
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                  บทประเมินผู้พัฒนาโดยรวม (Recruiter Review):
                </h4>
                <span className="text-[10px] text-slate-500 font-mono" id="ai-timestamp">
                  Generated Just Now
                </span>
              </div>
              <div id="ai-analysis-text" className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3 font-sans">
                {aiAnalysisText}
              </div>
              <div className="hidden mt-4 pt-4 border-t border-background gap-3" id="ai-audio-wrapper">
                <audio id="ai-audio-player" className="hidden" controls />
                <div className="text-[10px] text-primary/80 font-semibold flex items-center gap-1.5 bg-primary/5 border border-primary/20 px-3 py-1.5 rounded-lg">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                  เล่นเสียงวิเคราะห์สังเคราะห์พิเศษ (Gemini Audio)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
